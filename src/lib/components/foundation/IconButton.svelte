<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { Size, Tone, Variant } from '../../types.js';

  type Props = Omit<HTMLButtonAttributes, 'children'> & {
    children: Snippet;
    label: string;
    variant?: Variant;
    tone?: Tone;
    size?: Size;
    loading?: boolean;
  };
  let { children, label, variant='ghost', tone='neutral', size='md', loading=false, class: className, disabled=false, type='button', ...rest }: Props = $props();
</script>

<button {...rest} {type} class={cn('rg-button rg-icon-button', className)} data-variant={variant} data-tone={tone} data-size={size} aria-label={label} title={rest.title ?? label} disabled={disabled || loading} aria-busy={loading}>
  {#if loading}<span class="rg-spinner" aria-hidden="true"></span>{:else}{@render children()}{/if}
</button>
