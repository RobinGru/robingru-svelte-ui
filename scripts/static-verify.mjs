import { createRequire } from 'node:module';
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcRoot = join(root, 'src');
const componentRoot = join(root, 'src/lib/components');
const indexPath = join(root, 'src/lib/index.ts');
const typesPath = join(root, 'src/lib/types.ts');
const toastPath = join(root, 'src/lib/toast.ts');
const stylesPath = join(root, 'src/lib/styles.css');
const tokensPath = join(root, 'src/lib/tokens.css');
const skeletonStylesPath = join(root, 'src/lib/skeleton.css');
const packagePath = join(root, 'package.json');

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

function lineFor(source, offset) {
  return source.slice(0, offset).split('\n').length;
}

function maskSvelteExpressions(source) {
  let output = '';
  let depth = 0;
  let quote;
  let escaped = false;

  for (const char of source) {
    if (depth === 0) {
      if (char === '{') {
        depth = 1;
        output += ' ';
      } else {
        output += char;
      }
      continue;
    }

    if (escaped) {
      escaped = false;
    } else if (quote) {
      if (char === '\\') escaped = true;
      else if (char === quote) quote = undefined;
    } else if (char === '"' || char === "'" || char === '`') {
      quote = char;
    } else if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
    }
    output += char === '\n' ? '\n' : ' ';
  }
  return output;
}

function validateMarkup(file, source) {
  const withoutScripts = maskSvelteExpressions(source
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, ''));
  const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
  const stack = [];
  const tagPattern = /<\/?([A-Za-z][\w:.-]*)(?:\s[^<>]*?)?\s*\/?>/g;
  let match;

  while ((match = tagPattern.exec(withoutScripts))) {
    const raw = match[0];
    const tag = match[1];
    if (raw.startsWith('</')) {
      const expected = stack.pop();
      if (expected !== tag) {
        return `Markup mismatch in ${relative(root, file)}:${lineFor(withoutScripts, match.index)}: expected </${expected ?? 'none'}>, found </${tag}>`;
      }
    } else if (!raw.endsWith('/>') && !voidTags.has(tag.toLowerCase())) {
      stack.push(tag);
    }
  }

  if (stack.length) return `Unclosed <${stack.at(-1)}> in ${relative(root, file)}`;
  return undefined;
}

function relativeImportCandidates(fromFile, specifier) {
  const base = resolve(dirname(fromFile), specifier);
  if (specifier.endsWith('.js')) {
    return [base, base.slice(0, -3) + '.ts', base.slice(0, -3) + '.js'];
  }
  return [base, `${base}.ts`, `${base}.js`, `${base}.svelte`, join(base, 'index.ts'), join(base, 'index.js')];
}

async function exists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

function namedImports(source, specifierPattern) {
  const imports = [];
  const pattern = /import\s*\{([\s\S]*?)\}\s*from\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = pattern.exec(source))) {
    if (!specifierPattern.test(match[2])) continue;
    for (const raw of match[1].split(',')) {
      const cleaned = raw.trim().replace(/^type\s+/, '');
      if (!cleaned) continue;
      imports.push(cleaned.split(/\s+as\s+/)[0].trim());
    }
  }
  return imports;
}

function exportedNames(source) {
  const names = new Set();
  const patterns = [
    /export\s+(?:declare\s+)?(?:type|interface|class|function|const|let|var|enum)\s+([A-Za-z_$][\w$]*)/g,
    /export\s*\{([^}]+)\}/g
  ];

  let match;
  while ((match = patterns[0].exec(source))) names.add(match[1]);
  while ((match = patterns[1].exec(source))) {
    for (const raw of match[1].split(',')) {
      const cleaned = raw.trim().replace(/^type\s+/, '');
      if (!cleaned) continue;
      names.add((cleaned.split(/\s+as\s+/).at(-1) ?? cleaned).trim());
    }
  }
  return names;
}


function syntaxErrors(ts, source, fileName) {
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS);
  return sourceFile.parseDiagnostics ?? [];
}

