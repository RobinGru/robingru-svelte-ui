<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { ChartDatum, Tone } from '../../types.js';

  type Props = SVGAttributes<SVGSVGElement> & {
    data: ChartDatum[];
    label?: string;
    height?: number;
    showLabels?: boolean;
  };

  let { data, label = 'Balkendiagramm', height = 160, showLabels = true, class: className, ...rest }: Props = $props();
  let max = $derived(Math.max(1, ...data.map((item) => item.value)));
  let step = $derived(data.length ? 100 / data.length : 100);
  function toneColor(tone: Tone | undefined) {
    return tone ? `var(--rg-${tone === 'neutral' ? 'fg-subtle' : tone})` : 'var(--rg-primary)';
  }
</script>

<svg {...rest} class={cn('rg-mini-bar-chart', className)} viewBox="0 0 100 60" preserveAspectRatio="none" style:height={`${height}px`} role="img" aria-label={label}>
  {#each data as item, index}
    {@const barHeight = (item.value / max) * (showLabels ? 46 : 54)}
    {@const x = index * step + step * 0.16}
    <g>
      <rect x={x} y={54 - barHeight} width={step * 0.68} height={barHeight} rx="1.4" fill={item.color ?? toneColor(item.tone)}>
        <title>{item.label}: {item.value}</title>
      </rect>
      {#if showLabels}<text x={x + step * 0.34} y="59" text-anchor="middle">{item.label}</text>{/if}
    </g>
  {/each}
</svg>
