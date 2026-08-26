<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { ChevronDown } from '@lucide/svelte'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLAttributes<HTMLDivElement>,'children'>&{open?:boolean;title:string;children:Snippet;onchange?: (open:boolean)=>void}; let {open=$bindable(false),title,children,onchange,class:className,...rest}:Props=$props(); function toggle(){open=!open;onchange?.(open)}
</script>
<div {...rest} class={cn('rg-collapsible',className)}><button class="rg-collapsible-trigger" type="button" aria-expanded={open} onclick={toggle}><span style="display:flex;justify-content:space-between;align-items:center;gap:.75rem">{title}<ChevronDown size={17} style={`transition:transform var(--rg-duration);transform:rotate(${open?'180deg':'0'})`}/></span></button>{#if open}<div class="rg-collapsible-content">{@render children()}</div>{/if}</div>
