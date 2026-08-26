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
    class: className,
    ...rest
  }: Props = $props();
</script>

<header {...rest} class={cn('rg-article-header', className)} data-align={align}>
  {#if breadcrumbs}<div class="rg-article-breadcrumbs">{@render breadcrumbs()}</div>{/if}
  {#if eyebrow}<div class="rg-article-eyebrow">{eyebrow}</div>{/if}
  <h1 class="rg-article-title">{title}</h1>
  {#if description}<p class="rg-article-deck">{description}</p>{/if}
  {#if meta}<div class="rg-article-meta-slot">{@render meta()}</div>{/if}
  {#if actions}<div class="rg-article-actions">{@render actions()}</div>{/if}
  {#if children}<div class="rg-article-header-extra">{@render children()}</div>{/if}
</header>
