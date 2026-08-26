<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLAttributes<HTMLDivElement>,'children'>&{label:string;children:Snippet;for?:string;hint?:string;error?:string;required?:boolean;optional?:boolean;meta?:Snippet};
  let {label,children,for:forId,hint,error,required=false,optional=false,meta,class:className,...rest}:Props=$props();
</script>
<div {...rest} class={cn('rg-field',className)}><div class="rg-field-row"><label class="rg-label" for={forId}>{label}{#if required}<span class="rg-required" aria-hidden="true">*</span>{:else if optional}<span style="color:var(--rg-fg-subtle);font-size:var(--rg-text-xs);font-weight:500">optional</span>{/if}</label>{#if meta}<span>{@render meta()}</span>{/if}</div>{@render children()}{#if error}<p class="rg-field-error">{error}</p>{:else if hint}<p class="rg-field-hint">{hint}</p>{/if}</div>
