<script lang="ts">
  import { ChevronLeft, ChevronRight } from '@lucide/svelte';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';

  type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    header?: Snippet; collapsedHeader?: Snippet; children: Snippet; collapsedChildren?: Snippet;
    footer?: Snippet; collapsedFooter?: Snippet; width?: string; collapsedWidth?: string;
    collapsible?: boolean; collapsed?: boolean; label?: string;
  };

  let { header, collapsedHeader, children, collapsedChildren, footer, collapsedFooter,
    width = '16rem', collapsedWidth = '4.5rem', collapsible = false,
    collapsed = $bindable(false), label = 'Hauptnavigation', class: className, ...rest }: Props = $props();
</script>

<aside {...rest} class={cn('rg-sidebar', className)} data-collapsed={collapsible && collapsed ? 'true' : 'false'} style={`--sidebar-width:${collapsible && collapsed ? collapsedWidth : width}`} aria-label={label}>
  {#if header || collapsedHeader || collapsible}
    <div class="rg-sidebar-header">
      {#if collapsible}
        <button class="rg-sidebar-toggle" type="button" aria-label={collapsed ? 'Seitenleiste ausklappen' : 'Seitenleiste einklappen'} aria-expanded={!collapsed} title={collapsed ? 'Seitenleiste ausklappen' : 'Seitenleiste einklappen'} onclick={() => collapsed = !collapsed}>
          {#if collapsed}<ChevronRight size={17} aria-hidden="true" />{:else}<ChevronLeft size={17} aria-hidden="true" />{/if}
        </button>
      {/if}
      {#if collapsible && collapsed}
        {#if collapsedHeader}{@render collapsedHeader()}{/if}
      {:else if header}
        {@render header()}
      {/if}
    </div>
  {/if}
  <nav class="rg-sidebar-content">
    {#if collapsible && collapsed && collapsedChildren}{@render collapsedChildren()}{:else}{@render children()}{/if}
  </nav>
  {#if footer || collapsedFooter}
    <div class="rg-sidebar-footer">
      {#if collapsible && collapsed}{#if collapsedFooter}{@render collapsedFooter()}{/if}{:else if footer}{@render footer()}{/if}
    </div>
  {/if}
</aside>
