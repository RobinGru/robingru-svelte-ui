<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLTableAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLTableAttributes,'children'>&{children:Snippet;header?:Snippet;caption?:string;label?:string}; let {children,header,caption,label,class:className,...rest}:Props=$props();
</script>
<div class="rg-table-wrap"><table {...rest} class={cn('rg-table',className)} aria-label={label}>{#if caption}<caption class="rg-sr-only">{caption}</caption>{/if}{#if header}{@render header()}{/if}{@render children()}</table></div>
