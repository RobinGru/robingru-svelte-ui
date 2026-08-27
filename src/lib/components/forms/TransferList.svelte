<script lang="ts">
  import { ChevronsLeft, ChevronsRight, Search } from '@lucide/svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { Option } from '../../types.js';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onchange'> & {
    items: Option[];
    value?: string[];
    availableLabel?: string;
    selectedLabel?: string;
    searchable?: boolean;
    disabled?: boolean;
    onchange?: (value: string[]) => void;
  };

  let { items, value = $bindable([]), availableLabel = 'Verfügbar', selectedLabel = 'Ausgewählt', searchable = true, disabled = false, onchange, class: className, ...rest }: Props = $props();
  let availableSelection = $state<string[]>([]);
  let selectedSelection = $state<string[]>([]);
  let availableQuery = $state('');
  let selectedQuery = $state('');
  let available = $derived(items.filter((item) => !value.includes(item.value) && item.label.toLocaleLowerCase().includes(availableQuery.toLocaleLowerCase())));
  let selectedItems = $derived(items.filter((item) => value.includes(item.value) && item.label.toLocaleLowerCase().includes(selectedQuery.toLocaleLowerCase())));

  function add() {
    const additions = availableSelection.filter((id) => !items.find((item) => item.value === id)?.disabled);
    value = [...value, ...additions.filter((id) => !value.includes(id))]; availableSelection = []; onchange?.(value);
  }
  function remove() {
    value = value.filter((id) => !selectedSelection.includes(id)); selectedSelection = []; onchange?.(value);
  }
</script>

<div {...rest} class={cn('rg-transfer', className)}>
  <section class="rg-transfer-list">
    <header><strong>{availableLabel}</strong><span>{available.length}</span></header>
    {#if searchable}<label class="rg-transfer-search"><Search size={14} /><input bind:value={availableQuery} aria-label={`${availableLabel} durchsuchen`} placeholder="Suchen …" /></label>{/if}
    <select multiple bind:value={availableSelection} aria-label={availableLabel} {disabled} ondblclick={add}>
      {#each available as item}<option value={item.value} disabled={item.disabled}>{item.label}{item.description ? ` — ${item.description}` : ''}</option>{/each}
    </select>
  </section>
  <div class="rg-transfer-actions">
    <button type="button" class="rg-button" data-size="sm" data-variant="outline" aria-label="Auswahl hinzufügen" disabled={disabled || !availableSelection.length} onclick={add}><ChevronsRight size={16} /></button>
    <button type="button" class="rg-button" data-size="sm" data-variant="outline" aria-label="Auswahl entfernen" disabled={disabled || !selectedSelection.length} onclick={remove}><ChevronsLeft size={16} /></button>
  </div>
  <section class="rg-transfer-list">
    <header><strong>{selectedLabel}</strong><span>{selectedItems.length}</span></header>
    {#if searchable}<label class="rg-transfer-search"><Search size={14} /><input bind:value={selectedQuery} aria-label={`${selectedLabel} durchsuchen`} placeholder="Suchen …" /></label>{/if}
    <select multiple bind:value={selectedSelection} aria-label={selectedLabel} {disabled} ondblclick={remove}>
      {#each selectedItems as item}<option value={item.value} disabled={item.disabled}>{item.label}{item.description ? ` — ${item.description}` : ''}</option>{/each}
    </select>
  </section>
</div>
