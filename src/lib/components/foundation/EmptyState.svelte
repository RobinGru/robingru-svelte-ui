<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { Inbox } from '@lucide/svelte'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLAttributes<HTMLDivElement>,'children'>&{title?:string;description?:string;icon?:Snippet;actions?:Snippet;children?:Snippet};
  let {title='Noch keine Einträge',description='Sobald Inhalte vorhanden sind, erscheinen sie hier.',icon,actions,children,class:className,...rest}:Props=$props();
</script>
<div {...rest} class={cn('rg-state',className)}><div class="rg-state-icon">{#if icon}{@render icon()}{:else}<Inbox size={21}/>{/if}</div><h3 class="rg-state-title">{title}</h3><p class="rg-state-description">{description}</p>{#if children}<div style="margin-top:.75rem">{@render children()}</div>{/if}{#if actions}<div class="rg-cluster" style="justify-content:center;margin-top:1rem">{@render actions()}</div>{/if}</div>
