<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import TrendIndicator from './TrendIndicator.svelte';

  type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    title: string;
    description?: string;
    value?: string | number;
    delta?: string | number;
    direction?: 'up' | 'down' | 'flat';
    inverseDelta?: boolean;
    chart: Snippet;
    actions?: Snippet;
    footer?: Snippet;
  };

  let {
    title,
    description,
    value,
    delta,
    direction = 'flat',
    inverseDelta = false,
    chart,
    actions,
    footer,
    class: className,
    ...rest
  }: Props = $props();
</script>

<section {...rest} class={cn('rg-chart-card', className)}>
  <header class="rg-chart-card-header">
    <div>
      <h2>{title}</h2>
      {#if description}<p>{description}</p>{/if}
    </div>
    {#if actions}<div class="rg-chart-actions">{@render actions()}</div>{/if}
  </header>
  {#if value !== undefined || delta !== undefined}
    <div class="rg-chart-metric">
      {#if value !== undefined}<strong>{value}</strong>{/if}
      {#if delta !== undefined}<TrendIndicator value={delta} {direction} inverse={inverseDelta} />{/if}
    </div>
  {/if}
  <div class="rg-chart-body">{@render chart()}</div>
  {#if footer}<footer class="rg-chart-footer">{@render footer()}</footer>{/if}
</section>
