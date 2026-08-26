<script lang="ts">
  import type { Snippet } from 'svelte';
  import { AlertDialog as BitsAlertDialog } from 'bits-ui';
  import { TriangleAlert } from '@lucide/svelte';
  type Props={open?:boolean;title:string;description:string;trigger?:Snippet;confirmLabel?:string;cancelLabel?:string;tone?:'primary'|'danger';onconfirm?:()=>void;oncancel?:()=>void};
  let {open=$bindable(false),title,description,trigger,confirmLabel='Bestätigen',cancelLabel='Abbrechen',tone='danger',onconfirm,oncancel}:Props=$props();
  function confirm(){onconfirm?.();open=false} function cancel(){oncancel?.();open=false}
</script>
<BitsAlertDialog.Root bind:open>
  {#if trigger}<BitsAlertDialog.Trigger class="rg-button" data-variant="outline" data-tone="neutral">{@render trigger()}</BitsAlertDialog.Trigger>{/if}
  <BitsAlertDialog.Portal><BitsAlertDialog.Overlay class="rg-overlay"/><BitsAlertDialog.Content class="rg-dialog" style="--dialog-width:28rem">
    <div class="rg-dialog-header"><div style="display:flex;gap:.75rem;align-items:flex-start"><span class="rg-state-icon" style="flex:0 0 auto;color:var(--rg-danger);background:color-mix(in oklab,var(--rg-danger) 12%,var(--rg-surface))"><TriangleAlert size={20}/></span><div><BitsAlertDialog.Title class="rg-dialog-title">{title}</BitsAlertDialog.Title><BitsAlertDialog.Description class="rg-dialog-description">{description}</BitsAlertDialog.Description></div></div></div>
    <div class="rg-dialog-footer"><BitsAlertDialog.Cancel class="rg-button" data-variant="outline" data-tone="neutral" onclick={cancel}>{cancelLabel}</BitsAlertDialog.Cancel><BitsAlertDialog.Action class="rg-button" data-variant="solid" data-tone={tone} onclick={confirm}>{confirmLabel}</BitsAlertDialog.Action></div>
  </BitsAlertDialog.Content></BitsAlertDialog.Portal>
</BitsAlertDialog.Root>
