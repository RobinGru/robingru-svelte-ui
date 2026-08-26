# Mitwirken

RobinGru wächst über klar abgegrenzte Aufgaben, nicht über möglichst viele beinahe identische APIs. Vor einer neuen Komponente ist zu prüfen, ob eine bestehende Variante, native HTML-Semantik, ein bereits vorhandenes RobinGru-Primitive oder Bits UI das Verhalten abdeckt.

## Verantwortungsbereiche

- `foundation`: universelle visuelle und semantische Primitives
- `forms`: native-first Eingaben und zusammengesetzte Controls
- `navigation`: Shell, Orientierung und Seitennavigation
- `overlay`: komplexes Fokus-, Portal- und Floating-Verhalten
- `data`: strukturierte Daten und typische Arbeitsoberflächen
- `dashboard`: Komposition, Kennzahlen und leichte SVG-Visualisierung
- `content`: Blog, Dokumentation und Editorial Content

Eine Komponente gehört genau in einen Bereich. Gemeinsame Logik wird wiederverwendet; beispielsweise nutzt `KpiCard` den vorhandenen `TrendIndicator`, statt einen zweiten Delta-Baustein einzuführen.

## Definition of Done

- öffentliche Props sind typisiert und sinnvoll benannt
- native Semantik bleibt erhalten, wo sie die Aufgabe erfüllt
- Tastatur-, Fokus- und Disabled-Verhalten sind berücksichtigt
- Farben verwenden semantische `--rg-*`-Tokens
- Light und Dark Theme funktionieren
- Responsive-Verhalten ist definiert
- `prefers-reduced-motion` wird respektiert
- Komponente ist einmalig in `src/lib/index.ts` exportiert
- Workbench und Dokumentation zeigen den realen Einsatz
- keine neue redundante Runtime-Abhängigkeit
- `npm run verify` ist in einer installierten Entwicklungsumgebung erfolgreich

## DataTable-Regel

RobinGru enthält keine `VirtualTable`. Erweiterungen an Tabellen werden zuerst als Option der vorhandenen `DataTable` oder als Kombination vorhandener Primitives geprüft. Eine zweite Tabellen-API ist nur zulässig, wenn sie eine klar andere semantische Aufgabe löst.
