<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLAttributes<HTMLElement>,'children'>&{start?:Snippet;center?:Snippet;end?:Snippet;children?:Snippet}; let {start,center,end,children,class:className,...rest}:Props=$props();
</script>
<header {...rest} class={cn('rg-navbar',className)}>{#if start}<div class="rg-navbar-start">{@render start()}</div>{/if}{#if center}<div style="flex:1;display:flex;justify-content:center;min-width:0">{@render center()}</div>{:else if children}<div style="flex:1;min-width:0">{@render children()}</div>{/if}{#if end}<div class="rg-navbar-end">{@render end()}</div>{/if}</header>
