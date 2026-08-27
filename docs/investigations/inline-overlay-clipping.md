# Inline overlay clipping in component catalog previews

## Fehleridentität

- Quelle: Nutzer-Screenshots vom 2026-08-27 (Combobox und MentionInput im Komponenten-Katalog)
- Umgebung: lokale SvelteKit-Dokumentation, `http://127.0.0.1:4174/components`, Chromium, 805 px Viewportbreite
- Revision: `6d36150 Fix advanced component accessibility interactions`
- Status: `SUPPORTED CAUSE`

## Tatsächliches und erwartetes Verhalten

**OBSERVED:** Nach dem Öffnen einer Combobox, MultiSelect-Liste oder MentionInput-Vorschlagsliste wird deren unterer Bereich in der Katalogkarte abgeschnitten. Die Vorschau selbst erhält dabei eine vertikale Scrollbar.

**EXPECTED:** Eine interaktive Vorschlags- oder Auswahlliste muss vollständig sichtbar sein. Falls der verfügbare Raum nicht ausreicht, soll das Overlay sich sinnvoll positionieren oder die Vorschau ausreichend Raum geben, statt die Liste in einen kleinen inneren Scrollbereich zu schneiden.

## Fehlersignal und Reproduktion

1. Öffne `/components` bei einer Viewportbreite von 805 px.
2. Öffne in einer Karten-Vorschau Combobox oder MultiSelect; beim MentionInput gib `@` ein.
3. Prüfe `.docs-component-preview`: Sie hat `overflow: auto`; `scrollHeight` ist größer als `clientHeight`.
4. Die eingeblendete Liste liegt unter dem Eingabefeld und wird am Ende des Preview-Containers abgeschnitten.

Die direkte Chromium-Prüfung ergab:

| Vorschau | clientHeight | scrollHeight | Ergebnis |
| --- | ---: | ---: | --- |
| Combobox | 139 px | 162 px | Überlauf |
| MultiSelect | 139 px | 309 px | Überlauf |
| MentionInput | 223 px | 297 px | Überlauf |

## Belege und Ursache

`src/lib/styles.css` definiert `.rg-combobox-menu`, `.rg-multiselect-menu` und `.rg-mention-menu` als `position: absolute`. Die Komponenten rendern diese Menüs als Kind ihres jeweiligen Controls und nicht in einem Portal. Gleichzeitig begrenzt `src/docs.css` jede Katalog-Vorschau mit `overflow: auto` und einer kompakten Mindesthöhe. Der Überlauf wird dadurch in die Preview gescrollt/abgeschnitten.

Dies erklärt beide bereitgestellten Screenshots und den funktionierenden Vergleich für portallierte Overlay-Komponenten wie Popover und DropdownMenu: diese werden mit Bits UI in `body` gerendert und unterliegen nicht dem `overflow` der Karten-Vorschau.

## Konkurrierende Hypothesen

1. **Zu niedriger z-index:** verworfen. Die Menüs haben bereits `z-index: 70`; das Fehlersignal ist ein tatsächlicher Scrollüberlauf des Preview-Containers.
2. **Fehlerhafte einzelne Komponente:** verworfen. Das Signal tritt bei allen drei gemeinsamen, nicht portallierten Listentypen auf.
3. **Überlauf-Clipping durch Dokumentations-Container:** bestätigt.

## Sicherer Änderungsbereich

Die Korrektur muss das Overlay-Verhalten der drei betroffenen Form-Komponenten und/oder den Overflow-Vertrag der Katalog-Vorschau adressieren:

- `src/lib/components/forms/Combobox.svelte`
- `src/lib/components/forms/MultiSelect.svelte`
- `src/lib/components/forms/MentionInput.svelte`
- `src/lib/styles.css`
- gegebenenfalls `src/docs.css` für die reine Katalogdarstellung

Zu bewahren sind: Tastatursteuerung, Fokus-/Blur-Schließen, Auswahlbindung, Breitenanpassung und die bisherige Verhalten innerhalb nicht begrenzter Layouts.

## Schutz vor Regressionen

Ergänze einen visuellen bzw. DOM-basierten Playwright-Test für die Katalogansicht: Nach dem Öffnen jeder der drei Listen darf `.docs-component-preview` keinen durch das Menü verursachten vertikalen Überlauf haben, beziehungsweise die vollständige Liste muss innerhalb des sichtbaren Bereichs liegen. Bestehende Interaktionstests für die Detailseiten müssen weiter bestehen.

## Nächste Aktion

Eine eng begrenzte Implementierung entscheiden und durchführen: portallierte/positionierte Vorschlagslisten mit korrekter Fokusbehandlung oder ein ausdrücklich höheres Katalog-Preview-Layout für nicht-portallierte Komponenten.
