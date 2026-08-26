# RobinGru Svelte UI 0.3.1

Patch release focused on real SvelteKit production-build feedback.

## Fixed

- Prerender no longer follows links to a missing `#preview` id.
- `DataTable` column visibility is derived from props plus local user overrides, avoiding stale initial-prop capture.
- The select-all DOM reference is reactive and no longer triggers `non_reactive_update`.
- `SegmentedControl` exposes valid radio semantics (`radiogroup` + `radio` + `aria-checked`).
- `CommandPalette` no longer uses HTML `autofocus`.
- DemoFrame makes its one-time initial prop capture explicit.
- The app declares `/favicon.svg`.
- Dev/docs/build scripts sync SvelteKit before Vite reads the generated tsconfig.
- Preview commands build before starting the preview server.
- No `prepare` lifecycle script is shipped; consumers do not need the SvelteKit docs toolchain.
