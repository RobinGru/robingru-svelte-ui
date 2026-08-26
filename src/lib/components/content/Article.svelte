<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';

  type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    children: Snippet;
    aside?: Snippet;
    size?: 'sm' | 'md' | 'lg' | 'full';
  };

  let {
    children,
    aside,
    size = 'md',
    class: className,
    ...rest
  }: Props = $props();
</script>

<article {...rest} class={cn('rg-article', className)} data-size={size}>
  {#if aside}
    <div class="rg-article-layout">
      <div class="rg-article-main">{@render children()}</div>
      <aside class="rg-article-aside">{@render aside()}</aside>
    </div>
  {:else}
    {@render children()}
  {/if}
</article>
