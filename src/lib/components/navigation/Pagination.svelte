<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { ChevronLeft, ChevronRight } from '@lucide/svelte';
  import { cn } from '../../internal/cn.js';

  type PageItem = number | 'ellipsis-left' | 'ellipsis-right';
  type Props = HTMLAttributes<HTMLElement> & {
    page?: number;
    total: number;
    label?: string;
    siblingCount?: number;
    showEdges?: boolean;
    onchange?: (page: number) => void;
  };

  let {
    page = $bindable(1),
    total,
    label = 'Seitennavigation',
    siblingCount = 1,
    showEdges = true,
    onchange,
    class: className,
    ...rest
  }: Props = $props();

  let items = $derived.by((): PageItem[] => {
    const count = Math.max(0, total);
    if (count <= 7 + siblingCount * 2) return Array.from({ length: count }, (_, index) => index + 1);

    const left = Math.max(2, page - siblingCount);
    const right = Math.min(count - 1, page + siblingCount);
    const result: PageItem[] = showEdges ? [1] : [];

    if (left > 2) result.push('ellipsis-left');
    for (let value = left; value <= right; value += 1) result.push(value);
    if (right < count - 1) result.push('ellipsis-right');
    if (showEdges) result.push(count);

    return result;
  });

  function go(next: number) {
    page = Math.max(1, Math.min(Math.max(1, total), next));
    onchange?.(page);
  }
</script>

<nav {...rest} class={cn('rg-pagination', className)} aria-label={label}>
  <button class="rg-page" type="button" aria-label="Vorherige Seite" disabled={page <= 1} onclick={() => go(page - 1)}><ChevronLeft size={16} /></button>
  {#each items as item}
    {#if typeof item === 'number'}
      <button class="rg-page" type="button" aria-current={item === page ? 'page' : undefined} aria-label={`Seite ${item}`} onclick={() => go(item)}>{item}</button>
    {:else}
      <span class="rg-page-ellipsis" aria-hidden="true">…</span>
    {/if}
  {/each}
  <button class="rg-page" type="button" aria-label="Nächste Seite" disabled={page >= total} onclick={() => go(page + 1)}><ChevronRight size={16} /></button>
</nav>
