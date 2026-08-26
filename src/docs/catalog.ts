export type ComponentCategoryId =
  | 'foundation'
  | 'forms'
  | 'navigation'
  | 'overlay'
  | 'data'
  | 'dashboard'
  | 'content';

export type ComponentCategory = {
  id: ComponentCategoryId;
  label: string;
  shortLabel: string;
  description: string;
};

export type ComponentDoc = {
  name: string;
  slug: string;
  category: ComponentCategoryId;
  description: string;
  keywords: string[];
  sourcePath: string;
  featured?: boolean;
};

export const componentCategories: ComponentCategory[] = [
  {
    id: 'foundation',
    label: 'Grundlagen & Status',
    shortLabel: 'Grundlagen',
    description: 'Aktionen, Flächen, Status, Typografie und Ladezustände.'
  },
  {
    id: 'forms',
    label: 'Formulare',
    shortLabel: 'Formulare',
    description: 'Native-first Eingaben und zusammengesetzte Formularbausteine.'
  },
  {
    id: 'navigation',
    label: 'Navigation & Shell',
    shortLabel: 'Navigation',
    description: 'App-Rahmen, Seitenköpfe, Orientierung und Navigation.'
  },
  {
    id: 'overlay',
    label: 'Overlays & Feedback',
    shortLabel: 'Overlays',
    description: 'Dialoge, Menüs und Floating UI mit Bits UI als Verhaltensbasis.'
  },
  {
    id: 'data',
    label: 'Daten & strukturierte Inhalte',
    shortLabel: 'Daten',
    description: 'Tabellen, Kennzahlen, Listen, Aktivitäten und Zeitverläufe.'
  },
  {
    id: 'dashboard',
    label: 'Dashboard & Visualisierung',
    shortLabel: 'Dashboard',
    description: 'KPI-, Filter-, Status- und leichte SVG-Visualisierungsbausteine.'
  },
  {
    id: 'content',
    label: 'Blog & Editorial',
    shortLabel: 'Content',
    description: 'Artikel, Prose, Metadaten, Sharing und Beitragsübersichten.'
  }
];

const names: Record<ComponentCategoryId, string[]> = {
  foundation: [
    'Alert', 'Avatar', 'AvatarGroup', 'Badge', 'Button', 'ButtonGroup', 'Callout', 'Card',
    'CardContent', 'CardFooter', 'CardHeader', 'Chip', 'ColorSwatch', 'CopyButton', 'Divider',
    'EmptyState', 'ErrorState', 'IconButton', 'InlineCode', 'Kbd', 'Link', 'LoadingState',
    'Meter', 'Progress', 'Rating', 'Skeleton', 'Spinner', 'Stat', 'StatGroup', 'Tag'
  ],
  forms: [
    'Checkbox', 'DateInput', 'Dropzone', 'Fieldset', 'FileUpload', 'FormField', 'Input', 'Label',
    'NumberInput', 'PasswordInput', 'PinInput', 'RadioGroup', 'RangeSlider', 'SearchInput',
    'SegmentedControl', 'Select', 'Slider', 'Switch', 'Textarea', 'TimeInput', 'Toggle', 'ToggleGroup'
  ],
  navigation: [
    'AppShell', 'Breadcrumbs', 'MenuBar', 'Navbar', 'PageHeader', 'Pagination', 'Sidebar', 'Stepper',
    'Tabs', 'ThemeToggle', 'Toolbar', 'UserMenu'
  ],
  overlay: [
    'Accordion', 'AlertDialog', 'Collapsible', 'CommandPalette', 'ContextMenu', 'Dialog', 'Drawer',
    'DropdownMenu', 'Popover', 'ToastViewport', 'Tooltip'
  ],
  data: [
    'ActivityFeed', 'DataGrid', 'DataTable', 'DescriptionList', 'KpiCard', 'List',
    'NotificationItem', 'PricingCard', 'Table', 'Timeline'
  ],
  dashboard: [
    'ChartCard', 'ChartLegend', 'DashboardGrid', 'DashboardSection', 'DateRangePicker', 'DonutChart',
    'FilterBar', 'MiniBarChart', 'ProgressRing', 'QuickActions', 'Sparkline', 'StatusSummary',
    'TableSkeleton', 'TrendIndicator'
  ],
  content: [
    'Article', 'ArticleHeader', 'ArticleMeta', 'ArticleNavigation', 'AuthorCard', 'Blockquote',
    'CodeBlock', 'Figure', 'NewsletterCard', 'PostCard', 'PostGrid', 'Prose', 'ReadingTime',
    'RelatedPosts', 'ShareButtons', 'TableOfContents', 'TagList'
  ]
};

