import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const project = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
const requested = {
  ...(project.dependencies ?? {}),
  ...(project.peerDependencies ?? {}),
  ...(project.devDependencies ?? {})
};
const packageNames = [
  'svelte',
  '@sveltejs/kit',
  '@sveltejs/vite-plugin-svelte',
  '@sveltejs/package',
  'vite',
  'vitest',
  'typescript',
  'tailwindcss',
  '@tailwindcss/vite',
  'bits-ui',
  '@skeletonlabs/skeleton',
  '@lucide/svelte'
];
const rows = [];
for (const name of packageNames) {
  let installed = '—';
  try {
    const packagePath = join(root, 'node_modules', ...name.split('/'), 'package.json');
    installed = JSON.parse(await readFile(packagePath, 'utf8')).version;
  } catch {
    // An install is intentionally not required for the source archive.
  }
  rows.push(`| \`${name}\` | \`${requested[name] ?? '—'}\` | ${installed === '—' ? 'nicht lokal installiert' : `\`${installed}\``} |`);
}
const text = `# Paketversionen\n\nRelease-Stand: 2026-08-25. Die Versionen in \`package.json\` sind die freigegebenen Anforderungen; nach \`npm install\` zeigt die letzte Spalte die lokal aufgelöste Version.\n\n| Paket | Freigegebene Version | Lokal aufgelöst |\n|---|---:|---:|\n${rows.join('\n')}\n`;
await writeFile(join(root, 'docs/versions.md'), text, 'utf8');
console.log(text);
