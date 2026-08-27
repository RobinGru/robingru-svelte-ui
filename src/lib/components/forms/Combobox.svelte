<script lang="ts">
  import { Check, ChevronDown, LoaderCircle, Search, X } from '@lucide/svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { Option } from '../../types.js';
  import FloatingMenu from '../internal/FloatingMenu.svelte';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onchange'> & {
    value?: string;
    options: Option[];
    label?: string;
    placeholder?: string;
    emptyLabel?: string;
    loading?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    clearable?: boolean;
    onchange?: (value: string) => void;
  };

  let {
    value = $bindable(''),
    options,
    label = 'Auswahl',
    placeholder = 'Suchen oder auswählen …',
    emptyLabel = 'Keine Ergebnisse',
    loading = false,
    disabled = false,
    invalid = false,
    clearable = true,
    onchange,
    class: className,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  let input: HTMLInputElement | undefined;
  let root = $state<HTMLElement | undefined>();
  let menu = $state<HTMLElement | undefined>();
  let open = $state(false);
  let query = $state('');
  let activeIndex = $state(0);
  let selected = $derived(options.find((option) => option.value === value));
  let filtered = $derived(options.filter((option) =>
    `${option.label} ${option.description ?? ''}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  ));

  $effect(() => {
    if (!open) query = selected?.label ?? '';
  });

  function choose(option: Option) {
    if (option.disabled) return;
    value = option.value;
    query = option.label;
    open = false;
    onchange?.(value);
    input?.focus();
  }

  function clear() {
    value = '';
    query = '';
    activeIndex = 0;
    onchange?.('');
    input?.focus();
  }

  function update(event: Event) {
    query = (event.currentTarget as HTMLInputElement).value;
    if (value) {
      value = '';
      onchange?.('');
    }
    activeIndex = 0;
    open = true;
  }

  function keydown(event: KeyboardEvent) {
    if (disabled) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      open = true;
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      let next = activeIndex;
      do next = (next + direction + filtered.length) % filtered.length;
      while (filtered[next]?.disabled && next !== activeIndex);
      activeIndex = next;
    } else if (event.key === 'Enter' && open && filtered[activeIndex]) {
      event.preventDefault();
      choose(filtered[activeIndex]);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      open = false;
      query = selected?.label ?? '';
    }
  }

  function focusout(event: FocusEvent) {
    queueMicrotask(() => {
      if (!root?.contains(document.activeElement) && !menu?.contains(document.activeElement)) {
        open = false;
        query = selected?.label ?? '';
      }
    });
  }
</script>

<div {...rest} bind:this={root} class={cn('rg-combobox', className)} data-open={open} data-invalid={invalid} onfocusout={focusout}>
  <div class="rg-combobox-control">
    <Search size={16} aria-hidden="true" />
    <input
      bind:this={input}
      value={query}
      role="combobox"
      aria-label={label}
      aria-autocomplete="list"
      aria-expanded={open}
      aria-controls={`${uid}-listbox`}
      aria-activedescendant={open && filtered[activeIndex] ? `${uid}-option-${activeIndex}` : undefined}
      aria-invalid={invalid || undefined}
      {placeholder}
      {disabled}
      oninput={update}
      onfocus={() => !disabled && (open = true)}
      onkeydown={keydown}
    />
    {#if loading}<LoaderCircle class="rg-spin" size={16} aria-label="Wird geladen" />
    {:else if clearable && value && !disabled}<button type="button" class="rg-combobox-icon" aria-label="Auswahl löschen" onclick={clear}><X size={15} /></button>
    {:else}<ChevronDown size={16} aria-hidden="true" />{/if}
  </div>
  {#if open}
    <FloatingMenu bind:element={menu} anchor={root} class="rg-floating-menu rg-combobox-menu" onfocusout={focusout}>
      <div id={`${uid}-listbox`} role="listbox" aria-label={label}>
      {#if loading}<div class="rg-combobox-state">Optionen werden geladen …</div>
      {:else if filtered.length}
        {#each filtered as option, index}
          <button
            type="button"
            id={`${uid}-option-${index}`}
            class="rg-combobox-option"
            role="option"
            aria-selected={option.value === value}
            data-active={index === activeIndex}
            disabled={option.disabled}
            onmousedown={(event) => event.preventDefault()}
            onclick={() => choose(option)}
          >
            <span><strong>{option.label}</strong>{#if option.description}<small>{option.description}</small>{/if}</span>
            {#if option.value === value}<Check size={15} aria-hidden="true" />{/if}
          </button>
        {/each}
      {:else}<div class="rg-combobox-state">{emptyLabel}</div>{/if}
      </div>
    </FloatingMenu>
  {/if}
</div>
