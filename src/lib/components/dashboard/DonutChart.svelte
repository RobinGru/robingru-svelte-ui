<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { ChartDatum, Tone } from '../../types.js';

  type Props = SVGAttributes<SVGSVGElement> & {
    data: ChartDatum[];
    label?: string;
    size?: number;
    thickness?: number;
    centerValue?: string | number;
    centerLabel?: string;
  };

  let {
    data,
    label = 'Ringdiagramm',
    size = 180,
    thickness = 12,
    centerValue,
    centerLabel,
    class: className,
    ...rest
  }: Props = $props();

  let total = $derived(Math.max(1, data.reduce((sum, item) => sum + Math.max(0, item.value), 0)));
  let segments = $derived.by(() => {
    let offset = 0;
    return data.map((item) => {
      const length = (Math.max(0, item.value) / total) * 100;
      const segment = { ...item, length, offset };
      offset += length;
      return segment;
    });
  });

  function toneColor(tone: Tone | undefined, index: number) {
    const fallbacks = ['var(--rg-primary)', 'var(--rg-info)', 'var(--rg-success)', 'var(--rg-warning)', 'var(--rg-danger)', 'var(--rg-fg-subtle)'];
    if (!tone || tone === 'neutral') return fallbacks[index % fallbacks.length];
    return `var(--rg-${tone})`;
  }
</script>

<svg {...rest} class={cn('rg-donut-chart', className)} viewBox="0 0 100 100" width={size} height={size} role="img" aria-label={label}>
  <circle cx="50" cy="50" r="38" pathLength="100" fill="none" stroke="var(--rg-surface-sunken)" stroke-width={thickness} />
  {#each segments as item, index}
    <circle
      cx="50"
      cy="50"
      r="38"
      pathLength="100"
      fill="none"
      stroke={item.color ?? toneColor(item.tone, index)}
      stroke-width={thickness}
      stroke-dasharray={`${item.length} ${100 - item.length}`}
      stroke-dashoffset={-item.offset}
      transform="rotate(-90 50 50)"
    >
      <title>{item.label}: {item.value}</title>
    </circle>
  {/each}
  {#if centerValue !== undefined}<text class="rg-donut-value" x="50" y={centerLabel ? 49 : 53} text-anchor="middle">{centerValue}</text>{/if}
  {#if centerLabel}<text class="rg-donut-label" x="50" y="59" text-anchor="middle">{centerLabel}</text>{/if}
</svg>
