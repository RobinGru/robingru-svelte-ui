<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children: Snippet;
    size?: 'sm' | 'md' | 'lg';
  };

  let {
    children,
    size = 'md',
    class: className,
    ...rest
  }: Props = $props();
</script>

<div {...rest} class={cn('rg-prose', className)} data-size={size}>{@render children()}</div>
