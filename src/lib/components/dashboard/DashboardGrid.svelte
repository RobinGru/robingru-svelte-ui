<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children: Snippet;
    columns?: 1 | 2 | 3 | 4 | 'auto';
    minItemWidth?: string;
    gap?: string;
    align?: 'stretch' | 'start';
  };

  let {
    children,
    columns = 'auto',
    minItemWidth = '15rem',
    gap = '1rem',
    align = 'stretch',
    class: className,
    ...rest
  }: Props = $props();
</script>

<div
  {...rest}
  class={cn('rg-dashboard-grid', className)}
  data-columns={columns}
  data-align={align}
  style={`--rg-dashboard-min:${minItemWidth};--rg-dashboard-gap:${gap}`}
>
  {@render children()}
</div>