const descriptions: Record<string, string> = {
  Alert: 'Semantische Statusmeldung mit Ton, Titel, Beschreibung und optionalem Icon.',
  Avatar: 'Initialen- oder Bildavatar in vier abgestimmten Größen.',
  AvatarGroup: 'Überlappende Avatargruppe mit zugänglicher Gruppenbeschriftung.',
  Badge: 'Kompaktes Statuslabel mit optionalem Statuspunkt.',
  Button: 'Zentrale Aktion mit Varianten, Tönen, Größen, Icons und Ladezustand.',
  ButtonGroup: 'Mehrere zusammengehörige Aktionen als visuelle Einheit.',
  Callout: 'Hervorgehobener redaktioneller oder kontextueller Hinweis.',
  Card: 'Neutrale Inhaltsfläche mit optionalem interaktivem Hoverzustand.',
  CardContent: 'Konsistenter Inhaltsbereich für Cards.',
  CardFooter: 'Abgestimmter Aktions- oder Metabereich am Card-Ende.',
  CardHeader: 'Card-Kopf mit Titel, Beschreibung und optionaler Aktion.',
  Chip: 'Kompaktes Auswahl- oder Filterelement, optional entfernbar.',
  ColorSwatch: 'Farbprobe mit Label und optionalem Tokenwert.',
  CopyButton: 'Kopieraktion mit temporärem Erfolgszustand.',
  Divider: 'Ruhige visuelle Trennung zwischen Inhaltsgruppen.',
  EmptyState: 'Leerer Zustand mit Beschreibung, Icon und optionalen Aktionen.',
  ErrorState: 'Fehlerzustand mit verständlicher Rückmeldung und Wiederholungsaktion.',
  IconButton: 'Quadratische Icon-Aktion mit verpflichtendem zugänglichem Label.',
  InlineCode: 'Inline-Codefragment im RobinGru-Typografiesystem.',
  Kbd: 'Darstellung einzelner Tastaturbefehle oder Shortcuts.',
  Link: 'Textlink mit optionaler Kennzeichnung externer Ziele.',
  LoadingState: 'Vollständiger Ladezustand für Inhaltsbereiche.',
  Meter: 'Semantischer Messwert innerhalb eines bekannten Bereichs.',
  Progress: 'Semantischer Fortschrittsbalken für abgeschlossene Anteile.',
  Rating: 'Interaktive oder schreibgeschützte Sternebewertung.',
  Skeleton: 'Flexible Skeleton-Fläche für lokale Ladezustände.',
  Spinner: 'Kompakter Aktivitätsindikator mit Screenreader-Label.',
  Stat: 'Einzelne Kennzahl mit Label und ergänzendem Detail.',
  StatGroup: 'Responsives Raster zusammengehöriger Kennzahlen.',
  Tag: 'Schlagwort oder Klassifikation mit semantischem Ton.',
  Checkbox: 'Native Checkbox mit Label und optionaler Beschreibung.',
  DateInput: 'Native Datumseingabe mit RobinGru-Fokus- und Fehlerzuständen.',
  Dropzone: 'Drag-and-drop-Fläche für Dateien mit verständlichem Hinweistext.',
  Fieldset: 'Semantische Gruppierung verwandter Formularfelder.',
  FileUpload: 'Dateiauswahl mit nativer Eingabe und kompaktem Upload-Trigger.',
  FormField: 'Label, Hilfe, Fehler, Metadaten und Control als konsistente Einheit.',
  Input: 'Universelle einzeilige Texteingabe mit Invalid-State.',
  Label: 'Eigenständiges Formularlabel mit Pflicht- oder Optionalhinweis.',
  NumberInput: 'Numerische Eingabe mit Schrittsteuerung und Grenzen.',
  PasswordInput: 'Passworteingabe mit Umschaltung der Sichtbarkeit.',
  PinInput: 'Mehrstellige PIN- oder OTP-Eingabe mit Auto-Fokus.',
  RadioGroup: 'Semantische Einzelauswahl mit horizontaler oder vertikaler Anordnung.',
  RangeSlider: 'Zweiwertiger Bereichsregler für Minimum und Maximum.',
  SearchInput: 'Sucheingabe mit Icon, Clear-Aktion und Suchcallback.',
  SegmentedControl: 'Kompakte Einzelauswahl für eng verwandte Ansichten.',
  Select: 'Native Select-Eingabe mit Optionen und Placeholder.',
  Slider: 'Einwertiger Bereichsregler mit optionaler Wertanzeige.',
  Switch: 'Binäre Einstellung mit Label und erklärendem Text.',
  Textarea: 'Mehrzeilige Texteingabe mit RobinGru-Zuständen.',
  TimeInput: 'Native Zeiteingabe mit Fehlerzustand.',
  Toggle: 'Drückbare Einzelaktion für einen booleschen Zustand.',
  ToggleGroup: 'Mehrfachauswahl aus einer kompakten Toggle-Gruppe.',
  AppShell: 'Grundraster aus Sidebar, Header und Hauptinhalt.',
  Breadcrumbs: 'Hierarchische Orientierung innerhalb einer Anwendung.',
  MenuBar: 'Kompakte, tastaturfreundliche Menüleiste für App-Aktionen.',
  Navbar: 'Flexibler Navigationskopf mit Start-, Mittel- und Endbereich.',
  PageHeader: 'Seitenkopf mit Eyebrow, Beschreibung, Breadcrumbs und Aktionen.',
  Pagination: 'Kompakte Seitennavigation mit Ellipsen und Randseiten.',
  Sidebar: 'Vertikale Navigation mit Header, Inhalt, Footer und optionaler kompakter Rail.',
  Stepper: 'Fortschrittsanzeige für mehrstufige Abläufe.',
  Tabs: 'Tastaturbedienbare Ansichtsumschaltung mit Tabpanel.',
  ThemeToggle: 'Persistente Umschaltung zwischen Robin Light und Dark.',
  Toolbar: 'Semantische Gruppierung kontextbezogener Werkzeuge.',
  UserMenu: 'Benutzermenü mit Identität, Details und Dropdown-Aktionen.',
  Accordion: 'Aufklappbare Inhaltsbereiche für strukturierte Detailinformationen.',
  AlertDialog: 'Bestätigungsdialog für kritische oder irreversible Aktionen.',
  Collapsible: 'Einfach ein- und ausklappbarer Inhaltsbereich.',
  CommandPalette: 'Durchsuchbare globale Aktionspalette mit Shortcuts.',
  ContextMenu: 'Kontextabhängige Aktionen per Rechtsklick oder Tastatur.',
  Dialog: 'Modales Fenster mit Fokusmanagement, Beschreibung und Footer.',
  Drawer: 'Seitlich einfahrender Dialog für Details oder Einstellungen.',
  DropdownMenu: 'Aktionsmenü mit Icons, Shortcuts und Trennlinien.',
  Popover: 'Leichte schwebende Zusatzinformation mit frei wählbarer Position.',
  ToastViewport: 'Region für vorübergehende, nicht blockierende Benachrichtigungen.',
  Tooltip: 'Kurze ergänzende Erklärung für kompakte Controls.',
  ActivityFeed: 'Chronologische Aktivitätsliste mit Personen und Zeitangaben.',
  DataGrid: 'Responsives Raster für strukturierte Datenkarten.',
  DataTable: 'Suche, Sortierung, Filter, Auswahl, Spaltensteuerung und Pagination ohne Virtualisierung.',
  DescriptionList: 'Semantische Begriff-Wert-Liste für Metadaten.',
  KpiCard: 'Kennzahlenkarte mit Trend, Detail, Visual und Footer.',
  List: 'Generische semantische Liste mit eigenem Item-Snippet.',
  NotificationItem: 'Benachrichtigung mit Zeit, Ungelesen-Status und Aktionen.',
  PricingCard: 'Preis- und Tarifkarte mit Features und hervorgehobener Variante.',
  Table: 'Gestylte semantische Basistabelle mit Caption.',
  Timeline: 'Vertikaler Zeitverlauf mit Tönen und Metadaten.',
  ChartCard: 'Rahmen für Kennzahl, Trend, Diagramm, Aktionen und Footer.',
  ChartLegend: 'Legende für Diagrammreihen mit Werten und Tönen.',
  DashboardGrid: 'Responsives Dashboard-Raster mit festen oder automatischen Spalten.',
  DashboardSection: 'Dashboard-Abschnitt mit Überschrift, Beschreibung und Aktion.',
  DateRangePicker: 'Kompakte Von-bis-Auswahl mit optionalen Zeitraum-Presets.',
  DonutChart: 'Leichtes SVG-Ringdiagramm für Anteilsauswertungen.',
  FilterBar: 'Zusammenhängender Filterbereich mit Aktivzähler und Reset.',
  MiniBarChart: 'Kompaktes SVG-Balkendiagramm für überschaubare Reihen.',
  ProgressRing: 'Kreisförmige Ziel- oder Fortschrittsanzeige.',
  QuickActions: 'Raster häufig genutzter Dashboard-Aktionen.',
  Sparkline: 'Kleine Trendlinie für Kennzahlen und Tabellenzellen.',
  StatusSummary: 'Kompakte Statusübersicht für Dienste, Prozesse oder Ziele.',
  TableSkeleton: 'Mehrzeiliger Skeleton-Zustand für Tabellen.',
  TrendIndicator: 'Richtungs- und Bewertungsanzeige für Kennzahlenänderungen.',
  Article: 'Lesebreite und optionales Aside für vollständige Artikel.',
  ArticleHeader: 'Redaktioneller Kopf mit Titel, Deck, Metadaten und Aktionen.',
  ArticleMeta: 'Autor, Veröffentlichung, Aktualisierung, Kategorie und Lesezeit.',
  ArticleNavigation: 'Vorheriger und nächster Beitrag als klare Artikelnavigation.',
  AuthorCard: 'Autorenprofil mit Rolle, Bio und optionalen Aktionen.',
  Blockquote: 'Redaktionelles Zitat mit Quelle und optionalem Link.',
  CodeBlock: 'Codeblock mit Dateiname, Zeilennummern, Highlights und Kopieraktion.',
  Figure: 'Medienabbildung mit Caption, Credit, Seitenverhältnis und Bleed.',
  NewsletterCard: 'Newsletter-Anmeldung mit klarer Value Proposition und Datenschutztext.',
  PostCard: 'Beitragskarte für vertikale, horizontale und hervorgehobene Listen.',
  PostGrid: 'Responsives Raster für Beitragskarten.',
  Prose: 'Abgestimmte redaktionelle Typografie für semantisches HTML.',
  ReadingTime: 'Lesezeit aus Minuten oder Wortanzahl.',
  RelatedPosts: 'Zusammenhängender Bereich verwandter Beiträge.',
  ShareButtons: 'Kopieren, E-Mail, LinkedIn und Bluesky als Teilen-Leiste.',
  TableOfContents: 'Optional haftendes Inhaltsverzeichnis für Artikel und Docs.',
  TagList: 'Schlagwortliste aus Text- oder Link-Tags.'
};

