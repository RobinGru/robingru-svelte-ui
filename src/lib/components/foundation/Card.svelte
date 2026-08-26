<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & { children: Snippet; interactive?: boolean };
  let { children, interactive=false, class: className, ...rest }: Props = $props();
</script>
<article {...rest} class={cn('rg-card', className)} data-interactive={interactive}>{@render children()}</article>
