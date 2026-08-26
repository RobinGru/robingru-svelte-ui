# Blog und Editorial

## Grundaufbau

RobinGru trennt die redaktionelle Hierarchie von Dashboard-Kompositionen:

- `Article` begrenzt Lesebreite und kann ein Inhaltsverzeichnis aufnehmen.
- `ArticleHeader` strukturiert Breadcrumbs, Eyebrow, Titel, Deck, Meta und Aktionen.
- `ArticleMeta` zeigt Autor:in, Datum, Update, Kategorie und Lesezeit.
- `Prose` stylt semantisches HTML aus Svelte, Markdown, mdsvex oder einem CMS.
- `TableOfContents` bietet eine kompakte, optional sticky Seitennavigation.

## Inhaltselemente

- `Blockquote` für hervorgehobene Zitate oder Leitprinzipien
- `CodeBlock` mit Dateiname, Sprache, Copy-Button, Zeilennummern und Highlights
- `Figure` für Bild/Media, Caption und Credit
- `PostCard` für Beitragsvorschauen mit Bild oder einer eigenen `media`-Snippet-Vorschau
- `TagList` für Taxonomie
- `ReadingTime` aus Minuten oder Wortzahl

## Abschluss eines Beitrags

- `ShareButtons`
- `AuthorCard`
- `NewsletterCard`
- `ArticleNavigation`
- `RelatedPosts` mit `PostGrid` und `PostCard`

## CMS- und Markdown-Nutzung

`Prose` erwartet normales semantisches HTML. Für Inhalte aus mdsvex oder einem CMS ist deshalb keine RobinGru-Komponente pro Absatz nötig. Spezielle Bausteine wie `CodeBlock` oder `Figure` können als Rich-Content-Komponenten eingebunden werden.

## Gestaltungsregeln

- Textbreite und Zeilenhöhe haben Vorrang vor dekorativen Flächen.
- Überschriften sind deutlich, aber nicht heroartig überdimensioniert.
- Links, Code, Tabellen, Bilder und Zitate besitzen konsistente Zustände.
- Beitragskarten dürfen interaktiv wirken, der eigentliche Artikel bleibt ruhig.
- Print-CSS entfernt Sharing, Newsletter, Related Posts und TOC.
