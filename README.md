# RobinGru Svelte UI

Ein ruhiges, hellblaues Design-System für **Svelte 5 und SvelteKit**. Die Bibliothek verbindet produktive App-Oberflächen, Dashboards, normale bis größere Datentabellen und redaktionelle Seiten mit einer gemeinsamen visuellen Sprache – ohne eine zweite Komponentenbibliothek nebenher zu installieren.

## Release 0.3.1

- **116 eindeutige Svelte-Komponenten** in sieben Bereichen
- integrierte **mehrseitige SvelteKit-Demo- und Dokumentationswebsite**
- **116 echte Live-Previews** mit Detailseiten, Beispielcode und Theme-/Dichte-Test
- **17 Blog- und Editorial-Komponenten**
- **14 Dashboard- und Visualisierungsbausteine**
- eine erweiterte **DataTable** für typische Produkt-, CRM-, Admin- und Backoffice-Tabellen
- bewusst **keine VirtualTable** und keine allgemeine Enterprise-Grid-Engine
- Light- und Dark-Theme auf semantischen OKLCH-Tokens
- optionale Skeleton-/Tailwind-Integration; eigenständiges CSS funktioniert ohne beide
- Bits UI nur für komplexes Overlay-Verhalten
- keine Runtime-Abhängigkeit von daisyUI oder shadcn-svelte

## Designcharakter

Ein leichtes, zurückhaltendes Blau markiert Fokus, Auswahl und wichtige Aktionen. Hauptflächen bleiben neutral. Das System setzt auf klare 1-px-Ränder, moderate Radien, kompakte Informationsdichte und sparsame Schatten.

Nicht Teil des Standarddesigns sind Glassmorphism, Neonverläufe, dekorative Blob-Hintergründe, übergroße SaaS-Hero-Schriften oder eine Card um jeden Absatz. daisyUI dient nur als leichte Referenz für freundliche Zustände – keine Klasse und kein Paket wird übernommen.

## Integrierte Demo- und Dokumentationswebsite

Das Repository enthält eine vollständige SvelteKit-Site, die die Bibliothek direkt aus dem lokalen `src/lib` importiert. Sie ist damit Dokumentation, Showcase und Integrationstest zugleich.

```bash
npm install
npm run docs
```

Die Hauptbereiche sind:

| Route | Inhalt |
|---|---|
| `/` | Übersicht, Designprinzipien und Einstieg |
| `/components` | filterbarer Katalog mit 116 Live-Previews |
| `/components/[slug]` | Einzelansicht mit DemoFrame, Usage-Code und verwandten Komponenten |
| `/patterns` | Login, Einstellungen, Kommentare und Empty-State als reale Kompositionen |
| `/dashboard` | vollständiges operatives Dashboard |
| `/blog` | Beitragsübersicht und kompletter Editorial-Artikel |
| `/data` | DataTable mit 48 Datensätzen, Filtern, Auswahl und Detail-Drawer |
| `/tokens` | live umschaltbare Farb-, Spacing-, Radius-, Shadow- und Typografie-Tokens |
| `/accessibility` | Tastatur-, Fokus-, Formular-, Live-Region- und Motion-Labor |
| `/workbench` | ursprüngliche Gesamtansicht aller großen Anwendungsbereiche |

Die globale Suche ist über `Cmd/Ctrl + K` erreichbar. Theme, Dichte und mobile Navigation lassen sich direkt in der Docs-Shell testen. Alle Routen sind für statisches Prerendering vorbereitet. Details: [`docs/demo-site.md`](docs/demo-site.md).

## Installation aus GitHub

```bash
bun add github:RobinGru/robingru-svelte-ui
# oder mit npm
npm install github:RobinGru/robingru-svelte-ui
```

Das Paket wird derzeit nicht über npm veröffentlicht. Die `prepare`-Routine erzeugt beim Installieren aus GitHub die benötigte `dist/`-Ausgabe.

### Eigenständiges CSS

