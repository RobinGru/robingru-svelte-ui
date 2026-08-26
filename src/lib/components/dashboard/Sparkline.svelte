<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { Tone } from '../../types.js';

  type Props = Omit<SVGAttributes<SVGSVGElement>, 'values'> & {
    values: number[];
    width?: number;
    height?: number;
    strokeWidth?: number;
    label?: string;
    tone?: Tone;
    area?: boolean;
  };

  let {
    values,
    width = 160,
    height = 48,
    strokeWidth = 2,
    label = 'Trendverlauf',
    tone = 'primary',
    area = true,
    class: className,
    ...rest
  }: Props = $props();

  let points = $derived.by(() => {
    if (!values.length) return [] as Array<[number, number]>;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    return values.map((value, index) => [
      values.length === 1 ? width / 2 : index * width / (values.length - 1),
      height - ((value - min) / span) * (height - strokeWidth * 2) - strokeWidth
    ] as [number, number]);
  });
  let polyline = $derived(points.map(([x, y]) => `${x},${y}`).join(' '));
  let areaPath = $derived(points.length ? `M 0 ${height} L ${points.map(([x, y]) => `${x} ${y}`).join(' L ')} L ${width} ${height} Z` : '');
</script>

<svg
  {...rest}
  class={cn('rg-sparkline', className)}
  data-tone={tone}
  viewBox={`0 0 ${width} ${height}`}
  role="img"
  aria-label={label}
  preserveAspectRatio="none"
>
  {#if area && areaPath}<path class="rg-sparkline-area" d={areaPath} />{/if}
  {#if polyline}<polyline class="rg-sparkline-line" points={polyline} style:stroke-width={strokeWidth} />{/if}
</svg>
