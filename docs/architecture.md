# Architektur

## Zielbild

RobinGru Svelte UI verbindet drei Oberflächenarten in einem System:

1. **produktive App-Oberflächen** mit Formularen, Navigation und Overlays,
2. **Dashboards und Datentabellen** mit hoher Informationsdichte,
3. **Blog- und Editorial-Seiten** mit ruhigem Lesefluss.

Sie teilen Tokens, Fokuszustände, Abstände, Typografie und Zustandsfarben. Sie teilen jedoch nicht zwangsläufig dieselbe visuelle Komposition. Ein Artikelabsatz wird deshalb nicht in eine Dashboard-Card gezwungen.

## Schichten

### 1. Tokens

`tokens.css` definiert primitive und semantische Variablen mit `--rg-*`-Präfix. Komponenten verwenden ausschließlich semantische Tokens wie `--rg-surface`, `--rg-fg`, `--rg-border`, `--rg-primary` oder `--rg-success`.

Light und Dark Theme ändern dieselben Bedeutungen, nicht die Komponentenimplementierung. Dichte kann unabhängig davon über `data-density="compact"` reduziert werden.

### 2. Core-Komponenten

Foundation, Forms und Navigation basieren bevorzugt auf nativen Elementen. Input, Select, Checkbox, Datum, Zeit, Progress und Meter werden nicht unnötig in JavaScript nachgebaut.

Der lokale `cn()`-Helper verbindet nur optionale Klassen. Er versucht bewusst nicht, Tailwind-Klassen semantisch zusammenzuführen; dadurch entfallen `clsx` und `tailwind-merge`.

### 3. Behavior-Komponenten

Bits UI wird dort verwendet, wo Verhalten tatsächlich komplex ist: Fokus-Fallen, Portale, Escape-Handling, Floating-Positionierung und zugängliche Overlay-Zustände. Dialoge, Menüs, Popover und Tooltips bauen darauf auf.

Bits UI bestimmt nicht die visuelle Sprache. RobinGru liefert Styling und semantische Tokens.

### 4. Dashboard-Komposition

Dashboard-Komponenten sind klein und kombinierbar:

- `DashboardGrid` und `DashboardSection` organisieren Layout und Hierarchie.
- `KpiCard` und `TrendIndicator` bilden Kennzahlen und Trendbedeutung ab.
- `FilterBar` und `DateRangePicker` halten Filter zusammen.
- `StatusSummary` und `QuickActions` verdichten operative Informationen.
- `Sparkline`, `MiniBarChart`, `DonutChart` und `ProgressRing` sind leichte SVG-Visualisierungen.

RobinGru baut bewusst keine allgemeine Chart-Engine nach. Komplexe Achsen, Interaktionen oder große Zeitreihen können projektspezifisch mit einer spezialisierten Chart-Library innerhalb von `ChartCard` gerendert werden.

### 5. DataTable

Es existiert eine einzige erweiterte `DataTable`. Sie unterstützt typische Produkt-, CRM-, Admin- und Backoffice-Tabellen mit:

- clientseitiger Suche und Sortierung,
- Spaltenfiltern,
- stabiler Zeilenauswahl,
- Spaltenein-/ausblendung,
- Sticky Header,
- Pagination und variabler Seitengröße,
- kompakter oder komfortabler Dichte,
- Lade-, Leer- und Auswahlzuständen,
- benutzerdefinierten Zellen und Zeilenaktionen.

Die Komponente virtualisiert nicht. Das entspricht dem gewünschten Umfang und verhindert eine zweite, wesentlich komplexere Grid-Architektur. Für serverseitige Daten bleiben die vorhandenen Tabellen-, Pagination- und Formular-Primitives kombinierbar.

### 6. Editorial-Komposition

`Article`, `ArticleHeader`, `ArticleMeta`, `Prose` und `TableOfContents` bilden den lesbaren Kern. `CodeBlock`, `Blockquote`, `Figure`, `AuthorCard`, `ShareButtons`, `NewsletterCard`, `ArticleNavigation` und Beitragskarten ergänzen typische Blog- und Dokumentationsseiten.

`Prose` stylt semantisches HTML, statt für jeden Absatz eine spezielle Komponente zu verlangen. Dadurch bleiben Inhalte aus CMS, Markdown oder mdsvex nutzbar.

### 7. Demo- und Dokumentationsschicht

Die SvelteKit-Demo liegt unter `src/docs` und `src/routes`. Der Alias `$docs` hält Katalog, Preview-Konfiguration und Docs-Shell außerhalb von `src/lib`. Dadurch nutzt die Demo direkt die öffentliche Library, wird aber nicht als Library-Runtime mitveröffentlicht.

Der zentrale Katalog beschreibt alle 116 Komponenten. Ein gemeinsamer `DemoFrame` übernimmt Theme, Dichte und Viewport; Einzelrouten duplizieren diese Steuerung nicht. Die Komponentenübersicht nutzt `content-visibility`, damit der vollständige Live-Katalog responsiv bleibt.

Die Site ist für statisches Prerendering vorbereitet und dient als Dokumentation, Showcase und Integrationsprüfung.

## CSS-Einstiege

- `@robingru/svelte-ui/styles.css`: eigenständige RobinGru-Tokens und Komponentenstyles
- `@robingru/svelte-ui/tokens.css`: nur Tokens und Themes
- `@robingru/svelte-ui/skeleton.css`: Tailwind 4 + Skeleton 5 + RobinGru

Damit ist Skeleton eine optionale Design-System-Grundlage und keine zwingende Runtime-Schicht für jede Nutzung.

## Redundanzregeln

- kein daisyUI-Runtime-Paket; nur leichte visuelle Referenz
- kein shadcn-svelte-Paket als parallele Komponentenquelle zur Laufzeit
- kein `@skeletonlabs/skeleton-svelte` neben RobinGru-Komponenten
- keine zweite Toast-, Form-, Tabellen- oder Chart-Runtime
- keine duplizierten Komponenten für Delta/Trend, Card/Panel oder ähnliche Aufgaben
- ein Komponentenname wird genau einmal exportiert

## Visuelle Leitplanken

Das Design setzt auf neutrale Flächen, klare 1-px-Ränder, moderate Radien, sichtbare Fokuszustände, kompakte Informationsdichte und sparsame Schatten. Blau trägt Bedeutung. Effekte ersetzen keine Informationshierarchie.

Standardmäßig vermieden werden Glassmorphism, Neonverläufe, dekorative Blobs, allgegenwärtige Pills, übergroße Hero-Typografie und Kartenraster ohne semantischen Grund.

## Barrierefreiheit

- native Controls behalten Browser-Semantik
- Fokuszustände sind sichtbar
- Icons mit rein dekorativer Funktion erhalten `aria-hidden`
- Diagramme haben Rollen und zugängliche Labels
- DataTable nutzt Caption, echte Tabellenstruktur und echte Checkboxen
- `prefers-reduced-motion` reduziert Animation und Transition
- Print-Regeln entfernen nicht relevante Editorial-Aktionen

Die statischen Prüfungen ersetzen keine formale WCAG-Zertifizierung und keine manuelle Browser-/Screenreader-Matrix.
