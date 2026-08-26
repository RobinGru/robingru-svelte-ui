<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import {
    ArrowDown,
    ArrowUp,
    CheckSquare2,
    ChevronsUpDown,
    Columns3,
    Search,
    X
  } from '@lucide/svelte';
  import { cn } from '../../internal/cn.js';
  import type {
    DataTableColumn,
    DataTableRowId,
    TableDensity
  } from '../../types.js';
  import Pagination from '../navigation/Pagination.svelte';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    columns: DataTableColumn[];
    rows: Record<string, unknown>[];
    rowId?: string | ((row: Record<string, unknown>, index: number) => DataTableRowId);
    searchable?: boolean;
    searchPlaceholder?: string;
    pageSize?: number;
    pageSizeOptions?: number[];
    emptyLabel?: string;
    caption?: string;
    selectable?: boolean;
    selected?: DataTableRowId[];
    stickyHeader?: boolean;
    striped?: boolean;
    hover?: boolean;
    density?: TableDensity;
    maxHeight?: string;
    showColumnPicker?: boolean;
    showPageSize?: boolean;
    loading?: boolean;
    cell?: Snippet<[unknown, Record<string, unknown>, DataTableColumn]>;
    rowActions?: Snippet<[Record<string, unknown>]>;
    onrowclick?: (row: Record<string, unknown>) => void;
    onselectionchange?: (selected: DataTableRowId[]) => void;
  };

  let {
    columns,
    rows,
    rowId = 'id',
    searchable = true,
    searchPlaceholder = 'Tabelle durchsuchen …',
    pageSize = $bindable(10),
    pageSizeOptions = [10, 25, 50],
    emptyLabel = 'Keine Einträge gefunden',
    caption = 'Datentabelle',
    selectable = false,
    selected = $bindable([]),
    stickyHeader = true,
    striped = false,
    hover = true,
    density = 'comfortable',
    maxHeight,
    showColumnPicker = true,
    showPageSize = true,
    loading = false,
    cell,
    rowActions,
    onrowclick,
    onselectionchange,
    class: className,
    ...rest
  }: Props = $props();

  let query = $state('');
  let sortKey = $state('');
  let sortDirection = $state<'asc' | 'desc'>('asc');
  let page = $state(1);
  let filters = $state<Record<string, string>>({});
  let hiddenColumnOverrides = $state<Record<string, boolean>>({});
  let selectAllInput = $state<HTMLInputElement | undefined>(undefined);

  let hiddenColumns = $derived.by(() => {
    const hidden = columns
      .filter((column) => hiddenColumnOverrides[column.key] ?? Boolean(column.hidden))
      .map((column) => column.key);

    // Always keep one data column visible, even if all columns arrive hidden.
    if (columns.length && hidden.length >= columns.length) {
      return hidden.filter((key) => key !== columns[0].key);
    }

    return hidden;
  });
  let visibleColumns = $derived(columns.filter((column) => !hiddenColumns.includes(column.key)));
  let filterableColumns = $derived(columns.filter((column) => column.filterOptions?.length));
  let activeFilterCount = $derived(
    Number(Boolean(query.trim())) + Object.values(filters).filter(Boolean).length
  );

  let filtered = $derived.by(() => {
    const term = query.trim().toLocaleLowerCase('de');
    let list = rows.filter((row) => {
      const matchesSearch = !term || columns
        .filter((column) => column.searchable !== false)
        .some((column) => String(row[column.key] ?? '').toLocaleLowerCase('de').includes(term));

      if (!matchesSearch) return false;

      return Object.entries(filters).every(([key, filterValue]) => {
        if (!filterValue) return true;
        return String(row[key] ?? '') === filterValue;
      });
    });

    if (sortKey) {
      list = [...list].sort((a, b) => {
        const left = a[sortKey];
        const right = b[sortKey];
        const result = typeof left === 'number' && typeof right === 'number'
          ? left - right
          : String(left ?? '').localeCompare(String(right ?? ''), 'de', {
              numeric: true,
              sensitivity: 'base'
            });
        return sortDirection === 'asc' ? result : -result;
      });
    }

    return list;
  });

  let pageCount = $derived(Math.max(1, Math.ceil(filtered.length / Math.max(1, pageSize))));
  let visibleRows = $derived(filtered.slice((page - 1) * pageSize, page * pageSize));
  let visibleIds = $derived(visibleRows.map((row, index) => getRowId(row, (page - 1) * pageSize + index)));
  let allVisibleSelected = $derived(Boolean(visibleIds.length) && visibleIds.every((id) => selected.includes(id)));
  let someVisibleSelected = $derived(visibleIds.some((id) => selected.includes(id)) && !allVisibleSelected);

  $effect(() => {
    query;
    sortKey;
    sortDirection;
    pageSize;
    JSON.stringify(filters);
    page = 1;
  });

  $effect(() => {
    if (page > pageCount) page = pageCount;
  });

  $effect(() => {
    if (selectAllInput) selectAllInput.indeterminate = someVisibleSelected;
  });

  function getRowId(row: Record<string, unknown>, index: number): DataTableRowId {
    if (typeof rowId === 'function') return rowId(row, index);
    const value = row[rowId];
    return typeof value === 'string' || typeof value === 'number' ? value : index;
  }

  function sort(column: DataTableColumn) {
    if (!column.sortable) return;
    if (sortKey === column.key) sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    else {
      sortKey = column.key;
      sortDirection = 'asc';
    }
  }

  function setFilter(key: string, value: string) {
    const next = { ...filters };
    if (value) next[key] = value;
    else delete next[key];
    filters = next;
  }

  function clearFilters() {
    query = '';
    filters = {};
  }

  function toggleColumn(key: string) {
    const hidden = hiddenColumns.includes(key);
    if (!hidden && visibleColumns.length <= 1) return;
    hiddenColumnOverrides = { ...hiddenColumnOverrides, [key]: !hidden };
  }

  function updateSelection(next: DataTableRowId[]) {
    selected = next;
    onselectionchange?.(selected);
  }

  function toggleRow(id: DataTableRowId, checked: boolean) {
    updateSelection(checked
      ? [...new Set([...selected, id])]
      : selected.filter((item) => item !== id));
  }

  function toggleVisible(checked: boolean) {
    if (checked) updateSelection([...new Set([...selected, ...visibleIds])]);
    else updateSelection(selected.filter((id) => !visibleIds.includes(id)));
  }

  function activateRow(event: MouseEvent | KeyboardEvent, row: Record<string, unknown>) {
    if (!onrowclick) return;
    const target = event.target as HTMLElement;
    if (target.closest('button, a, input, select, textarea, details, summary')) return;
    if (event instanceof KeyboardEvent && !['Enter', ' '].includes(event.key)) return;
    if (event instanceof KeyboardEvent) event.preventDefault();
    onrowclick(row);
  }
