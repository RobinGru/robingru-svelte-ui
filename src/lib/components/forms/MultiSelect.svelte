<script lang="ts">
  import { Check, ChevronDown, Search, X } from '@lucide/svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { Option } from '../../types.js';
  import FloatingMenu from '../internal/FloatingMenu.svelte';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onchange'> & {
    values?: string[];
    options: Option[];
    label?: string;
    placeholder?: string;
    emptyLabel?: string;
    searchable?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    maxVisible?: number;
    onchange?: (values: string[]) => void;
  };

  let {
    values = $bindable([]), options, label = 'Mehrfachauswahl', placeholder = 'Auswählen …',
    emptyLabel = 'Keine Ergebnisse', searchable = true, disabled = false, invalid = false,
    maxVisible = 3, onchange, class: className, ...rest
  }: Props = $props();

  const uid = $props.id();
  let root = $state<HTMLElement | undefined>();
  let menu = $state<HTMLElement | undefined>();
  let open = $state(false);
  let query = $state('');
  let activeIndex = $state(0);
  let selected = $derived(options.filter((option) => values.includes(option.value)));
  let filtered = $derived(options.filter((option) =>
    `${option.label} ${option.description ?? ''}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  ));

  function toggle(option: Option) {
    if (option.disabled) return;
    values = values.includes(option.value) ? values.filter((value) => value !== option.value) : [...values, option.value];
    onchange?.(values);
  }

  function remove(value: string) {
    values = values.filter((item) => item !== value);
    onchange?.(values);
  }

  function keydown(event: KeyboardEvent) {
    if (!filtered.length) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      activeIndex = (activeIndex + direction + filtered.length) % filtered.length;
    } else if ((event.key === 'Enter' || event.key === ' ') && filtered[activeIndex]) {
      event.preventDefault();
      toggle(filtered[activeIndex]);
    } else if (event.key === 'Escape') {
      open = false;
    }
  }

  function focusout(event: FocusEvent) {
    queueMicrotask(() => { if (!root?.contains(document.activeElement) && !menu?.contains(document.activeElement)) open = false; });
  }
</script>

<div {...rest} bind:this={root} class={cn('rg-multiselect', className)} data-open={open} data-invalid={invalid} onfocusout={focusout}>
  <div class="rg-multiselect-control" data-disabled={disabled}>
    <span class="rg-multiselect-values">
      {#if selected.length}
        {#each selected.slice(0, maxVisible) as option}
          <span class="rg-multiselect-chip">{option.label}<button type="button" aria-label={`${option.label} entfernen`} disabled={disabled} onclick={(event) => { event.stopPropagation(); remove(option.value); }}><X size={12} /></button></span>
        {/each}
        {#if selected.length > maxVisible}<span class="rg-multiselect-more">+{selected.length - maxVisible}</span>{/if}
      {:else}<span class="rg-multiselect-placeholder">{placeholder}</span>{/if}
    </span>
    <button type="button" class="rg-multiselect-toggle" aria-label={label} aria-haspopup="listbox" aria-expanded={open} aria-controls={`${uid}-listbox`} {disabled} onclick={(event) => { event.stopPropagation(); open = !open; }}><ChevronDown size={16} aria-hidden="true" /></button>
  </div>
  {#if open}
    <FloatingMenu bind:element={menu} anchor={root} class="rg-floating-menu rg-multiselect-menu" onfocusout={focusout}>
      <div id={`${uid}-listbox`} role="listbox" aria-label={label} aria-multiselectable="true" tabindex="-1" onkeydown={keydown}>
      {#if searchable}
        <label class="rg-multiselect-search"><Search size={15} aria-hidden="true" /><input bind:value={query} aria-label={`${label} durchsuchen`} placeholder="Suchen …" onkeydown={keydown} /></label>
      {/if}
      <div class="rg-multiselect-options">
        {#if filtered.length}
          {#each filtered as option, index}
            <button type="button" class="rg-multiselect-option" role="option" aria-selected={values.includes(option.value)} data-active={index === activeIndex} disabled={option.disabled} onmousedown={(event) => event.preventDefault()} onclick={() => toggle(option)} onmouseenter={() => activeIndex = index}>
              <span class="rg-multiselect-check">{#if values.includes(option.value)}<Check size={13} />{/if}</span>
              <span><strong>{option.label}</strong>{#if option.description}<small>{option.description}</small>{/if}</span>
            </button>
          {/each}
        {:else}<div class="rg-combobox-state">{emptyLabel}</div>{/if}
      </div>
      </div>
    </FloatingMenu>
  {/if}
</div>
