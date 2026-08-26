<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLAttributes<HTMLElement>,'children'>&{children:Snippet}; let {children,class:className,...rest}:Props=$props();
</script>
<kbd {...rest} class={cn('rg-kbd',className)}>{@render children()}</kbd>
