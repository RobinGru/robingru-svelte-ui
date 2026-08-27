<script lang="ts">
  import { Check, ChevronDown, ChevronRight, Minus } from '@lucide/svelte';
  import { tick, type Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { TreeNode } from '../../types.js';

  type Props = Omit<HTMLAttributes<HTMLUListElement>, 'onselect'> & {
    nodes: TreeNode[];
    selected?: string;
    expanded?: string[];
    checked?: string[];
    label?: string;
    checkable?: boolean;
    item?: Snippet<[TreeNode]>;
    onselect?: (node: TreeNode) => void;
    oncheck?: (checked: string[]) => void;
    onexpand?: (expanded: string[]) => void;
  };

  let { nodes, selected = $bindable(''), expanded = $bindable([]), checked = $bindable([]), label = 'Baumansicht', checkable = false, item, onselect, oncheck, onexpand, class: className, ...rest }: Props = $props();
  const uid = $props.id();

  function safe(id: string) { return id.replace(/[^a-zA-Z0-9_-]/g, '-'); }
  function flatten(items: TreeNode[], parent?: string, level = 1): Array<{ node: TreeNode; parent?: string; level: number }> {
    return items.flatMap((node) => [{ node, parent, level }, ...(node.children?.length && expanded.includes(node.id) ? flatten(node.children, node.id, level + 1) : [])]);
  }
  let visible = $derived(flatten(nodes));

  function toggle(node: TreeNode) {
    if (!node.children?.length) return;
    expanded = expanded.includes(node.id) ? expanded.filter((id) => id !== node.id) : [...expanded, node.id];
    onexpand?.(expanded);
  }
  function select(node: TreeNode) {
    if (node.disabled) return;
    selected = node.id; onselect?.(node);
  }
  function toggleCheck(node: TreeNode) {
    if (node.disabled) return;
    checked = checked.includes(node.id) ? checked.filter((id) => id !== node.id) : [...checked, node.id];
    oncheck?.(checked);
  }
  async function focus(id: string) {
    await tick(); document.getElementById(`${uid}-tree-${safe(id)}`)?.focus();
  }
  function keydown(event: KeyboardEvent, node: TreeNode) {
    const index = visible.findIndex((entry) => entry.node.id === node.id);
    const entry = visible[index];
    if (event.key === 'ArrowDown' && visible[index + 1]) { event.preventDefault(); void focus(visible[index + 1].node.id); }
    if (event.key === 'ArrowUp' && visible[index - 1]) { event.preventDefault(); void focus(visible[index - 1].node.id); }
    if (event.key === 'Home' && visible[0]) { event.preventDefault(); void focus(visible[0].node.id); }
    if (event.key === 'End' && visible.at(-1)) { event.preventDefault(); void focus(visible.at(-1)!.node.id); }
    if (event.key === 'ArrowRight' && node.children?.length) {
      event.preventDefault();
      if (!expanded.includes(node.id)) toggle(node); else if (node.children[0]) void focus(node.children[0].id);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if (expanded.includes(node.id)) toggle(node); else if (entry?.parent) void focus(entry.parent);
    }
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); checkable ? toggleCheck(node) : select(node); }
  }
</script>

{#snippet branches(items: TreeNode[], level = 1)}
  {#each items as node}
    <li role="none">
      <div
        id={`${uid}-tree-${safe(node.id)}`}
        class="rg-tree-row"
        role="treeitem"
        aria-level={level}
        aria-expanded={node.children?.length ? expanded.includes(node.id) : undefined}
        aria-selected={selected === node.id}
        aria-disabled={node.disabled || undefined}
        data-selected={selected === node.id}
        tabindex={selected === node.id || (!selected && visible[0]?.node.id === node.id) ? 0 : -1}
        onclick={() => select(node)}
        onkeydown={(event) => keydown(event, node)}
      >
        {#if node.children?.length}
          <button type="button" class="rg-tree-toggle" aria-label={expanded.includes(node.id) ? `${node.label} einklappen` : `${node.label} aufklappen`} tabindex="-1" onclick={(event) => { event.stopPropagation(); toggle(node); }}>
            {#if expanded.includes(node.id)}<ChevronDown size={15} />{:else}<ChevronRight size={15} />{/if}
          </button>
        {:else}<span class="rg-tree-spacer"></span>{/if}
        {#if checkable}
          <button type="button" class="rg-tree-check" role="checkbox" aria-checked={checked.includes(node.id)} aria-label={`${node.label} auswählen`} tabindex="-1" onclick={(event) => { event.stopPropagation(); toggleCheck(node); }}>
            {#if checked.includes(node.id)}<Check size={12} />{:else}<Minus size={12} opacity="0" />{/if}
          </button>
        {/if}
        <span class="rg-tree-label">
          {#if item}{@render item(node)}{:else}<strong>{node.label}</strong>{#if node.description}<small>{node.description}</small>{/if}{/if}
        </span>
      </div>
      {#if node.children?.length && expanded.includes(node.id)}
        <ul role="group">{@render branches(node.children, level + 1)}</ul>
      {/if}
    </li>
  {/each}
{/snippet}

<ul {...rest} class={cn('rg-tree', className)} role="tree" aria-label={label} aria-multiselectable={checkable || undefined}>
  {@render branches(nodes)}
</ul>
