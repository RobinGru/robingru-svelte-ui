<script lang="ts">
  import { ArrowUp } from '@lucide/svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';

  type Props = Omit<HTMLButtonAttributes, 'children'> & {
    label?: string;
    smooth?: boolean;
  };

  let { label = 'Zurück nach oben', smooth = true, class: className, type = 'button', ...rest }: Props = $props();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  }
</script>

<button {...rest} {type} class={cn('rg-button', 'rg-scroll-to-top', className)} data-variant="outline" data-tone="neutral" onclick={scrollToTop}>
  <ArrowUp size={16} aria-hidden="true" />
  <span>{label}</span>
</button>
