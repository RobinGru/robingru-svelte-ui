<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { Info } from '@lucide/svelte'; import { cn } from '../../internal/cn.js'; import type { Tone } from '../../types.js';
  type Props=Omit<HTMLAttributes<HTMLElement>,'children'>&{children:Snippet;title?:string;tone?:Tone;icon?:Snippet};
  let {children,title,tone='primary',icon,class:className,...rest}:Props=$props();
</script>
<aside {...rest} class={cn('rg-callout',className)} data-tone={tone}>
  <span aria-hidden="true">{#if icon}{@render icon()}{:else}<Info size={18}/>{/if}</span>
  <div>{#if title}<div class="rg-alert-title">{title}</div>{/if}<div class="rg-alert-description">{@render children()}</div></div>
</aside>
