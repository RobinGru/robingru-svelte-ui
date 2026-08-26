<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { TrendDirection } from '../../types.js';
  import TrendIndicator from '../dashboard/TrendIndicator.svelte';

  type Props = HTMLAttributes<HTMLDivElement> & {
    label: string;
    value: string | number;
    trend?: string | number;
    direction?: TrendDirection;
    detail?: string;
    icon?: Snippet;
    visual?: Snippet;
    footer?: Snippet;
    inverseTrend?: boolean;
  };

  let {
    label,
    value,
    trend,
    direction = 'flat',
    detail,
    icon,
    visual,
    footer,
    inverseTrend = false,
    class: className,
    ...rest
  }: Props = $props();
</script>

<div {...rest} class={cn('rg-kpi', className)}>
  <div class="rg-kpi-head"><span>{label}</span>{#if icon}<span class="rg-kpi-icon">{@render icon()}</span>{/if}</div>
  <div class="rg-kpi-main">
    <div>
      <div class="rg-kpi-value">{value}</div>
      {#if trend !== undefined || detail}
        <div class="rg-kpi-meta">
          {#if trend !== undefined}<TrendIndicator value={trend} {direction} inverse={inverseTrend} />{/if}
          {#if detail}<span>{detail}</span>{/if}
        </div>
      {/if}
    </div>
    {#if visual}<div class="rg-kpi-visual">{@render visual()}</div>{/if}
  </div>
  {#if footer}<div class="rg-kpi-footer">{@render footer()}</div>{/if}
</div>
