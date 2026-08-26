<script lang="ts">
  import { ArrowRight, CheckCircle2, PackageCheck } from '@lucide/svelte';
  import { Button, Callout, InlineCode } from '$lib';
  import { base } from '$app/paths';
  import CodePanel from '$docs/components/CodePanel.svelte';
  import SectionIntro from '$docs/components/SectionIntro.svelte';

  const install = `bun add github:RobinGru/robingru-svelte-ui\n\n# alternativ mit npm\nnpm install github:RobinGru/robingru-svelte-ui`;
  const styles = `/* src/app.css */\n@import '@robingru/svelte-ui/styles.css';`;
  const firstComponent = `<script lang="ts">\n  import { Button } from '@robingru/svelte-ui';\n<\/script>\n\n<Button>Projekt anlegen<\/Button>`;
  const skeleton = `/* Nur wenn Skeleton 5 und Tailwind 4 bereits im Projekt verwendet werden */\n@import '@robingru/svelte-ui/skeleton.css';`;
</script>

<svelte:head>
  <title>Installation · RobinGru Svelte UI</title>
  <meta name="description" content="RobinGru Svelte UI direkt aus GitHub installieren und in einem Svelte-5-Projekt verwenden." />
</svelte:head>

<SectionIntro eyebrow="Einstieg" title="Installation aus GitHub" description="Die Bibliothek wird derzeit direkt aus dem GitHub-Repository bezogen – es gibt bewusst kein npm-Paket. Die benötigte Paketausgabe entsteht beim Installieren automatisch." />

<section class="docs-token-section" aria-labelledby="install-title">
  <h2 id="install-title">1. Paket hinzufügen</h2>
  <p>Wähle Bun oder npm. Für ein Svelte-5-Projekt wird die Bibliothek direkt aus dem Repository installiert.</p>
  <CodePanel code={install} language="shell" filename="Terminal" />
</section>

<section class="docs-token-section" aria-labelledby="styles-title">
  <h2 id="styles-title">2. Basis-Styles laden</h2>
  <p><InlineCode>styles.css</InlineCode> enthält Tokens und Komponentenstyles ohne Tailwind- oder Skeleton-Abhängigkeit.</p>
  <div class="docs-token-code-grid">
    <CodePanel code={styles} language="css" filename="src/app.css" />
    <Callout title="Ein Import pro Anwendung" tone="info">Binde die Styles einmal zentral ein, beispielsweise in der globalen App-Stylesheet-Datei. Einzelne Komponenten brauchen keine zusätzlichen Utility-Klassen.</Callout>
  </div>
</section>

<section class="docs-token-section" aria-labelledby="component-title">
  <h2 id="component-title">3. Komponenten importieren</h2>
  <p>Komponenten werden als normale Svelte-5-Bausteine aus dem Paket importiert.</p>
  <CodePanel code={firstComponent} language="svelte" filename="src/routes/+page.svelte" />
</section>

<section class="docs-token-section" aria-labelledby="integration-title">
  <h2 id="integration-title">Optional: Skeleton-Integration</h2>
  <p>Verwendet dein Projekt bereits Skeleton 5 und Tailwind 4, lädt dieser Einstieg zuerst deren Layer und danach die Komponentenstyles.</p>
  <CodePanel code={skeleton} language="css" filename="src/app.css" />
</section>

<section class="docs-token-section" aria-labelledby="next-title">
  <div class="docs-section-heading">
    <div><h2 id="next-title">Danach</h2><p>Die Komponentenübersicht zeigt die API jeder Komponente live. Tokens und Dichte lassen sich unabhängig vom Demo-Projekt verwenden.</p></div>
  </div>
  <ul class="docs-checklist">
    <li><CheckCircle2 size={17} aria-hidden="true" /><span>Das Paket wird direkt aus GitHub installiert; npm ist nicht erforderlich.</span></li>
    <li><CheckCircle2 size={17} aria-hidden="true" /><span>Für den eigenständigen Einstieg genügt <InlineCode>styles.css</InlineCode>.</span></li>
    <li><CheckCircle2 size={17} aria-hidden="true" /><span>Die Dokumentation ist ein Showcase, keine zusätzliche Laufzeitabhängigkeit.</span></li>
  </ul>
  <div class="docs-home-actions"><Button onclick={() => window.location.href = `${base}/components`}>Komponenten ansehen <ArrowRight size={16} /></Button><Button variant="outline" tone="neutral" onclick={() => window.location.href = `${base}/why-robingru`}>Warum RG Svelte UI? <PackageCheck size={16} /></Button></div>
</section>
