<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLAttributes<HTMLElement>,'children'>&{title:string;description?:string;eyebrow?:string;breadcrumbs?:Snippet;actions?:Snippet;children?:Snippet;cover?:Snippet;avatar?:Snippet;headingLevel?:1|2|3|4|5|6}; let {title,description,eyebrow,breadcrumbs,actions,children,cover,avatar,headingLevel=1,class:className,...rest}:Props=$props();
</script>
<header {...rest} class={cn('rg-page-header',className)} data-featured={Boolean(cover || avatar)}>
  {#if cover}<div class="rg-page-header-cover">{@render cover()}</div>{/if}
  <div class="rg-page-header-body">
    {#if avatar}<div class="rg-page-header-avatar">{@render avatar()}</div>{/if}
    <div class="rg-page-header-copy">{#if breadcrumbs}<div class="rg-page-header-breadcrumbs">{@render breadcrumbs()}</div>{/if}{#if eyebrow}<div class="rg-page-header-eyebrow">{eyebrow}</div>{/if}<svelte:element this={`h${headingLevel}`} class="rg-page-title">{title}</svelte:element>{#if description}<p class="rg-page-description">{description}</p>{/if}{#if children}<div class="rg-page-header-meta">{@render children()}</div>{/if}</div>
    {#if actions}<div class="rg-page-header-actions">{@render actions()}</div>{/if}
  </div>
</header>
