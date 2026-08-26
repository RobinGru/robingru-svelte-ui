<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & { children: Snippet; label?: string };
  let { children, label='Personen', class: className, ...rest }: Props = $props();
</script>
<div {...rest} class={cn('rg-avatar-group', className)} role="group" aria-label={label}>{@render children()}</div>
