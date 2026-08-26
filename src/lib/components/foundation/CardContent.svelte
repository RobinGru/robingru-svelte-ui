<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLAttributes<HTMLDivElement>,'children'>&{children:Snippet}; let {children,class:className,...rest}:Props=$props();
</script>
<div {...rest} class={cn('rg-card-content',className)}>{@render children()}</div>