const featured = new Set([
  'Button', 'Card', 'FormField', 'DataTable', 'Dialog', 'CommandPalette', 'KpiCard',
  'DashboardGrid', 'ChartCard', 'Article', 'Prose', 'PostCard'
]);

function slugify(name: string) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function splitName(name: string) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase().split(/\s+/);
}

export const componentCatalog: ComponentDoc[] = componentCategories.flatMap((category) =>
  names[category.id].map((name) => ({
    name,
    slug: slugify(name),
    category: category.id,
    description: descriptions[name] ?? `${name} im RobinGru Design-System.`,
    keywords: [...splitName(name), category.shortLabel.toLowerCase()],
    sourcePath: `src/lib/components/${category.id}/${name}.svelte`,
    featured: featured.has(name)
  }))
);

export const featuredComponents = componentCatalog.filter((item) => item.featured);

export function getCategory(id: ComponentCategoryId) {
  return componentCategories.find((category) => category.id === id)!;
}

export function getComponentBySlug(slug: string) {
  return componentCatalog.find((item) => item.slug === slug);
}

export function getComponentByName(name: string) {
  return componentCatalog.find((item) => item.name === name);
}

export function getRelatedComponents(item: ComponentDoc, limit = 5) {
  return componentCatalog
    .filter((candidate) => candidate.category === item.category && candidate.name !== item.name)
    .slice(0, limit);
}
