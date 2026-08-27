<script lang="ts">
  import { File, FileCode2, FileJson, Folder, FolderOpen } from '@lucide/svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { FileTreeNode, TreeNode } from '../../types.js';
  import TreeView from './TreeView.svelte';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onselect'> & {
    nodes: FileTreeNode[];
    selected?: string;
    expanded?: string[];
    label?: string;
    onselect?: (node: FileTreeNode) => void;
    onopen?: (node: FileTreeNode) => void;
  };

  let { nodes, selected = $bindable(''), expanded = $bindable([]), label = 'Dateien', onselect, onopen, class: className, ...rest }: Props = $props();
  function icon(node: FileTreeNode) {
    if (node.kind === 'folder') return expanded.includes(node.id) ? FolderOpen : Folder;
    if (node.label.endsWith('.json')) return FileJson;
    if (/\.(svelte|ts|js|css)$/.test(node.label)) return FileCode2;
    return File;
  }
  function selectNode(node: FileTreeNode) {
    onselect?.(node);
    if (node.kind === 'file') onopen?.(node);
  }
</script>

{#snippet fileLabel(node: TreeNode)}
  {@const fileNode = node as FileTreeNode}
  {@const Icon = icon(fileNode)}
  <span class="rg-file-tree-label"><Icon size={15} aria-hidden="true" /><span><strong>{fileNode.label}</strong>{#if fileNode.modified}<small>{fileNode.modified}</small>{/if}</span></span>
{/snippet}

<div {...rest} class={cn('rg-file-tree', className)}>
  <TreeView nodes={nodes} bind:selected bind:expanded {label} item={fileLabel} onselect={(node) => selectNode(node as FileTreeNode)} />
</div>
