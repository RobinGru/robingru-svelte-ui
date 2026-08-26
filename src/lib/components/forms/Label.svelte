<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLLabelAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLLabelAttributes,'children'>&{children:Snippet;required?:boolean;optional?:boolean};
  let {children,required=false,optional=false,class:className,...rest}:Props=$props();
</script>
<label {...rest} class={cn('rg-label',className)}>{@render children()}{#if required}<span class="rg-required" aria-hidden="true">*</span>{:else if optional}<span style="color:var(--rg-fg-subtle);font-size:var(--rg-text-xs);font-weight:500">optional</span>{/if}</label>
