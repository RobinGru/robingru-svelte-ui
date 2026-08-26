<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Monitor, Moon, Smartphone, Sun, Tablet } from '@lucide/svelte';
  import { IconButton, SegmentedControl } from '$lib';

  type Props = {
    children: Snippet;
    title?: string;
    description?: string;
    controls?: boolean;
    initialTheme?: 'light' | 'dark';
    initialViewport?: 'desktop' | 'tablet' | 'mobile';
    padded?: boolean;
    height?: 'compact' | 'default' | 'tall';
  };

  let {
    children,
    title,
    description,
    controls = true,
    initialTheme = 'light',
    initialViewport = 'desktop',
    padded = true,
    height = 'default'
  }: Props = $props();

  let theme = $state<'light' | 'dark'>((() => initialTheme)());
  let viewport = $state<'desktop' | 'tablet' | 'mobile'>((() => initialViewport)());
  let density = $state('comfortable');

  const densityOptions = [
    { value: 'comfortable', label: 'Normal' },
    { value: 'compact', label: 'Kompakt' }
  ];
</script>

<section class="docs-demo-frame">
  {#if title || description || controls}
    <header class="docs-demo-toolbar">
      <div class="docs-demo-heading">
        {#if title}<strong>{title}</strong>{/if}
        {#if description}<span>{description}</span>{/if}
      </div>
      {#if controls}
        <div class="docs-demo-controls">
          <SegmentedControl bind:value={density} options={densityOptions} label="Dichte der Vorschau" />
          <div class="docs-viewport-controls" aria-label="Vorschaugröße">
            <IconButton label="Desktop-Vorschau" size="sm" variant={viewport === 'desktop' ? 'soft' : 'ghost'} tone={viewport === 'desktop' ? 'primary' : 'neutral'} onclick={() => viewport = 'desktop'}><Monitor size={15} /></IconButton>
            <IconButton label="Tablet-Vorschau" size="sm" variant={viewport === 'tablet' ? 'soft' : 'ghost'} tone={viewport === 'tablet' ? 'primary' : 'neutral'} onclick={() => viewport = 'tablet'}><Tablet size={15} /></IconButton>
            <IconButton label="Mobile Vorschau" size="sm" variant={viewport === 'mobile' ? 'soft' : 'ghost'} tone={viewport === 'mobile' ? 'primary' : 'neutral'} onclick={() => viewport = 'mobile'}><Smartphone size={15} /></IconButton>
          </div>
          <IconButton label={theme === 'light' ? 'Dunkle Vorschau' : 'Helle Vorschau'} size="sm" variant="ghost" onclick={() => theme = theme === 'light' ? 'dark' : 'light'}>
            {#if theme === 'light'}<Moon size={15} />{:else}<Sun size={15} />{/if}
          </IconButton>
        </div>
      {/if}
    </header>
  {/if}
  <div class="docs-demo-stage" data-viewport={viewport} data-height={height}>
    <div
      class="docs-demo-canvas"
      class:docs-demo-padded={padded}
      data-theme={theme === 'light' ? 'robin' : 'robin-dark'}
      data-density={density === 'compact' ? 'compact' : undefined}
    >
      {@render children()}
    </div>
  </div>
</section>
