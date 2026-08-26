<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';

  type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    title: string;
    description?: string;
    eyebrow?: string;
    breadcrumbs?: Snippet;
    meta?: Snippet;
    actions?: Snippet;
    children?: Snippet;
    align?: 'start' | 'center';
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  };

  let {
    title,
    description,
    eyebrow,
    breadcrumbs,
    meta,
    actions,
    children,
    align = 'start',
    headingLevel = 1,
    class: className,
    ...rest
  }: Props = $props();
</script>

<header {...rest} class={cn('rg-article-header', className)} data-align={align}>
  {#if breadcrumbs}<div class="rg-article-breadcrumbs">{@render breadcrumbs()}</div>{/if}
  {#if eyebrow}<div class="rg-article-eyebrow">{eyebrow}</div>{/if}
  <svelte:element this={`h${headingLevel}`} class="rg-article-title">{title}</svelte:element>
  {#if description}<p class="rg-article-deck">{description}</p>{/if}
  {#if meta}<div class="rg-article-meta-slot">{@render meta()}</div>{/if}
  {#if actions}<div class="rg-article-actions">{@render actions()}</div>{/if}
  {#if children}<div class="rg-article-header-extra">{@render children()}</div>{/if}
</header>
