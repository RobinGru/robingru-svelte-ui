<script lang="ts">
  import { base } from '$app/paths';
  import { ArrowUpRight } from '@lucide/svelte';
  import { Badge } from '$lib';
  import type { ComponentDoc } from '../catalog.js';
  import { getCategory } from '../catalog.js';
  import { previewFor } from '../preview-config.js';
  import ComponentPreview from './ComponentPreview.svelte';

  type Props = { item: ComponentDoc };
  let { item }: Props = $props();
  let config = $derived(previewFor(item.name));
  let category = $derived(getCategory(item.category));
</script>

<article class="docs-component-card" id={item.slug}>
  <div class="docs-component-preview" data-height={config.height ?? 'default'} class:docs-preview-unpadded={config.padded === false}>
    <div data-theme="robin" class="docs-component-preview-canvas">
      <ComponentPreview name={item.name} />
    </div>
  </div>
  <div class="docs-component-card-body">
    <div class="docs-component-card-heading">
      <div>
        <a href={`${base}/components/${item.slug}`}><h3>{item.name}</h3></a>
        <Badge tone="neutral">{category.shortLabel}</Badge>
      </div>
      <a class="docs-card-link" href={`${base}/components/${item.slug}`} aria-label={`${item.name} im Detail öffnen`}><ArrowUpRight size={17} /></a>
    </div>
    <p>{item.description}</p>
  </div>
</article>
