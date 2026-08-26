<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { Clock3 } from '@lucide/svelte';
  import { cn } from '../../internal/cn.js';

  type Props = HTMLAttributes<HTMLSpanElement> & {
    minutes?: number;
    words?: number;
    wordsPerMinute?: number;
    suffix?: string;
  };

  let {
    minutes,
    words,
    wordsPerMinute = 220,
    suffix = 'Min. Lesezeit',
    class: className,
    ...rest
  }: Props = $props();

  let calculated = $derived(
    Math.max(1, Math.round(minutes ?? Math.ceil((words ?? wordsPerMinute) / wordsPerMinute)))
  );
</script>

<span {...rest} class={cn('rg-reading-time', className)}>
  <Clock3 size={15} aria-hidden="true" />
  {calculated} {suffix}
</span>
