<script lang="ts">
  import { ChevronDown, LoaderCircle } from '@lucide/svelte';
  import { DropdownMenu } from 'bits-ui';
  import { cn } from '../../internal/cn.js';
  import type { Size, SplitButtonItem, Tone, Variant } from '../../types.js';

  type Props = {
    label: string;
    items: SplitButtonItem[];
    size?: Exclude<Size, 'xs'>;
    tone?: Tone;
    variant?: Variant;
    disabled?: boolean;
    loading?: boolean;
    menuLabel?: string;
    class?: string;
    onclick?: () => void;
  };

  let { label, items, size = 'md', tone = 'primary', variant = 'solid', disabled = false, loading = false, menuLabel = 'Weitere Aktionen', class: className, onclick }: Props = $props();
</script>

<div class={cn('rg-split-button', className)}>
  <button type="button" class="rg-button rg-split-button-main" data-size={size} data-tone={tone} data-variant={variant} disabled={disabled || loading} aria-busy={loading || undefined} onclick={onclick}>
    {#if loading}<LoaderCircle class="rg-spin" size={15} aria-hidden="true" />{/if}{label}
  </button>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger class="rg-button rg-split-button-trigger" data-size={size} data-tone={tone} data-variant={variant} disabled={disabled || loading} aria-label={menuLabel}><ChevronDown size={15} /></DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content class="rg-menu" align="end" sideOffset={6}>
        {#each items as item}
          {#if item.separatorBefore}<DropdownMenu.Separator class="rg-menu-separator" />{/if}
          <DropdownMenu.Item class="rg-menu-item" data-tone={item.tone ?? 'neutral'} disabled={item.disabled} onclick={item.action}>
            {#if item.icon}{@render item.icon()}{/if}<span style="flex:1">{item.label}</span>{#if item.shortcut}<kbd class="rg-kbd">{item.shortcut}</kbd>{/if}
          </DropdownMenu.Item>
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
</div>
