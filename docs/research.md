# Recherche- und Quellenbasis

Die Architektur und Versionsauswahl wurden gegen Primärquellen geprüft. Maßgeblich für den Release sind die exakt gepinnten Versionen in `package.json`; `docs/versions.md` wird daraus erzeugt.

## Technische Primärquellen

- Svelte und SvelteKit: Komponentenmodell, Runes, Packaging und Accessibility-Warnungen — https://svelte.dev/docs
- SvelteKit Packaging — https://svelte.dev/docs/kit/packaging
- Bits UI: offizielle Komponenten- und Accessibility-APIs — https://bits-ui.com/docs/introduction
- Skeleton: SvelteKit-Installation und Theme-Grundlage — https://www.skeleton.dev/docs/get-started/installation/sveltekit
- Tailwind CSS: Vite-Integration — https://tailwindcss.com/docs/installation/using-vite
- Lucide: Svelte-Icon-Paket — https://lucide.dev/guide/packages/lucide-svelte

## Design- und Accessibility-Quellen

- W3C WCAG 2.2 Quick Reference — https://www.w3.org/WAI/WCAG22/quickref/
- WAI-ARIA Authoring Practices — https://www.w3.org/WAI/ARIA/apg/
- GOV.UK Design Principles — https://www.gov.uk/guidance/government-design-principles
- daisyUI-Dokumentation — https://daisyui.com/docs/intro/ — ausschließlich als leichte Referenz für freundliche Zustände, nicht als Abhängigkeit

## Übernommene Prinzipien

1. Verhalten und Semantik werden vor Dekoration gelöst.
2. Native Elemente werden nicht ohne konkreten Nutzen nachgebaut.
3. Semantische Tokens verhindern harte Farbwiederholungen und Theme-Duplikate.
4. Dashboard, Datentabelle und Editorial Content teilen die Design-Sprache, nicht zwangsläufig dieselbe Komposition.
5. Eine Komponente löst eine klar umrissene Aufgabe; Varianten und Snippets ersetzen beinahe identische Duplikate.
6. Farbe markiert Bedeutung. Effekte ersetzen keine Informationshierarchie.
