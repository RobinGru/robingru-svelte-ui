<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { CalendarDays } from '@lucide/svelte';
  import { cn } from '../../internal/cn.js';
  import type { DateRange, DateRangePreset } from '../../types.js';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onchange'> & {
    from?: string;
    to?: string;
    presets?: DateRangePreset[];
    label?: string;
    fromLabel?: string;
    toLabel?: string;
    min?: string;
    max?: string;
    onchange?: (range: DateRange) => void;
  };

  let {
    from = $bindable(''),
    to = $bindable(''),
    presets = [],
    label = 'Zeitraum',
    fromLabel = 'Von',
    toLabel = 'Bis',
    min,
    max,
    id,
    onchange,
    class: className,
    ...rest
  }: Props = $props();

  function changed() {
    onchange?.({ from, to });
  }

  function apply(preset: DateRangePreset) {
    from = preset.from;
    to = preset.to;
    changed();
  }
</script>

<div {...rest} {id} class={cn('rg-date-range', className)}>
  <div class="rg-date-range-label"><CalendarDays size={16} aria-hidden="true" /><span>{label}</span></div>
  <label><span>{fromLabel}</span><input type="date" bind:value={from} {min} max={to || max} onchange={changed} /></label>
  <span class="rg-date-range-separator" aria-hidden="true">–</span>
  <label><span>{toLabel}</span><input type="date" bind:value={to} min={from || min} {max} onchange={changed} /></label>
  {#if presets.length}
    <div class="rg-date-range-presets" aria-label="Vordefinierte Zeiträume">
      {#each presets as preset}<button type="button" onclick={() => apply(preset)}>{preset.label}</button>{/each}
    </div>
  {/if}
</div>
