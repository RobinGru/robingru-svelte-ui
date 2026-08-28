import { readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, join, relative, resolve } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const componentRoot = join(root, 'src/lib/components');

const categories = [
  ['foundation', 'Grundlagen & Status', 'Visuelle und semantische Primitives für Aktionen, Status, Flächen und Ladezustände.'],
  ['forms', 'Formulare', 'Native-first Controls und zusammengesetzte Formbausteine.'],
  ['navigation', 'Navigation & Shell', 'App-Rahmen, Seitenkopf, Navigation und Orientierung.'],
  ['overlay', 'Overlays & Feedback', 'Bits-UI-basiertes Fokus-, Portal- und Floating-Verhalten.'],
  ['data', 'Daten & Inhalte', 'Tabellen, Kennzahlen, Listen, Aktivitäten und strukturierte Inhalte.'],
  ['dashboard', 'Dashboard & Visualisierung', 'Leichte KPI-, Filter-, Status- und SVG-Visualisierungsbausteine.'],
  ['content', 'Blog & Editorial', 'Artikel, Prose, Metadaten, Navigation, Sharing und Beitragskarten.']
];

async function walk(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await walk(path));
    else if (entry.name.endsWith('.svelte')) result.push(path);
  }
  return result;
}

const files = (await walk(componentRoot)).filter((file) => !/[\\/]internal[\\/]/.test(file)).sort();
const names = files.map((file) => basename(file, '.svelte'));
const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
const index = await readFile(join(root, 'src/lib/index.ts'), 'utf8');
const exported = [...index.matchAll(/default as ([A-Za-z_$][\w$]*)/g)].map((match) => match[1]);
const missing = names.filter((name) => !exported.includes(name));
const extra = exported.filter((name) => !names.includes(name));
const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
const allDeps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}), ...(pkg.peerDependencies ?? {}) };
const forbidden = ['daisyui', 'shadcn-svelte', 'clsx', 'tailwind-merge', '@skeletonlabs/skeleton-svelte'].filter((dep) => dep in allDeps);

const verification = [
  `Components: ${files.length}`,
  `Unique names: ${new Set(names).size}`,
  `Public component exports: ${exported.length}`,
  `Missing exports: ${missing.length}`,
  `Extra exports: ${extra.length}`,
  `Forbidden/redundant dependencies: ${forbidden.length}`,
  `VirtualTable present: ${names.some((name) => /VirtualTable/i.test(name)) ? 'yes' : 'no'}`,
  ...files.map((file) => `- ${relative(root, file)}`)
].join('\n');
await writeFile(join(root, 'docs/verification.txt'), `${verification}\n`, 'utf8');

const catalogSections = categories.map(([directory, label, description]) => {
  const categoryNames = files
    .filter((file) => file.includes(`/components/${directory}/`))
    .map((file) => basename(file, '.svelte'))
    .sort((a, b) => a.localeCompare(b));
  return `## ${label} (${categoryNames.length})\n\n${description}\n\n${categoryNames.map((name) => `\`${name}\``).join(', ')}`;
});
const catalog = `# Komponenten-Katalog\n\n**${files.length} eindeutige Svelte-Komponenten** in sieben klar getrennten Verantwortungsbereichen. Der Katalog wird aus dem Source-Verzeichnis erzeugt und gegen \`src/lib/index.ts\` geprüft.\n\n${catalogSections.join('\n\n')}\n\n## Umfangsentscheidung\n\nRobinGru enthält bewusst **keine \`VirtualTable\`**. Die erweiterte \`DataTable\` deckt typische Produkt-, CRM-, Admin- und Blog-Backoffice-Tabellen mit Suche, Sortierung, Filtern, Auswahl, Spaltensteuerung, Sticky Header und Pagination ab.\n`;
await writeFile(join(root, 'docs/component-catalog.md'), catalog, 'utf8');

if (files.length !== 132) throw new Error(`Expected 132 components, found ${files.length}`);
if (duplicates.length) throw new Error(`Duplicate component names: ${[...new Set(duplicates)].join(', ')}`);
if (missing.length) throw new Error(`Components missing from index.ts: ${missing.join(', ')}`);
if (extra.length) throw new Error(`index.ts exports missing components: ${extra.join(', ')}`);
if (forbidden.length) throw new Error(`Redundant dependencies found: ${forbidden.join(', ')}`);
if (names.some((name) => /VirtualTable/i.test(name))) throw new Error('VirtualTable must not be part of this release.');
console.log(verification.split('\n').slice(0, 7).join('\n'));
