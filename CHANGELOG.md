# Changelog

## 0.3.1

- Fix production prerender failure caused by demo links targeting a missing `#preview` anchor.
- Remove Svelte 5 state-capture warnings in `DataTable` and the docs `DemoFrame`.
- Fix `SegmentedControl` radio semantics by removing unsupported `aria-pressed`.
- Remove HTML `autofocus` from `CommandPalette` and rely on dialog focus management.
- Add the SVG favicon declaration to avoid `/favicon.ico` requests.
- Run `svelte-kit sync` before dev/docs/build commands; `preview` now builds first, without a consumer-facing `prepare` lifecycle hook.

## 0.3.0 — 2026-08-26

### Neu

- vollständige mehrseitige SvelteKit-Demo- und Dokumentationswebsite
- filterbarer Komponenten-Katalog mit 129 echten Live-Previews
- statisch prerenderbare Detailseiten für jede öffentliche Komponente
- gemeinsamer `DemoFrame` mit Robin Light/Dark, normaler/kompakter Dichte und Desktop-/Tablet-/Mobile-Vorschau
- globale Such- und Command-Palette über `Cmd/Ctrl + K`
- vollständige Pattern-, Dashboard-, Blog-, DataTable-, Token- und Accessibility-Routen
- eigenständige 404-/Fehlerseite im RobinGru-System

### Verbessert

- vorhandene Workbench in eine klare Informationsarchitektur eingebettet
- DataTable-Showcase auf 48 realistische Datensätze mit Detail-Drawer erweitert
- Design-Tokens als live umschaltbare visuelle Referenz dokumentiert
- Accessibility als interaktives Labor statt nur als Checkliste umgesetzt
- Docs-Chrome bewusst ohne Glassmorphism oder dekorative Effektflächen gestaltet
- Demo-App verwendet direkt die lokale Library und dient damit als Integrationsprüfung

### Unverändert bewusst

- 129 öffentliche Komponenten ohne künstliche Aufblähung
- keine `VirtualTable` und keine zusätzliche Tabellen-Engine
- keine daisyUI- oder shadcn-svelte-Runtime

## 0.2.0 — 2026-08-25

### Neu

- 17 abgestimmte Blog- und Editorial-Komponenten: `Article`, `ArticleHeader`, `ArticleMeta`, `ArticleNavigation`, `AuthorCard`, `Blockquote`, `CodeBlock`, `Figure`, `NewsletterCard`, `PostCard`, `PostGrid`, `Prose`, `ReadingTime`, `RelatedPosts`, `ShareButtons`, `TableOfContents` und `TagList`
- 14 Dashboard- und Visualisierungsbausteine: `ChartCard`, `ChartLegend`, `DashboardGrid`, `DashboardSection`, `DateRangePicker`, `DonutChart`, `FilterBar`, `MiniBarChart`, `ProgressRing`, `QuickActions`, `Sparkline`, `StatusSummary`, `TableSkeleton` und `TrendIndicator`
- neue vollständige Workbench für Dashboard, DataTable und Editorial Content
- automatisch erzeugter Komponenten-Katalog und separate Distributionsprüfung

### Verbessert

- `DataTable` um Suche, Sortierung, Statusfilter, Mehrfachauswahl, Spaltensteuerung, Sticky Header, Pagination, Seitengröße, Dichte, Hover/Striping, Ladezeilen, benutzerdefinierte Zellen und Zeilenaktionen erweitert
- `KpiCard` mit Sparkline-/Visual-Slot, Footer und wiederverwendetem `TrendIndicator`
- inverse Trendbewertung für Kennzahlen, bei denen sinkende Werte positiv sind
- Robin-Blue-Tokens, Abstände, Radien, Fokuszustände und Responsive-Verhalten über alle neuen Bereiche vereinheitlicht
- CSS-Duplikate aus Entwicklungsständen entfernt und in einer einzigen Komponentenebene konsolidiert
- stabile, zueinander kompatible Paketversionen explizit gepinnt

### Bewusste Abgrenzung

- keine `VirtualTable`
- keine zweite Tabellen-, Toast-, Formular- oder Chart-Bibliothek
- kein daisyUI- oder shadcn-svelte-Runtime-Paket

## 0.1.0 — 2026-08-25

- erster RobinGru-Komponentenkatalog mit 85 Komponenten
- Robin-Blue Token-System mit Light/Dark Theme
- Bits-UI-Overlays und native Form-Controls
- Skeleton- und Tailwind-CSS-Integration
- Workbench, Tests, Packaging und Redundanzprüfung
