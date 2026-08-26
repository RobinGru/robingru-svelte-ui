<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { ArrowUpRight } from '@lucide/svelte';
  import { cn } from '../../internal/cn.js';
  import type { QuickAction } from '../../types.js';

  type Props = HTMLAttributes<HTMLDivElement> & {
    items: QuickAction[];
    label?: string;
  };

  let { items, label = 'Schnellaktionen', class: className, ...rest }: Props = $props();
</script>

<div {...rest} class={cn('rg-quick-actions', className)} aria-label={label}>
  {#each items as item}
    {#if item.href}
      <a
        class="rg-quick-action"
        href={item.disabled ? undefined : item.href}
        aria-disabled={item.disabled || undefined}
        tabindex={item.disabled ? -1 : undefined}
        onclick={(event) => {
          if (item.disabled) event.preventDefault();
          else item.onselect?.();
        }}
      >
        {#if item.icon}<span class="rg-quick-action-icon">{@render item.icon()}</span>{/if}
        <span><strong>{item.label}</strong>{#if item.description}<small>{item.description}</small>{/if}</span>
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    {:else}
      <button class="rg-quick-action" type="button" disabled={item.disabled} onclick={item.onselect}>
        {#if item.icon}<span class="rg-quick-action-icon">{@render item.icon()}</span>{/if}
        <span><strong>{item.label}</strong>{#if item.description}<small>{item.description}</small>{/if}</span>
        <ArrowUpRight size={16} aria-hidden="true" />
      </button>
    {/if}
  {/each}
</div>
