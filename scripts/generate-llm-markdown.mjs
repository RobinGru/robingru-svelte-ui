import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const staticRoot = join(root, 'static');
const catalog = await readFile(join(root, 'src/docs/catalog.ts'), 'utf8');

const categories = [
  ['foundation', 'Grundlagen & Status'],
  ['forms', 'Formulare'],
  ['navigation', 'Navigation & Shell'],
  ['overlay', 'Overlays & Feedback'],
  ['data', 'Daten & strukturierte Inhalte'],
  ['dashboard', 'Dashboard & Visualisierung'],
  ['content', 'Blog & Editorial']
];

const namesBlock = catalog.split('const names:', 2)[1]?.split('const descriptions:', 1)[0] ?? '';
const descriptionsBlock = catalog.split('const descriptions:', 2)[1]?.split('const featured', 1)[0] ?? '';
const descriptions = new Map([...descriptionsBlock.matchAll(/^  ([A-Za-z0-9]+): '([^']*)',?$/gm)].map((match) => [match[1], match[2]]));
const components = new Map(categories.map(([id]) => {
  const block = namesBlock.match(new RegExp(`${id}: \\[([\\s\\S]*?)\\]`, 'm'))?.[1] ?? '';
  return [id, [...block.matchAll(/'([A-Za-z0-9]+)'/g)].map((match) => match[1])];
}));

function slugify(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

async function output(relativePath, content) {
  const destination = join(staticRoot, relativePath);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, `${content.trim()}\n`, 'utf8');
}

await rm(join(staticRoot, '.llms-pages'), { recursive: true, force: true });

const pages = {
  'index.md': `# RobinGru Svelte UI

> Token-basiertes Svelte-5-Designsystem für Anwendungen, Dashboards, Datenansichten, Navigation und Editorial Content.

RobinGru Svelte UI umfasst 132 öffentliche Komponenten. Es unterstützt die Themes \`robin\` und \`robin-dark\` sowie \`data-density="compact"\`.

## Weiterführende Dokumentation

- [Installation](./installation/index.md): GitHub-Installation, Styles und erster Komponentenimport.
- [Starte hier](./start/index.md): Der kürzeste Weg zur ersten Komponente.
- [Warum RG Svelte UI?](./why-robingru/index.md): Stärken, Einsatzbereich und bewusste Grenzen.
- [Komponentenkatalog](./components/index.md): Alle öffentlichen Komponenten nach Kategorie.
- [Design Tokens](./tokens/index.md): Themes, Dichte, Farben, Abstände und weitere Tokens.
- [Icons](./icons/index.md): Lucide-Integration, Import und häufige Icons.`,
  'installation/index.md': `# Installation aus GitHub

> RobinGru Svelte UI wird derzeit direkt aus GitHub bezogen, nicht aus npm.

## Installation

\`\`\`sh
bun add github:RobinGru/robingru-svelte-ui
# oder
npm install github:RobinGru/robingru-svelte-ui
\`\`\`

## Eigenständige Styles

\`\`\`css
@import '@robingru/svelte-ui/styles.css';
\`\`\`

## Erste Komponente

\`\`\`svelte
<script lang="ts">
  import { Button } from '@robingru/svelte-ui';
</script>

<Button>Projekt anlegen</Button>
\`\`\`

Für bestehende Skeleton-5- und Tailwind-4-Projekte kann stattdessen \`@robingru/svelte-ui/skeleton.css\` importiert werden.`,
  'start/index.md': `# Starte hier

> Der kürzeste Einstieg in drei Schritten: installieren, Styles einbinden und die erste Komponente verwenden.

## 1. Aus GitHub installieren

\`\`\`sh
bun add github:RobinGru/robingru-svelte-ui
\`\`\`

## 2. Styles einbinden

\`\`\`css
@import '@robingru/svelte-ui/styles.css';
\`\`\`

## 3. Erste Komponente

\`\`\`svelte
<script lang="ts">
  import { Button } from '@robingru/svelte-ui';
</script>

<Button>Projekt anlegen</Button>
\`\`\`

Danach stehen der [Komponentenkatalog](../components/index.md), [Design Tokens](../tokens/index.md) und die [Gesamt-Workbench](../workbench/index.md) für die Vertiefung bereit.`,
  'why-robingru/index.md': `# Warum RG Svelte UI?

> RG steht für RobinGru. Das System ist für ruhige, konsistente Svelte-Oberflächen gedacht, die Produkt, Daten und Inhalte verbinden.

## Stärken

- Ein gemeinsames Token-, Theme- und Dichtesystem für Anwendungen, Dashboards und Editorial Content.
- Datenkomponenten für normale bis mittelgroße Tabellen ohne VirtualTable-Komplexität.
- Svelte-5-nahe Komponenten mit nativer Semantik und Bits UI für komplexe Interaktionen.
- Live-Dokumentation, die einzelne Komponenten und zusammengesetzte Oberflächen zeigt.

## Bewusste Grenzen

- Nicht als vollständig neutrales Primitivesystem gedacht.
- Keine VirtualTable oder generische Enterprise-Grid-Engine.
- Nicht nötig für Projekte, die nur wenige isolierte Basiskomponenten benötigen.`,
  'patterns/index.md': `# Patterns

> Zusammengesetzte, produktnahe Oberflächen aus RobinGru-Komponenten.

Die Seite zeigt unter anderem Login, Einstellungen, Kommentare und Empty States. Sie hilft dabei, Abstände, Hierarchie und Komponenten-Zusammenspiel im Anwendungskontext zu beurteilen.`,
  'dashboard/index.md': `# Dashboard

> Vollständige Dashboard-Demo mit Kennzahlen, Filtern, Status, leichten Charts und operativer Tabelle.

Verwendete Bausteine umfassen DashboardGrid, KpiCard, ChartCard, FilterBar, StatusSummary und DataTable.`,
  'blog/index.md': `# Blog & Editorial

> Editorial-Demo für Beitragsübersichten und lange Artikel.

Sie zeigt die Content-Komponenten Article, Prose, PostCard, ArticleMeta, TableOfContents und ShareButtons im Zusammenspiel.`,
  'data/index.md': `# DataTable

> Datenansicht für normale bis mittelgroße Datensätze.

DataTable unterstützt Suche, Sortierung, Filter, Auswahl, Spaltensteuerung, Pagination und einen Detail-Drawer. Für sehr große Datenmengen ist serverseitige Pagination oder ein spezialisiertes virtualisiertes Grid die passendere Wahl.`,
  'tokens/index.md': `# Design Tokens

> Die öffentliche visuelle API von RobinGru Svelte UI.

Wichtige Einstiege sind \`@robingru/svelte-ui/tokens.css\` für Tokens und \`@robingru/svelte-ui/styles.css\` für Tokens plus Komponentenstyles.

## Themes und Dichte

\`\`\`html
<html data-theme="robin">
<html data-theme="robin-dark">
<body data-density="compact">
\`\`\`

Die semantischen Custom Properties verwenden den Präfix \`--rg-\`. Öffentliche Tokens und Komponenten-Props sind gegenüber internen Selektoren zu bevorzugen.`,
  'icons/index.md': `# Icons

> RobinGru verwendet Lucide als einheitlichen Icon-Satz für Svelte.

Icons stammen aus \`@lucide/svelte\` und werden explizit importiert. Für eigene Icons sollte das Paket direkt als Projektabhängigkeit ergänzt werden:

\`\`\`sh
bun add @lucide/svelte
\`\`\`

\`\`\`svelte
<script lang="ts">
  import { Search, Settings } from '@lucide/svelte';
</script>

<Search size={16} aria-hidden="true" />
<button type="button" aria-label="Einstellungen"><Settings size={18} /></button>
\`\`\`

Die HTML-Dokumentation enthält eine durchsuchbare Galerie mit 100 häufigen Icons und konkrete Größen- sowie Accessibility-Regeln. Der vollständige Icon-Katalog ist bei [Lucide](https://lucide.dev/icons/) verfügbar.`,
  'accessibility/index.md': `# Accessibility

> Praktische Beispiele für Tastatur, Fokus, Formulare, Live-Regionen und reduzierte Bewegung.

RobinGru setzt auf native semantische Elemente, sichtbare Fokuszustände und verständliche Statusrückmeldungen. Komplexe Overlays basieren auf Bits UI.`,
  'workbench/index.md': `# Gesamt-Workbench

> Integrierte Anwendungsschale als vollständiger Showcase.

Die Workbench verbindet Navigation, Dashboard, DataTable, Formulare, Status- und Overlay-Komponenten in einer gemeinsamen Oberfläche.`
};

for (const [path, content] of Object.entries(pages)) await output(path, content);

const catalogSections = categories.map(([id, label]) => {
  const items = components.get(id) ?? [];
  return `## ${label}\n\n${items.map((name) => `- [${name}](./${slugify(name)}/index.md): ${descriptions.get(name) ?? `${name} component.`}`).join('\n')}`;
});
await output('components/index.md', `# Komponenten

> Vollständiger LLM-freundlicher Katalog der 132 öffentlichen RobinGru-Svelte-UI-Komponenten.

Jede Komponente wird aus \`@robingru/svelte-ui\` importiert. Die eigenständigen Styles werden einmal über \`@robingru/svelte-ui/styles.css\` eingebunden.

${catalogSections.join('\n\n')}`);

for (const [id, label] of categories) {
  for (const name of components.get(id) ?? []) {
    const slug = slugify(name);
    await output(`components/${slug}/index.md`, `# ${name}

> ${descriptions.get(name) ?? `${name} component.`}

Kategorie: ${label}.

## Verwendung

\`\`\`svelte
<script lang="ts">
  import { ${name} } from '@robingru/svelte-ui';
</script>
\`\`\`

Die vollständige Live-Vorschau und die aktuelle API befinden sich auf der [HTML-Dokumentationsseite](../).`);
  }
}

console.log(`Generated ${pages ? Object.keys(pages).length : 0} primary and ${[...components.values()].flat().length} component Markdown pages.`);