Für Projekte ohne Skeleton-Theme-Stack:

```css
@import '@robingru/svelte-ui/styles.css';
```

### Mit Skeleton 5 und Tailwind 4

```css
@import '@robingru/svelte-ui/skeleton.css';
```

`./skeleton.css` lädt Tailwind, Skeleton und anschließend die Komponentenstyles. `./styles.css` enthält dagegen ausschließlich Tokens und Komponentenstyles.

## Theme

```html
<html data-theme="robin">
```

Dunkel:

```html
<html data-theme="robin-dark">
```

Kompaktere Dichte:

```html
<body data-density="compact">
```

Alle Komponenten verwenden semantische Variablen mit `--rg-*`-Präfix. Ein Brand-Theme kann deshalb ohne dupliziertes Komponenten-CSS angepasst werden.

## Dashboard-Beispiel

```svelte
<script lang="ts">
  import {
    ChartCard,
    DashboardGrid,
    KpiCard,
    MiniBarChart,
    Sparkline,
    type ChartDatum
  } from '@robingru/svelte-ui';

  const revenue: ChartDatum[] = [
    { label: 'Mai', value: 36 },
    { label: 'Jun', value: 48 },
    { label: 'Jul', value: 54 },
    { label: 'Aug', value: 61 }
  ];
</script>

<DashboardGrid columns={3}>
  <KpiCard label="Umsatz" value="61.240 €" trend="+12,4 %" direction="up">
    {#snippet visual()}
      <Sparkline values={[36, 48, 54, 61]} label="Umsatztrend" />
    {/snippet}
  </KpiCard>
</DashboardGrid>

<ChartCard title="Monatlicher Umsatz">
  {#snippet chart()}
    <MiniBarChart data={revenue} />
  {/snippet}
</ChartCard>
```

## DataTable-Beispiel

Die DataTable unterstützt Suche, Sortierung, Spaltenfilter, Auswahl, Spaltensteuerung, Sticky Header, Pagination, kompakte Dichte, Ladezustände, benutzerdefinierte Zellen und Zeilenaktionen.

```svelte
<script lang="ts">
  import {
    Badge,
    DataTable,
    type DataTableColumn,
    type DataTableRowId
  } from '@robingru/svelte-ui';

  let selected = $state<DataTableRowId[]>([]);

  const columns: DataTableColumn[] = [
    { key: 'id', label: 'Auftrag', sortable: true, searchable: false },
    { key: 'customer', label: 'Kund:in', sortable: true },
    {
      key: 'status',
      label: 'Status',
      filterOptions: [
        { value: 'Bezahlt', label: 'Bezahlt' },
        { value: 'Offen', label: 'Offen' }
      ]
    }
  ];

  const rows = [
    { id: 'RG-1048', customer: 'Mara Klein', status: 'Bezahlt' },
    { id: 'RG-1047', customer: 'Studio Nord', status: 'Offen' }
  ];
</script>

{#snippet cell(value: unknown, row: Record<string, unknown>, column: DataTableColumn)}
  {#if column.key === 'status'}
    <Badge tone={value === 'Bezahlt' ? 'success' : 'warning'}>{String(value)}</Badge>
  {:else}
    {String(value ?? '—')}
  {/if}
{/snippet}

<DataTable
  {columns}
  {rows}
  rowId="id"
  bind:selected
  selectable
  striped
  pageSize={10}
  {cell}
/>
```

Für selektierbare Tabellen sollte `rowId` auf einen stabilen Schlüssel zeigen. Die Bibliothek virtualisiert bewusst nicht; bei serverseitigen Daten können Sortierung, Filter und Pagination außerhalb der Komponente gesteuert oder die vorhandenen Primitives zu einer projektspezifischen Tabelle zusammengesetzt werden.

## Blog- und Editorial-Beispiel

