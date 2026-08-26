<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children: Snippet;
    minItemWidth?: string;
    gap?: string;
  };

  let {
    children,
    minItemWidth = '17rem',
    gap = '1.25rem',
    class: className,
    ...rest
  }: Props = $props();
</script>

<div
  {...rest}
  class={cn('rg-post-grid', className)}
  style={`--rg-post-grid-min:${minItemWidth};--rg-post-grid-gap:${gap}`}
>
  {@render children()}
</div>
