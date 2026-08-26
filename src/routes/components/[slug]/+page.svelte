<script lang="ts">
  import { base } from '$app/paths';
  import { ArrowLeft, ArrowRight, CheckCircle2, FileCode2, Layers3 } from '@lucide/svelte';
  import { Badge, Breadcrumbs, Callout, CopyButton, InlineCode } from '$lib';
  import {
    getCategory,
    getRelatedComponents,
    type ComponentDoc
  } from '$docs/catalog.js';
  import { previewFor } from '$docs/preview-config.js';
  import CodePanel from '$docs/components/CodePanel.svelte';
  import ComponentPreview from '$docs/components/ComponentPreview.svelte';
  import DemoFrame from '$docs/components/DemoFrame.svelte';
  import SectionIntro from '$docs/components/SectionIntro.svelte';

  type Props = { data: { item: ComponentDoc } };
  let { data }: Props = $props();
  let item = $derived(data.item);
  let category = $derived(getCategory(item.category));
  let related = $derived(getRelatedComponents(item));
  let preview = $derived(previewFor(item.name));

  const cssSetup = `@import '@robingru/svelte-ui/styles.css';`;
</script>

<svelte:head>
  <title>{item.name} · RobinGru Svelte UI</title>
  <meta name="description" content={item.description} />
</svelte:head>

<Breadcrumbs items={[{ label: 'Komponenten', href: `${base}/components` }, { label: category.shortLabel, href: `${base}/components#${category.id}` }, { label: item.name, current: true }]} />

<div style="margin-top:1rem">
  <SectionIntro eyebrow={category.label} title={item.name} description={item.description}>
    {#snippet actions()}
      <Badge tone="primary">Live</Badge>
      <CopyButton value={`import { ${item.name} } from '@robingru/svelte-ui';`} label="Import kopieren" />
    {/snippet}
  </SectionIntro>
</div>

<div class="docs-component-detail-grid">
  <div class="docs-component-detail-main">
    <DemoFrame
      title={`${item.name} Vorschau`}
      description="Theme, Dichte und Viewport direkt testen"
      padded={preview.padded !== false}
      height={preview.height ?? 'default'}
    >
      <ComponentPreview name={item.name} />
    </DemoFrame>

    <section class="docs-section" style="margin-top:.5rem">
      <div class="docs-section-heading">
        <div><h2>Verwendung</h2><p>Der gezeigte Code entspricht der Live-Vorschau und nutzt ausschließlich die öffentliche Package-API.</p></div>
      </div>
      <CodePanel code={preview.code} filename="Example.svelte" />
    </section>

    <section class="docs-section" style="margin-top:1rem">
      <div class="docs-section-heading">
        <div><h2>Einordnung im System</h2><p>{item.name} übernimmt eine klar abgegrenzte Aufgabe und verwendet dieselben semantischen Tokens wie alle anderen Komponenten.</p></div>
      </div>
      <div class="docs-feature-grid">
        <article class="docs-feature-card"><span><Layers3 size={18} /></span><h3>Keine parallele Variante</h3><p>Neue Zustände werden über Props und Tokens ergänzt, nicht durch fast identische Zweitkomponenten.</p></article>
        <article class="docs-feature-card"><span><CheckCircle2 size={18} /></span><h3>Semantische Grundlage</h3><p>Native Elemente und ARIA werden bevorzugt; komplexe Overlay-Interaktion basiert auf Bits UI.</p></article>
        <article class="docs-feature-card"><span><FileCode2 size={18} /></span><h3>Svelte-first API</h3><p>Snippets, Bindings und Callback-Props folgen Svelte 5, ohne React-Muster nachzubauen.</p></article>
      </div>
    </section>

    <Callout title="Globale Styles" tone="info">
      Importiere die eigenständigen Styles einmal im Root-Layout: <InlineCode>{cssSetup}</InlineCode>
    </Callout>
  </div>

  <aside class="docs-component-detail-aside">
    <section class="docs-detail-meta">
      <dl>
        <dt>Export</dt><dd>{item.name}</dd>
        <dt>Import</dt><dd>@robingru/svelte-ui</dd>
        <dt>Kategorie</dt><dd>{category.shortLabel}</dd>
        <dt>Source</dt><dd>{item.sourcePath}</dd>
        <dt>Theme</dt><dd>robin / robin-dark</dd>
        <dt>Dichte</dt><dd>normal / compact</dd>
      </dl>
    </section>

    <nav class="docs-related-list" aria-label="Ähnliche Komponenten">
      <span>Ähnliche Komponenten</span>
      {#each related as candidate}
        <a href={`${base}/components/${candidate.slug}`}><span>{candidate.name}</span><ArrowRight size={14} /></a>
      {/each}
    </nav>

    <a class="docs-text-link" href={`${base}/components`}><ArrowLeft size={14} /> Zurück zum Katalog</a>
  </aside>
</div>
