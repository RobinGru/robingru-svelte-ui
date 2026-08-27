<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { MentionOption } from '../../types.js';
  import Avatar from '../foundation/Avatar.svelte';
  import FloatingMenu from '../internal/FloatingMenu.svelte';

  type Props = Omit<HTMLTextareaAttributes, 'value' | 'onchange'> & {
    value?: string;
    suggestions: MentionOption[];
    label?: string;
    trigger?: string;
    emptyLabel?: string;
    invalid?: boolean;
    onchange?: (value: string) => void;
    onmention?: (mention: MentionOption) => void;
  };

  let { value = $bindable(''), suggestions, label = 'Text mit Erwähnungen', trigger = '@', emptyLabel = 'Keine Treffer', invalid = false, onchange, onmention, class: className, ...rest }: Props = $props();
  const uid = $props.id();
  let textarea: HTMLTextAreaElement | undefined;
  let root = $state<HTMLElement | undefined>();
  let caret = $state(0);
  let open = $state(false);
  let activeIndex = $state(0);

  let context = $derived.by(() => {
    const before = value.slice(0, caret);
    const index = before.lastIndexOf(trigger);
    if (index < 0 || /\s/.test(before.slice(index + trigger.length))) return null;
    return { index, query: before.slice(index + trigger.length).toLocaleLowerCase() };
  });
  let matches = $derived(context ? suggestions.filter((item) => `${item.label} ${item.value}`.toLocaleLowerCase().includes(context!.query)) : []);

  function update(event: Event) {
    const input = event.currentTarget as HTMLTextAreaElement;
    value = input.value; caret = input.selectionStart; open = Boolean(context); activeIndex = 0; onchange?.(value);
  }
  function syncCaret(event: Event) {
    caret = (event.currentTarget as HTMLTextAreaElement).selectionStart;
    open = Boolean(context);
  }
  function choose(item: MentionOption) {
    if (!context || item.disabled) return;
    const insertion = `${trigger}${item.value} `;
    value = `${value.slice(0, context.index)}${insertion}${value.slice(caret)}`;
    caret = context.index + insertion.length; open = false; onchange?.(value); onmention?.(item);
    queueMicrotask(() => { textarea?.focus(); textarea?.setSelectionRange(caret, caret); });
  }
  function keydown(event: KeyboardEvent) {
    if (!open) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); const direction = event.key === 'ArrowDown' ? 1 : -1; activeIndex = (activeIndex + direction + Math.max(matches.length, 1)) % Math.max(matches.length, 1);
    } else if ((event.key === 'Enter' || event.key === 'Tab') && matches[activeIndex]) {
      event.preventDefault(); choose(matches[activeIndex]);
    } else if (event.key === 'Escape') { event.preventDefault(); open = false; }
  }
</script>

<div bind:this={root} class={cn('rg-mention', className)} data-open={open}>
  <textarea {...rest} bind:this={textarea} class="rg-textarea" {value} aria-label={label} aria-invalid={invalid || undefined} aria-controls={open ? `${uid}-mentions` : undefined} oninput={update} onkeyup={syncCaret} onclick={syncCaret} onkeydown={keydown}></textarea>
  {#if open}
    <FloatingMenu anchor={root} class="rg-floating-menu rg-mention-menu">
      <div id={`${uid}-mentions`} role="listbox" aria-label="Erwähnungen">
      {#if matches.length}
        {#each matches as item, index}
          <button type="button" role="option" aria-selected={index === activeIndex} data-active={index === activeIndex} disabled={item.disabled} onmousedown={(event) => event.preventDefault()} onclick={() => choose(item)}>
            <Avatar src={item.avatar} name={item.label} initials={item.initials} size="xs" />
            <span><strong>{item.label}</strong><small>{item.description ?? `${trigger}${item.value}`}</small></span>
          </button>
        {/each}
      {:else}<div class="rg-combobox-state">{emptyLabel}</div>{/if}
      </div>
    </FloatingMenu>
  {/if}
</div>
