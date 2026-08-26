<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { CircleX } from '@lucide/svelte'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLAttributes<HTMLDivElement>,'children'>&{title?:string;description?:string;actions?:Snippet}; let {title='Etwas ist schiefgelaufen',description='Bitte versuche es erneut.',actions,class:className,...rest}:Props=$props();
</script>
<div {...rest} class={cn('rg-state',className)} role="alert"><div class="rg-state-icon" style="color:var(--rg-danger);background:color-mix(in oklab,var(--rg-danger) 12%,var(--rg-surface))"><CircleX size={21}/></div><h3 class="rg-state-title">{title}</h3><p class="rg-state-description">{description}</p>{#if actions}<div class="rg-cluster" style="justify-content:center;margin-top:1rem">{@render actions()}</div>{/if}</div>
