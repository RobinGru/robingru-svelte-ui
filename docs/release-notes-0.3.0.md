# RobinGru Svelte UI 0.3.0

Version 0.3.0 ergänzt die bestehende Library um eine vollständige, statisch prerenderbare Demo- und Dokumentationswebsite. Die öffentliche Library bleibt bei **116 Komponenten**; Docs-Infrastruktur wird bewusst nicht als zusätzliche Produktkomponente gezählt.

## Wichtigste Neuerungen

- mehrseitige SvelteKit-Docs-Shell
- 116 echte Komponenten-Previews
- 116 statische Komponenten-Detailseiten
- globale Suche und Command-Palette
- Theme-, Dichte- und Viewport-Prüfung
- vollständige Pattern-, Dashboard-, Blog- und DataTable-Demos
- visuelle Token-Referenz
- interaktives Accessibility-Labor
- sichtbarer Skip-Link und eigene Fehlerseite

## DataTable

Die Demo verwendet 48 realistische Zeilen und zeigt den vorgesehenen Einsatzbereich der bestehenden DataTable. Eine VirtualTable wurde nicht hinzugefügt.

## Design

Die neue Site nutzt direkt RobinGru-Tokens und -Komponenten. Sie führt kein zweites Docs-Theme und keine zusätzliche UI-Library ein. Navigation und Katalogflächen sind bewusst opak und zurückhaltend statt glassmorphisch.

## Entwicklung

```bash
npm install
npm run docs
```

Vollständige Prüfung:

```bash
npm run verify
```

Weitere Details stehen in `docs/demo-site.md` und `docs/quality-report.md`.
