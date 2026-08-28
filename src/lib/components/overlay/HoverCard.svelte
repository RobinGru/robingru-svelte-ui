<script lang="ts">
  import { tick, type Snippet } from 'svelte';
  import { cn } from '../../internal/cn.js';
  import FloatingMenu from '../internal/FloatingMenu.svelte';

  type Props = {
    open?: boolean;
    trigger: Snippet;
    children: Snippet;
    label?: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    openDelay?: number;
    closeDelay?: number;
    class?: string;
    onopenchange?: (open: boolean) => void;
  };

  let {
    open = $bindable(false),
    trigger,
    children,
    label = 'Vorschau',
    side = 'bottom',
    align = 'start',
    openDelay = 250,
    closeDelay = 150,
    class: className,
    onopenchange
  }: Props = $props();

  let root = $state<HTMLElement>();
  let card = $state<HTMLElement>();
  let timer: number | undefined;

  function clearTimer() {
    if (timer) window.clearTimeout(timer);
    timer = undefined;
  }

  function setOpen(next: boolean) {
    if (open === next) return;
    open = next;
    onopenchange?.(next);
  }

  function scheduleOpen() {
    clearTimer();
    timer = window.setTimeout(() => setOpen(true), open ? 0 : openDelay);
  }

  function scheduleClose() {
    clearTimer();
    timer = window.setTimeout(() => {
      if (!root?.contains(document.activeElement) && !card?.contains(document.activeElement)) setOpen(false);
    }, closeDelay);
  }

  function focusOut() {
    void tick().then(() => {
      if (!root?.contains(document.activeElement) && !card?.contains(document.activeElement)) scheduleClose();
    });
  }

  function keydown(event: KeyboardEvent) {
    if (event.key !== 'Escape') return;
    clearTimer();
    setOpen(false);
    root?.querySelector<HTMLElement>('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus();
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -- The rendered trigger retains its own native link or button semantics. -->
<span
  bind:this={root}
  class="rg-hover-card-trigger"
  onmouseenter={scheduleOpen}
  onmouseleave={scheduleClose}
  onfocusin={scheduleOpen}
  onfocusout={focusOut}
  onkeydown={keydown}
>
  {@render trigger()}
</span>

{#if open}
  <FloatingMenu anchor={root} {side} {align} matchAnchorWidth={false}>
    <div
      bind:this={card}
      class={cn('rg-hover-card', className)}
      role="dialog"
      aria-label={label}
      tabindex="-1"
      onmouseenter={clearTimer}
      onmouseleave={scheduleClose}
      onfocusin={clearTimer}
      onfocusout={focusOut}
      onkeydown={keydown}
    >
      {@render children()}
    </div>
  </FloatingMenu>
{/if}
