<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { ArrowLeft, ArrowRight } from '@lucide/svelte';
  import { cn } from '../../internal/cn.js';
  import type { ArticleNavItem } from '../../types.js';

  type Props = HTMLAttributes<HTMLElement> & {
    previous?: ArticleNavItem;
    next?: ArticleNavItem;
    label?: string;
  };

  let {
    previous,
    next,
    label = 'Artikelnavigation',
    class: className,
    ...rest
  }: Props = $props();
</script>

<nav {...rest} class={cn('rg-article-nav', className)} aria-label={label}>
  {#if previous}
    <a class="rg-article-nav-item" data-direction="previous" href={previous.href}>
      <ArrowLeft size={18} aria-hidden="true" />
      <span><small>Vorheriger Beitrag</small><strong>{previous.title}</strong></span>
    </a>
  {:else}<span></span>{/if}
  {#if next}
    <a class="rg-article-nav-item" data-direction="next" href={next.href}>
      <span><small>Nächster Beitrag</small><strong>{next.title}</strong></span>
      <ArrowRight size={18} aria-hidden="true" />
    </a>
  {/if}
</nav>
