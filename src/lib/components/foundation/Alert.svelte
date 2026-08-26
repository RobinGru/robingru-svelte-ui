<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { CircleAlert, CircleCheck, Info, TriangleAlert } from '@lucide/svelte'; import { cn } from '../../internal/cn.js'; import type { Tone } from '../../types.js';
  type Props=Omit<HTMLAttributes<HTMLElement>,'children'>&{children?:Snippet;title:string;description?:string;tone?:Tone;icon?:Snippet};
  let {children,title,description,tone='info',icon,class:className,...rest}:Props=$props();
</script>
<div {...rest} class={cn('rg-alert',className)} data-tone={tone} role={tone==='danger'?'alert':'status'}>
  <span aria-hidden="true">{#if icon}{@render icon()}{:else if tone==='success'}<CircleCheck size={19}/>{:else if tone==='warning'}<TriangleAlert size={19}/>{:else if tone==='danger'}<CircleAlert size={19}/>{:else}<Info size={19}/>{/if}</span>
  <div><div class="rg-alert-title">{title}</div>{#if description}<div class="rg-alert-description">{description}</div>{/if}{#if children}<div class="rg-alert-description">{@render children()}</div>{/if}</div>
</div>
