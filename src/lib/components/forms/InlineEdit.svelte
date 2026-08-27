<script lang="ts">
  import { Check, Pencil, X } from '@lucide/svelte';
  import { tick } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onsave'> & {
    value?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    validate?: (value: string) => string | undefined;
    onsave?: (value: string) => void | Promise<void>;
    oncancel?: () => void;
  };

  let { value = $bindable(''), label = 'Wert bearbeiten', placeholder = 'Wert eingeben', disabled = false, required = false, validate, onsave, oncancel, class: className, ...rest }: Props = $props();
  const uid = $props.id();
  let input = $state<HTMLInputElement>();
  let editing = $state(false);
  let draft = $state('');
  let error = $state('');
  let saving = $state(false);

  async function edit() {
    if (disabled) return;
    draft = value; error = ''; editing = true; await tick(); input?.focus(); input?.select();
  }
  function cancel() {
    editing = false; draft = value; error = ''; oncancel?.();
  }
  async function save() {
    const message = required && !draft.trim() ? 'Dieses Feld ist erforderlich.' : validate?.(draft);
    if (message) { error = message; input?.focus(); return; }
    saving = true;
    try { await onsave?.(draft); value = draft; editing = false; error = ''; }
    catch (reason) { error = reason instanceof Error ? reason.message : 'Änderung konnte nicht gespeichert werden.'; }
    finally { saving = false; }
  }
  function keydown(event: KeyboardEvent) {
    if (event.key === 'Enter') { event.preventDefault(); void save(); }
    if (event.key === 'Escape') { event.preventDefault(); cancel(); }
  }
</script>

<div {...rest} class={cn('rg-inline-edit', className)} data-editing={editing}>
  {#if editing}
    <div class="rg-inline-edit-form">
      <input bind:this={input} class="rg-input" bind:value={draft} aria-label={label} aria-invalid={Boolean(error)} aria-describedby={error ? `${uid}-error` : undefined} {placeholder} disabled={saving} onkeydown={keydown} />
      <button type="button" class="rg-button" data-size="sm" aria-label="Änderung speichern" disabled={saving} onclick={save}><Check size={15} /></button>
      <button type="button" class="rg-button" data-size="sm" data-variant="ghost" aria-label="Bearbeitung abbrechen" disabled={saving} onclick={cancel}><X size={15} /></button>
    </div>
    {#if error}<small class="rg-field-error" id={`${uid}-error`} role="alert">{error}</small>{/if}
  {:else}
    <button type="button" class="rg-inline-edit-value" {disabled} aria-label={`${label}: ${value || placeholder}`} onclick={edit}><span data-placeholder={!value}>{value || placeholder}</span><Pencil size={14} aria-hidden="true" /></button>
  {/if}
</div>
