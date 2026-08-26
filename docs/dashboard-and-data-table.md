# Dashboard und DataTable

## Typische Dashboard-Komposition

Ein vollständiges Dashboard entsteht aus wenigen klaren Ebenen:

1. `PageHeader` für Seitentitel und primäre Aktionen
2. `FilterBar` mit `FormField`, `Select` und `DateRangePicker`
3. `DashboardGrid` mit `KpiCard` und optionaler `Sparkline`
4. `ChartCard` für größere Visualisierungen oder eine projektspezifische Chart-Library
5. `StatusSummary`, `ActivityFeed`, `Timeline` oder `QuickActions` für operative Details
6. `DataTable` als bearbeitbare Detailansicht

Die Komponenten teilen Padding, Border, Radius und semantische Zustände. Es ist nicht nötig, zusätzliche Dashboard-Card-Varianten anzulegen.

## Leichte Visualisierungen

- `Sparkline`: kompakter Verlauf ohne Achsen
- `MiniBarChart`: wenige Kategorien oder Perioden
- `DonutChart`: überschaubare Anteile
- `ProgressRing`: Ziel- oder Kapazitätsfortschritt
- `ChartLegend`: zugängliche textuelle Zuordnung
- `ChartCard`: Rahmen für RobinGru- oder externe Charts

Bei komplexen Zeitreihen, Zoom, Tooltips, Achsen oder Annotationen sollte eine spezialisierte Chart-Library in `ChartCard` gerendert werden. RobinGru vermeidet eine eigene universelle Chart-Runtime.

## DataTable-Einsatzbereich

Die RobinGru-DataTable ist für normale bis größere Tabellen gedacht, deren Datenmenge vollständig oder seitenweise im Client verfügbar ist. Typische Beispiele:

- Aufträge und Zahlungen
- Kund:innen und Accounts
- Beiträge und Redaktionsstatus
- Produkte und Inventar
- Benutzerverwaltung
- Audit- und Aktivitätslisten

### Enthaltene Funktionen

- Suche über ausgewählte Spalten
- Single-Column-Sortierung
- konfigurierbare Spaltenfilter
- Mehrfachauswahl über stabile Row IDs
- Auswahl aller sichtbaren Zeilen
- Spaltensteuerung mit mindestens einer sichtbaren Datenspalte
- Sticky Header und begrenzbare Tabellenhöhe
- Pagination und auswählbare Seitengröße
- kompakte/komfortable Dichte
- Stripe- und Hover-Zustände
- Lade-Skeletons und Empty State
- Custom Cell Snippet und Row Actions
- optional klickbare Zeilen mit Tastaturbedienung

### Bewusste Grenzen

- keine Virtualisierung
- kein Excel-artiges Zell-Editing
- kein Multi-Column-Sort
- kein Column Pinning oder Drag-Reordering
- keine eigene serverseitige Query-Schicht

Diese Funktionen würden eine deutlich andere Grid-Komplexität erzeugen. Für den vorgesehenen Umfang bleiben API, Bundle und Bedienung verständlich.

## Stabile Auswahl

Bei `selectable` sollte immer ein stabiler `rowId` gesetzt werden:

```svelte
<DataTable rows={orders} columns={columns} rowId="id" selectable bind:selected />
```

Ohne passenden Schlüssel kann der Fallback-Index durch Filterung oder Sortierung seine Bedeutung ändern.
