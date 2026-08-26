<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { ChartDatum, Orientation } from '../../types.js';

  type Props = HTMLAttributes<HTMLUListElement> & {
    items: ChartDatum[];
    orientation?: Orientation;
    showValues?: boolean;
    format?: (value: number) => string;
    label?: string;
  };

  let {
    items,
    orientation = 'horizontal',
    showValues = true,
    format = (value) => String(value),
    label = 'Diagrammlegende',
    class: className,
    ...rest
  }: Props = $props();
</script>

<ul {...rest} class={cn('rg-chart-legend', className)} data-orientation={orientation} aria-label={label}>
  {#each items as item}
    <li data-tone={item.tone ?? 'primary'}>
      <span class="rg-chart-legend-dot" style:background={item.color}></span>
      <span>{item.label}</span>
      {#if showValues}<strong>{format(item.value)}</strong>{/if}
    </li>
  {/each}
</ul>