</script>

<div {...rest} class={cn('rg-data-table', className)}>
  <div class="rg-data-toolbar">
    <div class="rg-data-toolbar-main">
      {#if searchable}
        <label class="rg-table-search">
          <span class="rg-sr-only">{searchPlaceholder}</span>
          <Search size={16} aria-hidden="true" />
          <input bind:value={query} placeholder={searchPlaceholder} />
          {#if query}<button type="button" aria-label="Suche löschen" onclick={() => query = ''}><X size={15} /></button>{/if}
        </label>
      {/if}

      {#each filterableColumns as column}
        <label class="rg-table-filter">
          <span>{column.filterLabel ?? column.label}</span>
          <select value={filters[column.key] ?? ''} onchange={(event) => setFilter(column.key, event.currentTarget.value)}>
            <option value="">Alle</option>
            {#each column.filterOptions ?? [] as option}<option value={option.value}>{option.label}</option>{/each}
          </select>
        </label>
      {/each}
    </div>

    <div class="rg-data-toolbar-actions">
      {#if activeFilterCount > 0}
        <button class="rg-button" data-size="sm" data-variant="ghost" type="button" onclick={clearFilters}>
          <X size={15} aria-hidden="true" /> Filter löschen
        </button>
      {/if}

      {#if showColumnPicker && columns.length > 2}
        <details class="rg-column-picker">
          <summary class="rg-button" data-size="sm" data-variant="outline"><Columns3 size={15} aria-hidden="true" /> Spalten</summary>
          <div class="rg-column-picker-menu">
            {#each columns as column}
              <label><input type="checkbox" checked={!hiddenColumns.includes(column.key)} disabled={!hiddenColumns.includes(column.key) && visibleColumns.length <= 1} onchange={() => toggleColumn(column.key)} />{column.label}</label>
            {/each}
          </div>
        </details>
      {/if}
    </div>
  </div>

  <div class="rg-table-wrap" data-sticky={stickyHeader} style:max-height={maxHeight}>
    <table class="rg-table" data-striped={striped} data-hoverable={hover} data-density={density} aria-label={caption}>
      <caption class="rg-sr-only">{caption}</caption>
      <thead>
        <tr>
          {#if selectable}
            <th class="rg-table-select">
              <input
                bind:this={selectAllInput}
                type="checkbox"
                checked={allVisibleSelected}
                aria-label="Sichtbare Zeilen auswählen"
                aria-checked={someVisibleSelected ? 'mixed' : allVisibleSelected}
                onchange={(event) => toggleVisible(event.currentTarget.checked)}
              />
            </th>
          {/if}
          {#each visibleColumns as column}
            <th style:width={column.width} style:min-width={column.minWidth} data-align={column.align ?? 'start'}>
              {#if column.sortable}
                <button class="rg-sort-button" type="button" onclick={() => sort(column)} aria-label={`${column.label} sortieren`}>
                  <span>{column.label}</span>
                  {#if sortKey !== column.key}<ChevronsUpDown size={14} aria-hidden="true" />{:else if sortDirection === 'asc'}<ArrowUp size={14} aria-hidden="true" />{:else}<ArrowDown size={14} aria-hidden="true" />{/if}
                </button>
              {:else}{column.label}{/if}
            </th>
          {/each}
          {#if rowActions}<th class="rg-table-actions"><span class="rg-sr-only">Aktionen</span></th>{/if}
        </tr>
      </thead>
      <tbody>
        {#if loading}
          {#each Array(Math.min(pageSize, 6)) as _}
            <tr aria-hidden="true">
              {#if selectable}<td><span class="rg-skeleton rg-table-skeleton-check"></span></td>{/if}
              {#each visibleColumns as _}<td><span class="rg-skeleton rg-table-skeleton-line"></span></td>{/each}
              {#if rowActions}<td><span class="rg-skeleton rg-table-skeleton-action"></span></td>{/if}
            </tr>
          {/each}
        {:else if visibleRows.length}
          {#each visibleRows as row, rowIndex}
            {@const absoluteIndex = (page - 1) * pageSize + rowIndex}
            {@const id = getRowId(row, absoluteIndex)}
            <tr
              data-selected={selected.includes(id)}
              data-clickable={Boolean(onrowclick)}
              tabindex={onrowclick ? 0 : undefined}
              onclick={(event) => activateRow(event, row)}
              onkeydown={(event) => activateRow(event, row)}
            >
              {#if selectable}
                <td class="rg-table-select"><input type="checkbox" checked={selected.includes(id)} aria-label={`Zeile ${absoluteIndex + 1} auswählen`} onchange={(event) => toggleRow(id, event.currentTarget.checked)} /></td>
              {/if}
              {#each visibleColumns as column}
                <td data-align={column.align ?? 'start'}>
                  {#if cell}{@render cell(row[column.key], row, column)}{:else}{column.format ? column.format(row[column.key], row) : String(row[column.key] ?? '—')}{/if}
                </td>
              {/each}
              {#if rowActions}<td class="rg-table-actions">{@render rowActions(row)}</td>{/if}
            </tr>
          {/each}
        {:else}
          <tr><td class="rg-table-empty" colspan={visibleColumns.length + Number(selectable) + Number(Boolean(rowActions))}>{emptyLabel}</td></tr>
        {/if}
      </tbody>
    </table>
  </div>

  <footer class="rg-data-footer">
    <div class="rg-data-summary">
      {#if selected.length}<span><CheckSquare2 size={15} aria-hidden="true" /> {selected.length} ausgewählt</span>{/if}
      <span>{filtered.length} {filtered.length === 1 ? 'Eintrag' : 'Einträge'}</span>
    </div>
    <div class="rg-data-pagination">
      {#if showPageSize}
        <label class="rg-page-size"><span>Zeilen</span><select bind:value={pageSize}>{#each pageSizeOptions as option}<option value={option}>{option}</option>{/each}</select></label>
      {/if}
      <Pagination bind:page total={pageCount} />
    </div>
  </footer>
</div>
