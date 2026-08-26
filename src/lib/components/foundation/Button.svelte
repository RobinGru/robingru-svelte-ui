<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { Size, Tone, Variant } from '../../types.js';

  type Props = Omit<HTMLButtonAttributes, 'children'> & {
    children?: Snippet;
    start?: Snippet;
    end?: Snippet;
    variant?: Variant;
    tone?: Tone;
    size?: Size;
    loading?: boolean;
    full?: boolean;
  };

  let {
    children,
    start,
    end,
    variant = 'solid',
    tone = 'primary',
    size = 'md',
    loading = false,
    full = false,
    class: className,
    disabled = false,
    type = 'button',
    ...rest
  }: Props = $props();
</script>

<button
  {...rest}
  {type}
  class={cn('rg-button', className)}
  data-variant={variant}
  data-tone={tone}
  data-size={size}
  style:width={full ? '100%' : undefined}
  disabled={disabled || loading}
  aria-busy={loading}
>
  {#if loading}<span class="rg-spinner" aria-hidden="true"></span>{:else if start}{@render start()}{/if}
  {#if children}{@render children()}{/if}
  {#if end}{@render end()}{/if}
</button>
