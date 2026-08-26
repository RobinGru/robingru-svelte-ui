<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLAttributes<HTMLDivElement>,'children'>&{children:Snippet;minItemWidth?:string;gap?:string;label?:string}; let {children,minItemWidth='14rem',gap='1rem',label,class:className,...rest}:Props=$props();
</script>
<div {...rest} class={cn(className)} style={`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,${minItemWidth}),1fr));gap:${gap}`} aria-label={label}>{@render children()}</div>
