<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { ArrowDownRight, ArrowRight, ArrowUpRight } from '@lucide/svelte';
  import { cn } from '../../internal/cn.js';
  import type { TrendDirection } from '../../types.js';

  type Props = HTMLAttributes<HTMLSpanElement> & {
    value: string | number;
    direction?: TrendDirection;
    label?: string;
    subtle?: boolean;
    /** Treat a downward movement as positive, for example for costs or errors. */
    inverse?: boolean;
  };

  let {
    value,
    direction = 'flat',
    label,
    subtle = false,
    inverse = false,
    class: className,
    ...rest
  }: Props = $props();

  let sentiment = $derived(
    direction === 'flat' ? 'neutral' : direction === (inverse ? 'down' : 'up') ? 'positive' : 'negative'
  );
</script>

<span
  {...rest}
  class={cn('rg-trend-indicator', className)}
  data-direction={direction}
  data-sentiment={sentiment}
  data-subtle={subtle}
>
  {#if direction === 'up'}
    <ArrowUpRight size={14} aria-hidden="true" />
  {:else if direction === 'down'}
    <ArrowDownRight size={14} aria-hidden="true" />
  {:else}
    <ArrowRight size={14} aria-hidden="true" />
  {/if}
  <strong>{value}</strong>
  {#if label}<span>{label}</span>{/if}
</span>
