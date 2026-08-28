import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = join(root, 'dist');
const sourceRoot = join(root, 'src/lib');
const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
const errors = [];

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

function hash(value) {
  return createHash('sha256').update(value).digest('hex');
}

if (!(await exists(join(distRoot, 'index.js')))) errors.push('dist/index.js is missing.');
if (!(await exists(join(distRoot, 'index.d.ts')))) errors.push('dist/index.d.ts is missing.');

const distFiles = await walk(distRoot);
const componentFiles = distFiles.filter((file) => file.endsWith('.svelte') && !/[\\/]internal[\\/]/.test(file));
if (componentFiles.length !== 132) errors.push(`Expected 132 packaged Svelte components, found ${componentFiles.length}.`);
if (componentFiles.some((file) => /VirtualTable/i.test(file))) errors.push('VirtualTable is present in dist.');

for (const [subpath, target] of Object.entries(pkg.exports ?? {})) {
  if (subpath === '.') {
    for (const [condition, conditionTarget] of Object.entries(target)) {
      if (typeof conditionTarget === 'string' && !(await exists(join(root, conditionTarget)))) {
        errors.push(`Package export ${subpath}:${condition} points to missing ${conditionTarget}.`);
      }
    }
  } else if (typeof target === 'string' && !(await exists(join(root, target)))) {
    errors.push(`Package export ${subpath} points to missing ${target}.`);
  }
}

for (const cssName of ['styles.css', 'tokens.css', 'skeleton.css']) {
  const source = await readFile(join(sourceRoot, cssName), 'utf8');
  const packaged = await readFile(join(distRoot, cssName), 'utf8');
  if (hash(source) !== hash(packaged)) errors.push(`${cssName} differs between src/lib and dist.`);
}

for (const file of distFiles.filter((file) => extname(file) === '.js')) {
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  } catch (error) {
    errors.push(`JavaScript syntax check failed for ${relative(root, file)}: ${error.stderr?.toString().trim() ?? error.message}`);
  }
}

const index = await readFile(join(distRoot, 'index.js'), 'utf8');
const componentExports = [...index.matchAll(/default as ([A-Za-z_$][\w$]*)/g)].map((match) => match[1]);
if (componentExports.length !== 132) errors.push(`Expected 132 public component exports in dist/index.js, found ${componentExports.length}.`);
if (new Set(componentExports).size !== componentExports.length) errors.push('Duplicate component exports found in dist/index.js.');

const report = {
  generatedAt: new Date().toISOString(),
  package: `${pkg.name}@${pkg.version}`,
  packagedFiles: distFiles.length,
  packagedComponents: componentFiles.length,
  publicComponentExports: componentExports.length,
  javascriptFilesChecked: distFiles.filter((file) => extname(file) === '.js').length,
  errors
};
await writeFile(join(root, 'docs/distribution-verification.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Distribution verification passed: ${report.packagedComponents} components, ${report.packagedFiles} packaged files.`);
