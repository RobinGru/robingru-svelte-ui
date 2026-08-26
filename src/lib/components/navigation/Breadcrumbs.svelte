<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { ChevronRight } from '@lucide/svelte'; import { cn } from '../../internal/cn.js';
  export type BreadcrumbItem={label:string;href?:string;current?:boolean};
  type Props=HTMLAttributes<HTMLElement>&{items:BreadcrumbItem[];label?:string}; let {items,label='Brotkrümelnavigation',class:className,...rest}:Props=$props();
</script>
<nav {...rest} class={cn('rg-breadcrumbs',className)} aria-label={label}><ol>{#each items as item,i}<li>{#if item.href && !item.current}<a href={item.href}>{item.label}</a>{:else}<span aria-current={item.current?'page':undefined}>{item.label}</span>{/if}</li>{#if i<items.length-1}<li class="rg-breadcrumb-sep" aria-hidden="true"><ChevronRight size={13}/></li>{/if}{/each}</ol></nav>
