# RobinGru Svelte UI 0.2.0

Version 0.2.0 erweitert den bisherigen App-Core zu einem vollständigen System für **SvelteKit-Anwendungen, Dashboards, normale bis größere Tabellen und Blog-/Editorial-Seiten**.

## Umfang

- 116 eindeutige Komponenten
- 17 Content-/Editorial-Komponenten
- 14 Dashboard-/Visualisierungskomponenten
- 10 Data-Komponenten einschließlich einer stark erweiterten DataTable
- 75 bestehende Foundation-, Formular-, Navigations- und Overlay-Bausteine

## Wichtigste Entscheidung

Es gibt keine `VirtualTable`. Statt einer zweiten Tabellenwelt wurde die bestehende `DataTable` so erweitert, dass typische Admin-, CRM-, Produkt- und Redaktionsdaten gut bearbeitet werden können. Damit bleiben API, Styling und Abhängigkeiten überschaubar.

## Kohärenz

Alle neuen Komponenten verwenden dieselben RobinGru-Tokens, Kontrollhöhen, Radien, Border-, Fokus- und Statusregeln. Editorial Content erhält eine eigene Lesefluss-Hierarchie; Dashboard-Komponenten erhalten kompakte Vergleichs- und Statusmuster. Beide wirken verwandt, ohne identisch auszusehen.
