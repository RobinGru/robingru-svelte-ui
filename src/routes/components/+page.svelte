<script lang="ts">
  import { Search, X } from '@lucide/svelte';
  import { base } from '$app/paths';
  import { Badge, IconButton } from '$lib';
  import {
    componentCatalog,
    componentCategories,
    type ComponentCategoryId
  } from '$docs/catalog.js';
  import ComponentCard from '$docs/components/ComponentCard.svelte';
  import SectionIntro from '$docs/components/SectionIntro.svelte';

  let query = $state('');
  let category = $state<'all' | ComponentCategoryId>('all');

  let normalizedQuery = $derived(query.trim().toLocaleLowerCase('de-DE'));
  let filtered = $derived.by(() => componentCatalog.filter((item) => {
    const categoryMatch = category === 'all' || item.category === category;
    const haystack = `${item.name} ${item.description} ${item.keywords.join(' ')}`.toLocaleLowerCase('de-DE');
    return categoryMatch && (!normalizedQuery || haystack.includes(normalizedQuery));
  }));

  function itemsFor(categoryId: ComponentCategoryId) {
    return filtered.filter((item) => item.category === categoryId);
  }
</script>

<svelte:head>
  <title>Komponenten · RobinGru Svelte UI</title>
  <meta name="description" content="Alle 116 RobinGru Svelte UI Komponenten als filterbare Live-Vorschau." />
</svelte:head>

<SectionIntro
  eyebrow="Live-Katalog"
  title="Alle Komponenten, direkt gerendert."
  description="Jede Komponente wird mit realistischen Daten gezeigt. Suche, Kategorien und Detailseiten machen den Katalog navigierbar, ohne aus der Dokumentation eine überladene Online-IDE zu machen."
>
  {#snippet actions()}<Badge tone="primary">{filtered.length} von {componentCatalog.length}</Badge>{/snippet}
</SectionIntro>

<div class="docs-catalog-toolbar">
  <label class="docs-catalog-search">
    <span class="rg-sr-only">Komponenten durchsuchen</span>
    <Search size={16} aria-hidden="true" />
    <input class="rg-input" type="search" bind:value={query} placeholder="Button, Dashboard, Blog, Status …" />
    {#if query}
      <IconButton class="rg-input-action" label="Suche leeren" size="sm" variant="ghost" onclick={() => query = ''}><X size={14} /></IconButton>
    {/if}
  </label>
  <div class="docs-filter-chips" aria-label="Komponentenkategorie">
    <button class="docs-filter-chip" data-active={category === 'all'} type="button" onclick={() => category = 'all'}>Alle</button>
    {#each componentCategories as item}
      <button class="docs-filter-chip" data-active={category === item.id} type="button" onclick={() => category = item.id}>{item.shortLabel}</button>
    {/each}
  </div>
</div>

{#if filtered.length}
  {#each componentCategories as group}
    {@const items = itemsFor(group.id)}
    {#if items.length}
      <section class="docs-catalog-section" id={group.id}>
        <header>
          <div><h2>{group.label}</h2><p>{group.description}</p></div>
          <Badge tone="neutral">{items.length}</Badge>
        </header>
        <div class="docs-component-grid">
          {#each items as item (item.name)}
            <ComponentCard {item} />
          {/each}
        </div>
      </section>
    {/if}
  {/each}
{:else}
  <div class="docs-catalog-empty">
    <h2>Keine Komponente gefunden</h2>
    <p>Prüfe den Suchbegriff oder zeige wieder alle Kategorien.</p>
    <button class="rg-button" data-variant="outline" type="button" onclick={() => { query = ''; category = 'all'; }}>Filter zurücksetzen</button>
  </div>
{/if}

<footer class="docs-footer"><div><span>{componentCatalog.length} Komponenten in {componentCategories.length} Bereichen</span><a href={`${base}/patterns`}>Weiter zu zusammengesetzten Patterns</a></div></footer>
