<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLAttributes<HTMLDivElement>,'children'>&{children:Snippet;label?:string}; let {children,label='Werkzeuge',class:className,...rest}:Props=$props();
</script>
<div {...rest} class={cn('rg-toolbar',className)} role="toolbar" aria-label={label}>{@render children()}</div>
