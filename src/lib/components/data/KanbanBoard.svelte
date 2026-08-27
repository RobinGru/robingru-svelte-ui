<script lang="ts">
  import { ArrowLeft, ArrowRight, GripVertical } from '@lucide/svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { KanbanCard, KanbanColumn } from '../../types.js';
  import Avatar from '../foundation/Avatar.svelte';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onchange'> & {
    columns?: KanbanColumn[];
    label?: string;
    readonly?: boolean;
    emptyLabel?: string;
    onchange?: (columns: KanbanColumn[]) => void;
    onmove?: (card: KanbanCard, from: string, to: string) => void;
  };

  let { columns = $bindable([]), label = 'Kanban-Board', readonly = false, emptyLabel = 'Keine Karten', onchange, onmove, class: className, ...rest }: Props = $props();
  let dragged = $state<{ cardId: string; from: string }>();
  let status = $state('');

  function move(cardId: string, from: string, to: string) {
    if (readonly || from === to) return;
    const source = columns.find((column) => column.id === from);
    const target = columns.find((column) => column.id === to);
    const card = source?.cards.find((item) => item.id === cardId);
    if (!source || !target || !card || (target.limit && target.cards.length >= target.limit)) {
      status = target?.limit ? `${target.title} hat sein Limit erreicht.` : 'Karte konnte nicht verschoben werden.'; return;
    }
    columns = columns.map((column) => column.id === from ? { ...column, cards: column.cards.filter((item) => item.id !== cardId) } : column.id === to ? { ...column, cards: [...column.cards, card] } : column);
    status = `${card.title} wurde nach ${target.title} verschoben.`; onchange?.(columns); onmove?.(card, from, to);
  }
  function adjacent(columnId: string, direction: -1 | 1) {
    const index = columns.findIndex((column) => column.id === columnId); return columns[index + direction];
  }
  function drop(event: DragEvent, target: string) {
    event.preventDefault(); if (dragged) move(dragged.cardId, dragged.from, target); dragged = undefined;
  }
</script>

<div {...rest} class={cn('rg-kanban', className)} role="region" aria-label={label}>
  <div class="rg-sr-only" aria-live="polite">{status}</div>
  {#each columns as column}
    <section class="rg-kanban-column" role="group" aria-label={column.title} data-tone={column.tone ?? 'neutral'} ondragover={(event) => event.preventDefault()} ondrop={(event) => drop(event, column.id)}>
      <header><div><span class="rg-kanban-dot"></span><strong>{column.title}</strong></div><span>{column.cards.length}{#if column.limit} / {column.limit}{/if}</span></header>
      <div class="rg-kanban-list" role="list" aria-label={`${column.title}: ${column.cards.length} Karten`}>
        {#each column.cards as card}
          <article class="rg-kanban-card" role="listitem" draggable={!readonly} ondragstart={() => dragged = { cardId: card.id, from: column.id }} ondragend={() => dragged = undefined}>
            <div class="rg-kanban-card-head"><GripVertical size={15} aria-hidden="true" /><strong>{card.title}</strong></div>
            {#if card.description}<p>{card.description}</p>{/if}
            {#if card.tags?.length}<div class="rg-kanban-tags">{#each card.tags as tag}<span>{tag}</span>{/each}</div>{/if}
            <footer>
              <span>{card.meta ?? ''}</span>
              {#if card.assignee}<Avatar name={card.assignee} size="xs" />{/if}
              {#if !readonly}
                <span class="rg-kanban-move">
                  <button type="button" aria-label={`${card.title} nach links verschieben`} disabled={!adjacent(column.id, -1)} onclick={() => adjacent(column.id, -1) && move(card.id, column.id, adjacent(column.id, -1)!.id)}><ArrowLeft size={13} /></button>
                  <button type="button" aria-label={`${card.title} nach rechts verschieben`} disabled={!adjacent(column.id, 1)} onclick={() => adjacent(column.id, 1) && move(card.id, column.id, adjacent(column.id, 1)!.id)}><ArrowRight size={13} /></button>
                </span>
              {/if}
            </footer>
          </article>
        {/each}
        {#if !column.cards.length}<div class="rg-kanban-empty">{emptyLabel}</div>{/if}
      </div>
    </section>
  {/each}
</div>
