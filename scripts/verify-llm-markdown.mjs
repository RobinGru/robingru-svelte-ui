import { readFile, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const staticRoot = join(root, 'static');
const requiredPages = [
  'index.md',
  'start/index.md',
  'installation/index.md',
  'why-robingru/index.md',
  'components/index.md',
  'patterns/index.md',
  'dashboard/index.md',
  'blog/index.md',
  'data/index.md',
  'tokens/index.md',
  'accessibility/index.md',
  'workbench/index.md'
];

async function exists(path) {
  try { return (await stat(path)).isFile(); } catch { return false; }
}

const errors = [];
for (const page of requiredPages) {
  if (!await exists(join(staticRoot, page))) errors.push(`Missing generated Markdown page: static/${page}`);
}

const catalog = await readFile(join(staticRoot, 'components/index.md'), 'utf8');
const componentLinks = [...catalog.matchAll(/\]\(\.\/[^/]+\/index\.md\)/g)];
if (componentLinks.length !== 129) errors.push(`Expected 129 component Markdown references, found ${componentLinks.length}.`);

const llms = await readFile(join(staticRoot, 'llms.txt'), 'utf8');
for (const page of requiredPages) {
  const relative = `./${page}`;
  if (!llms.includes(relative)) errors.push(`llms.txt does not link to ${relative}.`);
}
if (!llms.includes('rel="alternate" type="text/markdown"')) {
  errors.push('llms.txt does not document the HTML alternate relation.');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`LLM Markdown verification passed: ${requiredPages.length} primary pages and ${componentLinks.length} component references.`);
