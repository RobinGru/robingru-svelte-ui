<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLAttributes<HTMLElement>,'children'>&{children:Snippet}; let {children,class:className,...rest}:Props=$props();
</script>
<footer {...rest} class={cn('rg-card-footer',className)}>{@render children()}</footer>
