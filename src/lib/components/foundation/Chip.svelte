<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { X } from '@lucide/svelte';
  import { cn } from '../../internal/cn.js';
  import type { Tone } from '../../types.js';
  type Props = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & { children: Snippet; tone?: Tone; removable?: boolean; onremove?: () => void };
  let { children, tone='neutral', removable=false, onremove, class: className, ...rest }: Props = $props();
</script>
<span {...rest} class={cn('rg-chip', className)} data-tone={tone}>
  {@render children()}
  {#if removable}<button type="button" aria-label="Entfernen" onclick={onremove} style="display:grid;place-items:center;padding:0;border:0;background:transparent;color:inherit;cursor:pointer"><X size={13}/></button>{/if}
</span>
