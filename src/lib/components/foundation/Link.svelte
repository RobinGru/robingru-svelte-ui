<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLAnchorAttributes } from 'svelte/elements'; import { ExternalLink } from '@lucide/svelte'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLAnchorAttributes,'children'>&{children:Snippet;external?:boolean};
  let {children,external=false,target,rel,class:className,...rest}:Props=$props();
</script>
<a {...rest} class={cn('rg-link',className)} target={external ? '_blank' : target} rel={external ? 'noreferrer' : rel}>{@render children()}{#if external}<ExternalLink size={12} style="display:inline;margin-inline-start:.25rem" aria-hidden="true"/>{/if}</a>
