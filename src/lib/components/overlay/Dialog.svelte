<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Dialog as BitsDialog } from 'bits-ui';
  import { X } from '@lucide/svelte';
  import { cn } from '../../internal/cn.js';

  type Props = {
    open?: boolean;
    title: string;
    description?: string;
    trigger?: Snippet;
    children: Snippet;
    footer?: Snippet;
    closeLabel?: string;
    width?: string;
    class?: string;
    onopenchange?: (open: boolean) => void;
  };

  let { open=$bindable(false), title, description, trigger, children, footer, closeLabel='Schließen', width='31rem', class:className, onopenchange }: Props = $props();
  function changed(next: boolean) { open = next; onopenchange?.(next); }
</script>

<BitsDialog.Root bind:open onOpenChange={changed}>
  {#if trigger}<BitsDialog.Trigger class="rg-button" data-variant="solid" data-tone="primary" data-size="md">{@render trigger()}</BitsDialog.Trigger>{/if}
  <BitsDialog.Portal>
    <BitsDialog.Overlay class="rg-overlay" />
    <BitsDialog.Content class={cn('rg-dialog', className)} style={`--dialog-width:${width}`}>
      <div class="rg-dialog-header"><BitsDialog.Title class="rg-dialog-title">{title}</BitsDialog.Title>{#if description}<BitsDialog.Description class="rg-dialog-description">{description}</BitsDialog.Description>{/if}</div>
      <div class="rg-dialog-body">{@render children()}</div>
      {#if footer}<div class="rg-dialog-footer">{@render footer()}</div>{/if}
      <BitsDialog.Close class="rg-button rg-icon-button rg-dialog-close" data-variant="ghost" data-size="sm" aria-label={closeLabel}><X size={17}/></BitsDialog.Close>
    </BitsDialog.Content>
  </BitsDialog.Portal>
</BitsDialog.Root>
