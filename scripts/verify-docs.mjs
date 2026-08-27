import { createRequire } from 'node:module';
import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const componentRoot = join(root, 'src/lib/components');
const catalogPath = join(root, 'src/docs/catalog.ts');
const previewPath = join(root, 'src/docs/preview-config.ts');
const previewComponentPath = join(root, 'src/docs/components/ComponentPreview.svelte');

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

async function exists(path) {
  try { return (await stat(path)).isFile(); } catch { return false; }
}

function scriptOf(source) {
  return source.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i)?.[1] ?? '';
}

function collectRequiredProps(node, output) {
  if (ts.isTypeLiteralNode(node)) {
    for (const member of node.members) {
      if (ts.isPropertySignature(member) && member.name && !member.questionToken) {
        output.add(member.name.getText().replace(/^['"]|['"]$/g, ''));
      }
    }
  } else if (ts.isIntersectionTypeNode(node) || ts.isUnionTypeNode(node)) {
    for (const type of node.types) collectRequiredProps(type, output);
  }
}

function requiredProps(file, source) {
  const sf = ts.createSourceFile(file, scriptOf(source), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const required = new Set();
  for (const statement of sf.statements) {
    if (ts.isTypeAliasDeclaration(statement) && statement.name.text === 'Props') {
      collectRequiredProps(statement.type, required);
    }
  }
  return required;
}

function previewProps(source) {
  const sf = ts.createSourceFile(previewPath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const map = new Map();
  function visit(node) {
    if (ts.isCaseClause(node) && ts.isStringLiteral(node.expression)) {
      const keys = new Set();
      let spread = false;
      for (const statement of node.statements) {
        if (!ts.isReturnStatement(statement) || !statement.expression || !ts.isObjectLiteralExpression(statement.expression)) continue;
        const property = statement.expression.properties.find((item) =>
          ts.isPropertyAssignment(item) && item.name.getText() === 'props'
        );
        if (!property || !ts.isPropertyAssignment(property) || !ts.isObjectLiteralExpression(property.initializer)) continue;
        for (const item of property.initializer.properties) {
          if (ts.isSpreadAssignment(item)) spread = true;
          else if (item.name) keys.add(item.name.getText().replace(/^['"]|['"]$/g, ''));
        }
      }
      map.set(node.expression.text, { keys, spread });
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);
  return map;
}

const catalog = await readFile(catalogPath, 'utf8');
const preview = await readFile(previewPath, 'utf8');
const previewComponent = await readFile(previewComponentPath, 'utf8');
const namesBlock = catalog.split('const names:', 2)[1]?.split('const descriptions:', 1)[0] ?? '';
const catalogNames = [...namesBlock.matchAll(/'([A-Z][A-Za-z0-9]+)'/g)].map((match) => match[1]);
const componentFiles = (await walk(componentRoot)).filter((file) => file.endsWith('.svelte')).sort();
const componentNames = componentFiles.map((file) => basename(file, '.svelte'));
const caseNames = [...preview.matchAll(/case '([^']+)'/g)].map((match) => match[1]);
const specialNames = ['Tabs', 'List', 'CommandPalette', 'ToastViewport'];
const previews = previewProps(preview);
const errors = [];

// Component previews are rendered on both catalog and detail routes. Avoid
// page-local fragment links in preview-config because their target id would have
// to exist on every host route (this caught the former #preview build failure).
if (/href=[\"']#[A-Za-z0-9_-]+/.test(preview) || /href:\s*[\"']#[A-Za-z0-9_-]+/.test(preview)) {
  errors.push('Preview configuration contains a page-local fragment link. Use a real docs route or a guaranteed route anchor instead.');
}

if (catalogNames.length !== 129 || new Set(catalogNames).size !== 129) {
  errors.push(`Expected 129 unique catalog names, found ${catalogNames.length}/${new Set(catalogNames).size}.`);
}
if (new Set(caseNames).size !== 125) errors.push(`Expected 125 regular preview cases, found ${new Set(caseNames).size}.`);
for (const name of specialNames) {
  if (!previewComponent.includes(`name === '${name}'`)) errors.push(`Missing special live preview for ${name}.`);
}
for (const name of componentNames) {
  if (!catalogNames.includes(name)) errors.push(`Component ${name} is missing from docs catalog.`);
  if (!caseNames.includes(name) && !specialNames.includes(name)) errors.push(`Component ${name} has no live preview.`);
}
for (const name of catalogNames) {
  if (!componentNames.includes(name)) errors.push(`Docs catalog references missing component ${name}.`);
}

for (const file of componentFiles) {
  const name = basename(file, '.svelte');
  if (specialNames.includes(name)) continue;
  const required = requiredProps(file, await readFile(file, 'utf8'));
  const config = previews.get(name);
  if (!config) continue;
  const missing = [...required].filter((key) => !config.keys.has(key));
  if (missing.length && !config.spread) errors.push(`${name} preview misses required props: ${missing.join(', ')}`);
}

const requiredRoutes = [
  'src/routes/+page.svelte',
  'src/routes/installation/+page.svelte',
  'src/routes/why-robingru/+page.svelte',
  'src/routes/components/+page.svelte',
  'src/routes/components/[slug]/+page.svelte',
  'src/routes/components/[slug]/+page.ts',
  'src/routes/patterns/+page.svelte',
  'src/routes/dashboard/+page.svelte',
  'src/routes/blog/+page.svelte',
  'src/routes/data/+page.svelte',
  'src/routes/tokens/+page.svelte',
  'src/routes/accessibility/+page.svelte',
  'src/routes/workbench/+page.svelte',
  'src/routes/+error.svelte'
];
for (const route of requiredRoutes) if (!await exists(join(root, route))) errors.push(`Missing docs route ${route}.`);

if (await exists(join(root, 'src/lib/docs/catalog.ts'))) errors.push('Docs infrastructure must not live inside src/lib.');
const svelteConfig = await readFile(join(root, 'svelte.config.js'), 'utf8');
if (!svelteConfig.includes("'$docs': 'src/docs'")) errors.push('SvelteKit $docs alias is missing.');
const layout = await readFile(join(root, 'src/routes/+layout.ts'), 'utf8');
if (!/prerender\s*=\s*true/.test(layout)) errors.push('Docs site is not configured for static prerendering.');


for (const route of requiredRoutes.filter((route) => route.endsWith('.svelte'))) {
  const source = await readFile(join(root, route), 'utf8');
  const localFragments = [...source.matchAll(/href=[\"']#([A-Za-z0-9_-]+)[\"']/g)].map((match) => match[1]);
  const staticIds = new Set([...source.matchAll(/\bid=[\"']([A-Za-z0-9_-]+)[\"']/g)].map((match) => match[1]));
  for (const fragment of localFragments) {
    if (!staticIds.has(fragment)) errors.push(`${route} links to #${fragment}, but no matching static id exists in the route.`);
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  catalogComponents: catalogNames.length,
  uniqueCatalogNames: new Set(catalogNames).size,
  livePreviews: new Set([...caseNames, ...specialNames]).size,
  regularPreviewCases: new Set(caseNames).size,
  specialPreviewCases: specialNames.length,
  requiredPropsAudited: componentFiles.length - specialNames.length,
  routesChecked: requiredRoutes.length,
  docsOutsideLibraryPackage: !await exists(join(root, 'src/lib/docs/catalog.ts')),
  errors
};
await writeFile(join(root, 'docs/docs-verification.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Docs verification passed: ${catalogNames.length} components, ${report.livePreviews} live previews, ${requiredRoutes.length} routes.`);