function validateCssBraces(file, source) {
  let depth = 0;
  for (const char of source.replace(/\/\*[\s\S]*?\*\//g, '')) {
    if (char === '{') depth += 1;
    if (char === '}') depth -= 1;
    if (depth < 0) return `Unexpected closing CSS brace in ${relative(root, file)}.`;
  }
  return depth === 0 ? undefined : `Unbalanced CSS braces in ${relative(root, file)}.`;
}

const allProjectFiles = await walk(srcRoot);
const allSourceFiles = allProjectFiles.filter((file) => /\.(?:svelte|ts|css)$/.test(file)).sort();
const svelteFiles = allSourceFiles.filter((file) => file.endsWith('.svelte'));
const tsFiles = allSourceFiles.filter((file) => file.endsWith('.ts'));
const cssFiles = allSourceFiles.filter((file) => file.endsWith('.css'));
const componentFiles = (await walk(componentRoot)).filter((file) => file.endsWith('.svelte')).sort();

const index = await readFile(indexPath, 'utf8');
const types = await readFile(typesPath, 'utf8');
const toast = await readFile(toastPath, 'utf8');
const styles = await readFile(stylesPath, 'utf8');
const tokens = await readFile(tokensPath, 'utf8');
const skeletonStyles = await readFile(skeletonStylesPath, 'utf8');
const pkg = JSON.parse(await readFile(packagePath, 'utf8'));
const errors = [];
const warnings = [];

let ts;
try {
  ts = require('typescript');
} catch {
  warnings.push('TypeScript package unavailable; script syntax transpilation was skipped.');
}

for (const file of svelteFiles) {
  const source = await readFile(file, 'utf8');
  const scripts = [...source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
  if (scripts.length !== 1) errors.push(`${relative(root, file)} must contain exactly one <script> block.`);

  if (scripts[0] && ts) {
    for (const diagnostic of syntaxErrors(ts, scripts[0][1], file.replace(/\.svelte$/, '.ts'))) {
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      errors.push(`${relative(root, file)} script: ${message}`);
    }
  }

  const markupError = validateMarkup(file, source);
  if (markupError) errors.push(markupError);

  for (const match of source.matchAll(/from\s+['"](\.[^'"]+)['"]/g)) {
    const candidates = relativeImportCandidates(file, match[1]);
    if (!(await Promise.all(candidates.map(exists))).some(Boolean)) {
      errors.push(`${relative(root, file)} imports missing file ${match[1]}`);
    }
  }

  const typeImports = namedImports(source, /(?:^|\/)types\.js$/);
  const typeExports = exportedNames(types);
  for (const name of typeImports) {
    if (!typeExports.has(name)) errors.push(`${relative(root, file)} imports missing type ${name} from types.js`);
  }
}

for (const file of tsFiles) {
  const source = await readFile(file, 'utf8');
  if (ts && !file.endsWith('.d.ts')) {
    for (const diagnostic of syntaxErrors(ts, source, file)) {
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      errors.push(`${relative(root, file)}: ${message}`);
    }
  }

  for (const match of source.matchAll(/from\s+['"](\.[^'"]+)['"]/g)) {
    const candidates = relativeImportCandidates(file, match[1]);
    if (!(await Promise.all(candidates.map(exists))).some(Boolean)) {
      errors.push(`${relative(root, file)} imports missing file ${match[1]}`);
    }
  }
}

const componentNames = componentFiles.map((file) => basename(file, '.svelte'));
const duplicateNames = componentNames.filter((name, index) => componentNames.indexOf(name) !== index);
if (duplicateNames.length) errors.push(`Duplicate component names: ${[...new Set(duplicateNames)].join(', ')}`);

const indexComponentNames = [...index.matchAll(/default as ([A-Za-z_$][\w$]*)/g)].map((match) => match[1]);
const duplicateIndexExports = indexComponentNames.filter((name, index) => indexComponentNames.indexOf(name) !== index);
if (duplicateIndexExports.length) errors.push(`Duplicate component exports in index.ts: ${[...new Set(duplicateIndexExports)].join(', ')}`);

for (const name of componentNames) {
  if (!indexComponentNames.includes(name)) errors.push(`Missing index export for ${name}`);
}
for (const name of indexComponentNames) {
  if (!componentNames.includes(name)) errors.push(`Index exports non-existent component ${name}`);
}

if (componentFiles.length !== 129) errors.push(`Expected 129 components, found ${componentFiles.length}.`);
if (/VirtualTable/i.test(componentNames.join(' '))) errors.push('VirtualTable must not be part of this release.');

const projectSource = (await Promise.all(allSourceFiles.map((file) => readFile(file, 'utf8')))).join('\n');
if (/from\s+['"]lucide-svelte['"]/.test(projectSource)) {
  errors.push('Deprecated lucide-svelte import found; use @lucide/svelte.');
}

const publicNames = new Set([
  ...indexComponentNames,
  ...exportedNames(types),
  ...exportedNames(toast),
  'cn',
  'ClassValue'
]);
for (const file of svelteFiles) {
  const source = await readFile(file, 'utf8');
  for (const name of namedImports(source, /^\$lib$/)) {
    if (!publicNames.has(name)) errors.push(`${relative(root, file)} imports missing public export ${name} from $lib`);
  }
}

const allDependencies = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}), ...(pkg.peerDependencies ?? {}) };
for (const forbidden of ['daisyui', 'shadcn-svelte', 'clsx', 'tailwind-merge', '@skeletonlabs/skeleton-svelte']) {
  if (forbidden in allDependencies) errors.push(`Redundant dependency found: ${forbidden}`);
}
for (const required of ['svelte', 'bits-ui', '@lucide/svelte']) {
  if (!(required in allDependencies)) errors.push(`Required dependency declaration missing: ${required}`);
}
if (!pkg.exports?.['./skeleton.css']) errors.push('Package export ./skeleton.css is missing.');
if (!pkg.exports?.['./styles.css'] || !pkg.exports?.['./tokens.css']) errors.push('Public CSS exports are incomplete.');
if (/tailwindcss|@skeletonlabs\/skeleton/.test(styles)) errors.push('Standalone styles.css must not require Tailwind or Skeleton.');
if (!/tailwindcss/.test(skeletonStyles) || !/@skeletonlabs\/skeleton/.test(skeletonStyles)) {
  errors.push('skeleton.css must provide the optional Tailwind/Skeleton integration.');
}

