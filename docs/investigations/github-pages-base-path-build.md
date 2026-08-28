# GitHub Pages build fails with a configured base path

## Fehleridentität

- Quelle: GitHub Actions run 33158433718, job 98806749281 (`Build static site`)
- Revision: `f07d8add4fc29f5845969a423a7c814da8641139`
- Umgebung: GitHub Actions (`ubuntu-latest`, Bun) und lokal reproduziert mit Bun 1.3.14
- Status: `SUPPORTED CAUSE`

## Tatsächliches und erwartetes Verhalten

**OBSERVED:** Der Pages-Workflow setzt `BASE_PATH=/robingru-svelte-ui`. `bun run build:static` beendet den SvelteKit-Prerender mit Exit-Code 1.

**EXPECTED:** Der statische Build muss mit der für GitHub Pages erforderlichen Basis-URL prerendert werden können.

## Fehlersignal und Reproduktion

```powershell
$env:BASE_PATH='/robingru-svelte-ui'
bun run build:static
```

Der Build scheitert reproduzierbar beim Prerendern von `/robingru-svelte-ui/components` mit:

```text
404 /components does not begin with `base`, which is configured in `paths.base`
```

Der Vergleich ohne `BASE_PATH` (`npm run verify`) besteht. Dadurch wurde der CI-spezifische Pfad bisher nicht abgedeckt.

## Belegte Ursache

`svelte.config.js` übernimmt `BASE_PATH` direkt als `kit.paths.base`. Die Katalogvorschau `HoverCard` in `src/docs/preview-config.ts` rendert dagegen einen festen internen Link `href="/components"`. Beim Prerendern der Katalogroute ist dieser Link außerhalb der konfigurierten Basis und SvelteKit bricht deshalb die Prüfung ab.

Alle übrigen internen Links in der Dokumentationsvorschau verwenden bereits `base` oder die Hilfsfunktion `path()`.

## Sicherer Änderungsbereich

- `src/docs/preview-config.ts`: den `HoverCard`-Vorschau-Link mit `path('/components')` bzw. `${base}/components` erzeugen.
- CI-/Prüfvertrag: den bestehenden Pages-Build mit `BASE_PATH=/robingru-svelte-ui` als Regressionstest ausführen.

Zu bewahren: Die Vorschau bleibt ein interner Link zur Komponentenübersicht; Builds ohne `BASE_PATH` funktionieren weiter.

## Nächste Aktion

Die eng begrenzte Linkkorrektur implementieren und anschließend den exakten CI-Befehl sowie `npm run verify` erneut ausführen.
