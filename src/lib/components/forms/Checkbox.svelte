<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLInputAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLInputAttributes,'type'|'checked'|'children'>&{checked?:boolean;children?:Snippet;description?:string};
  let {checked=$bindable(false),children,description,class:className,...rest}:Props=$props();
</script>
<label class={cn('rg-check',className)}><input {...rest} type="checkbox" bind:checked/><span>{#if children}{@render children()}{/if}{#if description}<span style="display:block;color:var(--rg-fg-muted);font-size:var(--rg-text-xs);margin-top:.15rem">{description}</span>{/if}</span></label>