```svelte
<script lang="ts">
  import {
    Article,
    ArticleHeader,
    ArticleMeta,
    Prose,
    TableOfContents
  } from '@robingru/svelte-ui';

  const toc = [
    { label: 'Einleitung', href: '#intro', level: 2 as const, active: true },
    { label: 'Umsetzung', href: '#implementation', level: 2 as const }
  ];
</script>

<Article size="lg">
  {#snippet aside()}
    <TableOfContents items={toc} />
  {/snippet}

  <ArticleHeader title="Ein ruhiges Editorial-System" description="Inhalt bleibt der Mittelpunkt.">
    {#snippet meta()}
      <ArticleMeta author="Robin Gru" published="25. August 2026" minutes={7} />
    {/snippet}
  </ArticleHeader>

  <Prose>
    <h2 id="intro">Einleitung</h2>
    <p>Das System trennt Editorial-Hierarchie und App-Hierarchie, verwendet aber dieselben Tokens.</p>
  </Prose>
</Article>
```

## Komponentenbereiche

| Bereich | Anzahl | Aufgabe |
|---|---:|---|
| Foundation | 30 | Buttons, Flächen, Status, Avatare und Ladezustände |
| Forms | 22 | Native-first Formulare und zusammengesetzte Controls |
| Navigation | 12 | App-Shell, Sidebar, Navbar, Tabs und Orientierung |
| Overlay | 11 | Dialoge, Menüs, Popover, Tooltips und Feedback |
| Data | 10 | Tabellen, KPI, Listen, Aktivitäten und strukturierte Daten |
| Dashboard | 14 | Filter, Trends, Status und leichte SVG-Visualisierung |
| Content | 17 | Artikel, Prose, TOC, Code, Sharing und Beitragskarten |

Der vollständige, automatisch erzeugte Katalog steht in [`docs/component-catalog.md`](docs/component-catalog.md).

## Entwicklung und Qualität

```bash
npm install
npm run dev
```

Vollständige Prüfkette mit installierten Abhängigkeiten:

```bash
npm run verify
```

Sie umfasst statische Prüfung, `svelte-check`, Vitest, SvelteKit-Build, Svelte-Package, Katalog- und Distributionsprüfung.

Lokale visuelle Referenzen prüfen Blog und DataTable in Desktop, Kompakt, Dark und Mobil. Beim ersten Lauf werden die Baselines bewusst explizit erzeugt:

```bash
bun run test:visual:update
bun run test:visual
```

Lighthouse ist ebenfalls nur lokal vorgesehen und nicht Teil des GitHub-Pages-Workflows:

```bash
bun run audit:lighthouse
```

Die mitgelieferten Source- und Distributionsdateien lassen sich auch ohne Registry-Zugriff prüfen:

```bash
npm run verify:offline
```

Nach installierten Dev-Abhängigkeiten kann die Source-Distribution neu erzeugt werden:

```bash
npm run verify:source
```

Details stehen in [`docs/quality-report.md`](docs/quality-report.md).

## Architekturregeln

1. **Native first:** Standard-Inputs, Selects, Datum, Zeit, Progress und Meter bleiben native Elemente.
2. **Bits for behavior:** Fokusmanagement, Portale, Escape-Handling und Floating-Positionierung kommen aus Bits UI.
3. **Ein öffentliches Muster pro Aufgabe:** Neue Komponenten dürfen keine beinahe identische zweite API schaffen.
4. **Leichte Visualisierung:** Sparkline, MiniBarChart, DonutChart und ProgressRing decken kompakte Dashboards ab; die Bibliothek baut keine allgemeine Chart-Engine nach.
5. **DataTable statt Grid-Parallelwelt:** Normale bis größere Tabellen erhalten eine starke Standardkomponente, aber keine VirtualTable.
6. **Editorial bleibt Editorial:** Prose und Article optimieren Lesefluss statt Dashboard-Karten zu imitieren.
7. **daisyUI nur als Referenz:** Keine Runtime-, Klassen- oder Theme-Abhängigkeit.

Weitere Details: [`docs/architecture.md`](docs/architecture.md)

## Lizenz

MIT