for (const file of cssFiles) {
  const source = await readFile(file, 'utf8');
  const cssError = validateCssBraces(file, source);
  if (cssError) errors.push(cssError);
}

const requiredSelectors = [
  '.rg-article', '.rg-article-layout', '.rg-article-header', '.rg-article-meta', '.rg-prose',
  '.rg-post-card', '.rg-post-grid', '.rg-toc', '.rg-newsletter', '.rg-author-card',
  '.rg-dashboard-grid', '.rg-dashboard-section', '.rg-filter-bar', '.rg-date-range',
  '.rg-chart-card', '.rg-chart-legend', '.rg-sparkline', '.rg-mini-bar-chart', '.rg-donut-chart',
  '.rg-progress-ring', '.rg-status-summary', '.rg-quick-actions', '.rg-trend-indicator',
  '.rg-data-table', '.rg-data-toolbar', '.rg-column-picker', '.rg-data-footer', '.rg-table-wrap'
];
for (const selector of requiredSelectors) {
  if (!styles.includes(selector)) errors.push(`Missing consolidated component style for ${selector}`);
}

const obsoleteSelectors = ['.rg-newsletter-card', '.rg-legend-item', '.rg-dashboard-grid > *'];
for (const selector of obsoleteSelectors) {
  if (styles.includes(selector)) errors.push(`Obsolete duplicate style selector remains: ${selector}`);
}

const report = {
  generatedAt: new Date().toISOString(),
  components: componentFiles.length,
  categories: Object.fromEntries(
    (await readdir(componentRoot, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((entry) => [entry.name, componentFiles.filter((file) => relative(componentRoot, file).split(sep)[0] === entry.name).length])
  ),
  uniqueComponentNames: new Set(componentNames).size,
  publicComponentExports: indexComponentNames.length,
  sourceFilesChecked: allSourceFiles.length,
  svelteFilesChecked: svelteFiles.length,
  errors,
  warnings
};
await writeFile(join(root, 'docs/static-verification.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Static verification passed: ${report.components} components, ${report.sourceFilesChecked} source files.`);
if (warnings.length) console.warn(warnings.join('\n'));
