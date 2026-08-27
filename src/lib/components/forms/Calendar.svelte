<script lang="ts">
  import { ChevronLeft, ChevronRight } from '@lucide/svelte';
  import { tick } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onchange'> & {
    value?: string;
    label?: string;
    locale?: string;
    min?: string;
    max?: string;
    weekStartsOn?: 0 | 1;
    disabled?: boolean;
    onchange?: (value: string) => void;
  };

  let { value = $bindable(''), label = 'Kalender', locale = 'de-DE', min, max, weekStartsOn = 1, disabled = false, onchange, class: className, ...rest }: Props = $props();
  const uid = $props.id();

  function parse(value?: string) {
    if (!value) return new Date();
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  function iso(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
  function addDays(date: Date, amount: number) {
    const next = new Date(date); next.setDate(next.getDate() + amount); return next;
  }
  function addMonths(date: Date, amount: number) {
    const target = new Date(date.getFullYear(), date.getMonth() + amount, 1);
    const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
    return new Date(target.getFullYear(), target.getMonth(), Math.min(date.getDate(), lastDay));
  }

  let month = $state(new Date(parse(value).getFullYear(), parse(value).getMonth(), 1));
  let focused = $state(value || iso(new Date()));
  let monthLabel = $derived(new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(month));
  let weekdays = $derived(Array.from({ length: 7 }, (_, index) => {
    const day = new Date(2026, 7, 2 + ((index + weekStartsOn) % 7));
    return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(day);
  }));
  let days = $derived.by(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const offset = (first.getDay() - weekStartsOn + 7) % 7;
    const start = addDays(first, -offset);
    return Array.from({ length: 42 }, (_, index) => addDays(start, index));
  });

  function unavailable(date: Date) {
    const current = iso(date);
    return disabled || Boolean(min && current < min) || Boolean(max && current > max);
  }
  function select(date: Date) {
    if (unavailable(date)) return;
    value = iso(date); focused = value; month = new Date(date.getFullYear(), date.getMonth(), 1); onchange?.(value);
  }
  async function focusDate(date: Date) {
    focused = iso(date); month = new Date(date.getFullYear(), date.getMonth(), 1); await tick();
    document.getElementById(`${uid}-${focused}`)?.focus();
  }
  function keydown(event: KeyboardEvent, date: Date) {
    let next: Date | undefined;
    if (event.key === 'ArrowLeft') next = addDays(date, -1);
    if (event.key === 'ArrowRight') next = addDays(date, 1);
    if (event.key === 'ArrowUp') next = addDays(date, -7);
    if (event.key === 'ArrowDown') next = addDays(date, 7);
    if (event.key === 'Home') next = addDays(date, -((date.getDay() - weekStartsOn + 7) % 7));
    if (event.key === 'End') next = addDays(date, 6 - ((date.getDay() - weekStartsOn + 7) % 7));
    if (event.key === 'PageUp') next = addMonths(date, -1);
    if (event.key === 'PageDown') next = addMonths(date, 1);
    if (next) { event.preventDefault(); void focusDate(next); }
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(date); }
  }
  function changeMonth(amount: number) {
    month = new Date(month.getFullYear(), month.getMonth() + amount, 1);
    focused = iso(month);
  }
</script>

<div {...rest} class={cn('rg-calendar', className)} aria-label={label}>
  <div class="rg-calendar-header">
    <button type="button" class="rg-button" data-size="sm" data-variant="ghost" aria-label="Vorheriger Monat" disabled={disabled} onclick={() => changeMonth(-1)}><ChevronLeft size={17} /></button>
    <strong aria-live="polite">{monthLabel}</strong>
    <button type="button" class="rg-button" data-size="sm" data-variant="ghost" aria-label="Nächster Monat" disabled={disabled} onclick={() => changeMonth(1)}><ChevronRight size={17} /></button>
  </div>
  <div class="rg-calendar-grid" role="grid" aria-label={monthLabel}>
    <div class="rg-calendar-week" role="row">{#each weekdays as weekday}<span role="columnheader" aria-label={weekday}>{weekday}</span>{/each}</div>
    {#each Array.from({ length: 6 }) as _, week}
      <div class="rg-calendar-week" role="row">
        {#each days.slice(week * 7, week * 7 + 7) as day}
          <button
            type="button"
            id={`${uid}-${iso(day)}`}
            role="gridcell"
            aria-label={new Intl.DateTimeFormat(locale, { dateStyle: 'full' }).format(day)}
            aria-selected={iso(day) === value}
            data-outside={day.getMonth() !== month.getMonth()}
            data-today={iso(day) === iso(new Date())}
            tabindex={iso(day) === focused ? 0 : -1}
            disabled={unavailable(day)}
            onclick={() => select(day)}
            onfocus={() => focused = iso(day)}
            onkeydown={(event) => keydown(event, day)}
          >{day.getDate()}</button>
        {/each}
      </div>
    {/each}
  </div>
  <button type="button" class="rg-calendar-today" disabled={unavailable(new Date())} onclick={() => select(new Date())}>Heute</button>
</div>
