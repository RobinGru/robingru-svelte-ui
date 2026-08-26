<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLInputAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLInputAttributes,'type'|'checked'|'children'>&{checked?:boolean;children?:Snippet;description?:string;onchangevalue?: (checked:boolean)=>void};
  let {checked=$bindable(false),children,description,onchangevalue,class:className,...rest}:Props=$props();
  function changed(){onchangevalue?.(checked)}
</script>
<label class={cn('rg-switch',className)}><input {...rest} type="checkbox" role="switch" bind:checked onchange={changed}/><span class="rg-switch-track" aria-hidden="true"><span class="rg-switch-thumb"></span></span>{#if children}<span>{@render children()}{#if description}<span style="display:block;color:var(--rg-fg-muted);font-size:var(--rg-text-xs)">{description}</span>{/if}</span>{/if}</label>
