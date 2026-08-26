<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { Tone } from '../../types.js';
  type Props = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & { children: Snippet; tone?: Tone };
  let { children, tone='neutral', class: className, ...rest }: Props = $props();
</script>
<span {...rest} class={cn('rg-tag', className)} data-tone={tone}>{@render children()}</span>
