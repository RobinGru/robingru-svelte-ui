<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { Orientation } from '../../types.js';

  type Props = HTMLAttributes<HTMLDivElement> & {
    value?: number;
    min?: number;
    max?: number;
    orientation?: Orientation;
    label?: string;
    first: Snippet;
    second: Snippet;
    onchange?: (value: number) => void;
  };

  let { value = $bindable(50), min = 20, max = 80, orientation = 'horizontal', label = 'Bereiche skalieren', first, second, onchange, class: className, ...rest }: Props = $props();
  let root = $state<HTMLDivElement>();
  let dragging = $state(false);

  function clamp(next: number) { return Math.min(max, Math.max(min, Math.round(next))); }
  function set(next: number) { value = clamp(next); onchange?.(value); }
  function move(event: PointerEvent) {
    if (!dragging || !root) return;
    const rect = root.getBoundingClientRect();
    const next = orientation === 'horizontal' ? ((event.clientX - rect.left) / rect.width) * 100 : ((event.clientY - rect.top) / rect.height) * 100;
    set(next);
  }
  function stop() { dragging = false; window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', stop); }
  function start(event: PointerEvent) {
    event.preventDefault(); dragging = true; window.addEventListener('pointermove', move); window.addEventListener('pointerup', stop, { once: true });
  }
  function keydown(event: KeyboardEvent) {
    const decrement = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    const increment = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    if (event.key === decrement || event.key === increment) { event.preventDefault(); set(value + (event.key === increment ? 2 : -2)); }
    if (event.key === 'Home') { event.preventDefault(); set(min); }
    if (event.key === 'End') { event.preventDefault(); set(max); }
  }
</script>

<div {...rest} bind:this={root} class={cn('rg-panels', className)} data-orientation={orientation} data-dragging={dragging} style={`--rg-panel-first:${value}%`}>
  <div class="rg-panel rg-panel-first">{@render first()}</div>
  <div class="rg-panel-handle" role="slider" aria-label={label} aria-orientation={orientation} aria-valuemin={min} aria-valuemax={max} aria-valuenow={value} tabindex="0" onpointerdown={start} onkeydown={keydown}><span></span></div>
  <div class="rg-panel rg-panel-second">{@render second()}</div>
</div>
