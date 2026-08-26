<script lang="ts">
  import { ArrowRight, Check, Code2, Palette } from '@lucide/svelte';
  import { Badge, Button, InlineCode } from '$lib';
  import { base } from '$app/paths';
  import CodePanel from '$docs/components/CodePanel.svelte';
  import SectionIntro from '$docs/components/SectionIntro.svelte';

  const install = 'bun add github:RobinGru/robingru-svelte-ui';
  const setup = `/* src/app.css */\n@import '@robingru/svelte-ui/styles.css';`;
  const firstComponent = `<script lang="ts">\n  import { Button } from '@robingru/svelte-ui';\n<\/script>\n\n<Button>Projekt anlegen<\/Button>`;
</script>

<svelte:head>
  <title>Starte hier · RobinGru Svelte UI</title>
  <meta name="description" content="Der kürzeste Einstieg: aus GitHub installieren, Styles einbinden und die erste Komponente verwenden." />
</svelte:head>

<SectionIntro eyebrow="Einstieg" title="Starte hier" description="In drei kleinen Schritten zu einer stimmigen Svelte-Oberfläche. Die vollständige Dokumentation bleibt danach direkt erreichbar.">
  {#snippet actions()}
    <Button onclick={() => window.location.href = `${base}/components`}>Komponenten ansehen <ArrowRight size={16} /></Button>
  {/snippet}
</SectionIntro>

<section class="docs-start-grid" aria-label="Schnelleinstieg">
  <div class="docs-start-steps">
    <article class="docs-start-step">
      <span class="docs-start-number">1</span>
      <div><h2>Aus GitHub installieren</h2><p>Das Paket ist aktuell nicht bei npm veröffentlicht. Bun oder npm holen es direkt aus diesem Repository.</p></div>
      <CodePanel code={install} language="sh" filename="Terminal" />
    </article>
    <article class="docs-start-step">
      <span class="docs-start-number">2</span>
      <div><h2>Styles einmal einbinden</h2><p>Die eigenständigen Styles enthalten Tokens und Komponentenregeln. Tailwind oder Skeleton sind dafür nicht nötig.</p></div>
      <CodePanel code={setup} language="css" filename="src/app.css" />
    </article>
    <article class="docs-start-step">
      <span class="docs-start-number">3</span>
      <div><h2>Mit einer Komponente beginnen</h2><p>Komponenten sind direkt importierbar und verwenden dieselben Themes, Fokus- und Dichtetokens.</p></div>
      <CodePanel code={firstComponent} language="svelte" filename="+page.svelte" />
    </article>
  </div>

  <aside class="docs-start-aside" aria-label="Nächste Schritte">
    <Badge tone="primary"><Check size={13} /> Bereit für die erste Seite</Badge>
    <h2>Danach gezielt vertiefen</h2>
    <p>Die Einstiegsschritte reichen für eine erste Oberfläche. Für konkrete Aufgaben führen diese Seiten ohne Umwege weiter.</p>
    <a href={`${base}/components`}><Code2 size={17} /><span><strong>Komponenten</strong><small>Props, Vorschauen und Code</small></span><ArrowRight size={16} /></a>
    <a href={`${base}/tokens`}><Palette size={17} /><span><strong>Tokens und Themes</strong><small>Farben, Dark Mode und Dichte</small></span><ArrowRight size={16} /></a>
    <a href={`${base}/workbench`}><Check size={17} /><span><strong>Gesamt-Workbench</strong><small>Alles im Anwendungskontext</small></span><ArrowRight size={16} /></a>
    <p class="docs-start-note">Für ein bestehendes Skeleton-5- und Tailwind-4-Projekt gibt es zusätzlich <InlineCode>@robingru/svelte-ui/skeleton.css</InlineCode>.</p>
  </aside>
</section>
