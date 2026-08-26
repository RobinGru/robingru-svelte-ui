<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { RotateCcw, SlidersHorizontal } from '@lucide/svelte';
  import { cn } from '../../internal/cn.js';

  type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    children: Snippet;
    actions?: Snippet;
    title?: string;
    activeCount?: number;
    resetLabel?: string;
    onreset?: () => void;
  };

  let {
    children,
    actions,
    title = 'Filter',
    activeCount = 0,
    resetLabel = 'Zurücksetzen',
    onreset,
    class: className,
    ...rest
  }: Props = $props();
</script>

<section {...rest} class={cn('rg-filter-bar', className)}>
  <header class="rg-filter-heading">
    <div><SlidersHorizontal size={17} aria-hidden="true" /><strong>{title}</strong>{#if activeCount > 0}<span class="rg-badge" data-tone="primary">{activeCount}</span>{/if}</div>
    <div class="rg-filter-actions">
      {#if onreset}<button class="rg-button" data-size="sm" data-variant="ghost" type="button" onclick={onreset}><RotateCcw size={15} aria-hidden="true" />{resetLabel}</button>{/if}
      {#if actions}{@render actions()}{/if}
    </div>
  </header>
  <div class="rg-filter-fields">{@render children()}</div>
</section>
