# RobinGru Demo- und Dokumentationswebsite

Die Demo-Site ist Teil des Library-Repositories und wird als normale SvelteKit-Anwendung betrieben. Sie importiert die Komponenten direkt aus `src/lib`. Dadurch ist jede Seite gleichzeitig:

1. **Dokumentation** für Nutzer:innen der Library,
2. **Showcase** der gemeinsamen Designsprache,
3. **Integrationsprüfung** der öffentlichen Exporte und Komponentenkompositionen.

## Start

```bash
npm install
npm run docs
```

Produktionsausgabe:

```bash
npm run docs:build
npm run preview
```

Die Root-Layout-Konfiguration aktiviert Prerendering. Die 116 Komponenten-Detailseiten werden über `entries()` statisch erzeugt.

## Informationsarchitektur

| Route | Zweck |
|---|---|
| `/` | Einstieg, Prinzipien, ausgewählte Komponenten und Installationsbeispiel |
| `/components` | vollständiger, filterbarer Live-Katalog |
| `/components/[slug]` | Live-Demo, Usage-Code, Metadaten und verwandte Komponenten |
| `/patterns` | realistische Kombinationen aus mehreren Komponenten |
| `/dashboard` | vollständige operative Produktoberfläche |
| `/blog` | Beitragsübersicht plus kompletter Editorial-Artikel |
| `/data` | mittelgroße DataTable mit realistischen Arbeitsabläufen |
| `/tokens` | visuelle Token-Referenz für Light und Dark |
| `/accessibility` | Tastatur-, Fokus-, Formular-, Live-Region- und Motion-Labor |
| `/workbench` | ursprüngliche große Gesamtansicht des Systems |

## Docs-Shell

Die globale Shell enthält:

- responsive Sidebar,
- mobile Navigation mit Overlay,
- persistente Theme-Umschaltung,
- normale und kompakte Dichte,
- globale Command-Palette über `Cmd/Ctrl + K`,
- aktive Routendarstellung,
- sichtbaren Skip-Link,
- eigene Fehlerseite.

Die Docs-Shell verwendet ausschließlich RobinGru-Komponenten und semantische `--rg-*`-Tokens. Es gibt keine separate visuelle Parallelwelt für die Dokumentation.

## Komponenten-Katalog

`src/docs/catalog.ts` ist die einzige Quelle für Namen, Kategorien, Beschreibungen, Keywords und Source-Pfade der 116 Komponenten. Der Katalog wird für Navigation, Suche, Detailseiten, Related Components und die Zählung verwendet.

Jede Komponente erhält eine echte Vorschau. `preview-config.ts` definiert dafür sinnvolle Standarddaten. Komponenten mit zusammengesetztem Zustand wie `Tabs`, `List`, `CommandPalette` und `ToastViewport` besitzen eine kleine spezielle Vorschau in `ComponentPreview.svelte`.

Ein automatischer Audit prüft, dass:

- alle 116 Katalognamen eindeutig sind,
- 112 reguläre Preview-Konfigurationen vorhanden sind,
- die vier speziellen Komponenten separat behandelt werden,
- kein Komponentenname ohne Vorschau bleibt,
- alle statisch sichtbaren Pflicht-Props versorgt sind.

## DemoFrame

Detailseiten verwenden einen gemeinsamen `DemoFrame` mit:

- Robin Light und Robin Dark,
- normaler und kompakter Dichte,
- Desktop-, Tablet- und Mobile-Breite,
- optionaler Innenpolsterung,
- mehreren Höhenstufen.

Damit können Komponenten isoliert geprüft werden, ohne für jede Seite eigene Preview-Controls zu duplizieren.

## Showcase-Routen

### Patterns

Zeigt Login, Benachrichtigungseinstellungen, Kommentare und einen Onboarding-/Empty-State. Die Beispiele kombinieren vorhandene Komponenten, statt neue Demo-only Widgets einzuführen.

### Dashboard

Enthält FilterBar, DateRangePicker, KpiCards, Sparklines, Balken- und Donutdarstellung, ProgressRing, StatusSummary, QuickActions und DataTable.

### Blog

Enthält PostGrid, PostCards und einen vollständigen Artikel mit ArticleHeader, ArticleMeta, TableOfContents, Prose, Blockquote, Figure, CodeBlock, ShareButtons, AuthorCard, NewsletterCard, ArticleNavigation und RelatedPosts.

### DataTable

Zeigt 48 Datensätze mit Suche, zwei Filtern, Sortierung, Spaltenauswahl, Sticky Header, Zeilenauswahl, Pagination, Ladezustand, Row Actions und Detail-Drawer. Eine VirtualTable oder zweite Tabellen-Engine ist nicht enthalten.

### Tokens

Stellt Blue- und Slate-Skalen, semantische Farben, Spacing, Radien, Schatten und Typografie visuell dar. Der gesamte Bereich kann unabhängig zwischen Robin Light und Robin Dark umgeschaltet werden.

### Accessibility

Macht sichtbaren Fokus, Tastaturpfade, Labels, Hilfetexte, Fehlermeldungen, Live-Regionen und `prefers-reduced-motion` direkt prüfbar. Die Seite ist bewusst keine formale WCAG-Zertifizierung.

## Ordnerstruktur

```text
src/
  lib/
    components/       # veröffentlichbare RobinGru-Komponenten
  docs/
    catalog.ts
    preview-config.ts
    components/       # ausschließlich Demo-/Docs-Infrastruktur
  routes/
    components/
    patterns/
    dashboard/
    blog/
    data/
    tokens/
    accessibility/
    workbench/
  docs.css             # Styles der Demo-Site
```

Docs-Komponenten liegen vollständig außerhalb von `src/lib` und werden über den Alias `$docs` importiert. Sie erhöhen deshalb weder den öffentlichen Komponenten-Katalog noch das npm-Paket künstlich.

## Gestaltungsregeln

Die Demo-Site folgt denselben Regeln wie die Library:

- helles Blau als Orientierung, nicht als flächige Tapete,
- neutrale Hauptflächen,
- klare 1-px-Ränder,
- moderate Radien,
- sparsame Schatten,
- keine Glassmorphism-Navigation,
- keine Neon- oder Blob-Dekoration,
- keine übergroßen Marketing-Heroes,
- keine Card um jeden Textabschnitt.
