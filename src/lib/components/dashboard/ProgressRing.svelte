<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { Tone } from '../../types.js';

  type Props = HTMLAttributes<HTMLDivElement> & {
    value: number;
    max?: number;
    size?: number;
    strokeWidth?: number;
    label?: string;
    detail?: string;
    tone?: Tone;
    format?: (value: number, max: number) => string;
  };

  let {
    value,
    max = 100,
    size = 112,
    strokeWidth = 10,
    label,
    detail,
    tone = 'primary',
    format = (current, total) => `${Math.round(current / total * 100)}%`,
    class: className,
    ...rest
  }: Props = $props();

  let safeMax = $derived(Math.max(1, max));
  let safeValue = $derived(Math.max(0, Math.min(safeMax, value)));
  let radius = $derived((size - strokeWidth) / 2);
  let circumference = $derived(2 * Math.PI * radius);
  let offset = $derived(circumference * (1 - safeValue / safeMax));
</script>

<div {...rest} class={cn('rg-progress-ring', className)} data-tone={tone}>
  <div class="rg-progress-ring-graphic" style={`--rg-ring-size:${size}px`}>
    <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label ?? format(safeValue, safeMax)}>
      <circle class="rg-progress-ring-track" cx={size / 2} cy={size / 2} r={radius} style:stroke-width={strokeWidth} />
      <circle class="rg-progress-ring-value" cx={size / 2} cy={size / 2} r={radius} style:stroke-width={strokeWidth} style:stroke-dasharray={circumference} style:stroke-dashoffset={offset} />
    </svg>
    <strong>{format(safeValue, safeMax)}</strong>
  </div>
  {#if label || detail}<div class="rg-progress-ring-copy">{#if label}<span>{label}</span>{/if}{#if detail}<small>{detail}</small>{/if}</div>{/if}
</div>
