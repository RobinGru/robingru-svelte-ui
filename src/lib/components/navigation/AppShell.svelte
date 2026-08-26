<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLAttributes<HTMLDivElement>,'children'>&{sidebar?:Snippet;header?:Snippet;children:Snippet;contained?:boolean}; let {sidebar,header,children,contained=true,class:className,...rest}:Props=$props();
</script>
<div {...rest} class={cn('rg-app-shell',className)}>{#if sidebar}{@render sidebar()}{/if}<div class="rg-app-main">{#if header}{@render header()}{/if}<main class:rg-page-shell={contained}>{@render children()}</main></div></div>
