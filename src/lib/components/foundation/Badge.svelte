<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { Tone } from '../../types.js';
  type Props = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & { children: Snippet; tone?: Tone; dot?: boolean };
  let { children, tone='neutral', dot=false, class: className, ...rest }: Props = $props();
</script>
<span {...rest} class={cn('rg-badge', className)} data-tone={tone}>{#if dot}<span aria-hidden="true" style="width:.4rem;height:.4rem;border-radius:50%;background:currentColor"></span>{/if}{@render children()}</span>
