<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import * as UI from '$lib';
  import type { FileTreeNode, KanbanColumn, MentionOption, Option, TreeNode } from '$lib';
  import { previewFor } from '../preview-config.js';

  type Props = {
    name: string;
  };

  let { name }: Props = $props();
  let commandOpen = $state(false);
  const demoToaster = UI.createToaster();

  const comboboxConfig = previewFor('Combobox').props;
  const multiSelectConfig = previewFor('MultiSelect').props;
  const mentionConfig = previewFor('MentionInput').props;
  const treeConfig = previewFor('TreeView').props;
  const fileTreeConfig = previewFor('FileTree').props;
  const panelConfig = previewFor('ResizablePanels').props;
  const transferConfig = previewFor('TransferList').props;
  const kanbanConfig = previewFor('KanbanBoard').props;
  let comboboxValue = $state(String(comboboxConfig.value ?? ''));
  let multiSelectValues = $state([...(multiSelectConfig.values as string[])]);
  let calendarValue = $state('2026-08-27');
  let inlineEditValue = $state('RobinGru Workspace');
  let mentionValue = $state(String(mentionConfig.value ?? ''));
  let treeSelected = $state(String(treeConfig.selected ?? ''));
  let treeExpanded = $state([...(treeConfig.expanded as string[])]);
  let treeChecked = $state([...(treeConfig.checked as string[])]);
  let fileSelected = $state(String(fileTreeConfig.selected ?? ''));
  let fileExpanded = $state([...(fileTreeConfig.expanded as string[])]);
  let panelValue = $state(Number(panelConfig.value ?? 50));
  let transferValue = $state([...(transferConfig.value as string[])]);
  let kanbanColumns = $state(structuredClone(kanbanConfig.columns as KanbanColumn[]));

  const ui = UI as unknown as Record<string, unknown>;
  let Preview = $derived(ui[name] as Component<Record<string, unknown>> | undefined);
  let config = $derived(previewFor(name));

  const tabItems = [
    { value: 'overview', label: 'Übersicht' },
    { value: 'activity', label: 'Aktivität' },
    { value: 'settings', label: 'Einstellungen' }
  ];
  const listItems = ['Design Tokens', 'Komponenten', 'Patterns'];
  const commandItems = [
    { id: 'components', label: 'Komponenten öffnen', description: 'Alle 129 Live-Previews', shortcut: 'G C' },
    { id: 'dashboard', label: 'Dashboard-Demo öffnen', description: 'KPIs, Filter und Charts', shortcut: 'G D' },
    { id: 'tokens', label: 'Tokens ansehen', description: 'Farben, Radien und Typografie', shortcut: 'G T' }
  ];

  function showToast() {
    demoToaster.push({
      title: 'Änderungen gespeichert',
      description: 'Die Vorschau verwendet den zentralen ToastViewport.',
      tone: 'success'
    });
  }
</script>

{#snippet tabContent(value: string)}
  <div class="docs-inline-panel">
    <strong>{tabItems.find((item) => item.value === value)?.label}</strong>
    <p>Der aktive Inhalt bleibt mit dem Tab semantisch verbunden.</p>
  </div>
{/snippet}

{#snippet listItem(item: unknown, index: number)}
  <span class="docs-list-number">{index + 1}</span>
  <span>{String(item)}</span>
{/snippet}

{#if name === 'Tabs'}
  <UI.Tabs value="overview" items={tabItems} content={tabContent} />
{:else if name === 'List'}
  <UI.List items={listItems} item={listItem} label="Dokumentationsbereiche" />
{:else if name === 'Combobox'}
  <UI.Combobox bind:value={comboboxValue} options={comboboxConfig.options as Option[]} label="Workspace-Typ" />
{:else if name === 'MultiSelect'}
  <UI.MultiSelect bind:values={multiSelectValues} options={multiSelectConfig.options as Option[]} label="Themen" />
{:else if name === 'Calendar'}
  <UI.Calendar bind:value={calendarValue} label="Veröffentlichungsdatum" />
{:else if name === 'InlineEdit'}
  <UI.InlineEdit bind:value={inlineEditValue} label="Projektname" required />
{:else if name === 'MentionInput'}
  <UI.MentionInput bind:value={mentionValue} suggestions={mentionConfig.suggestions as MentionOption[]} label="Kommentar" />
{:else if name === 'TreeView'}
  <UI.TreeView nodes={treeConfig.nodes as TreeNode[]} bind:selected={treeSelected} bind:expanded={treeExpanded} bind:checked={treeChecked} checkable />
{:else if name === 'FileTree'}
  <UI.FileTree nodes={fileTreeConfig.nodes as FileTreeNode[]} bind:selected={fileSelected} bind:expanded={fileExpanded} />
{:else if name === 'ResizablePanels'}
  <UI.ResizablePanels bind:value={panelValue} first={panelConfig.first as Snippet} second={panelConfig.second as Snippet} />
{:else if name === 'TransferList'}
  <UI.TransferList items={transferConfig.items as Option[]} bind:value={transferValue} availableLabel="Verfügbare Bereiche" selectedLabel="Zugewiesen" />
{:else if name === 'KanbanBoard'}
  <UI.KanbanBoard bind:columns={kanbanColumns} />
{:else if name === 'CommandPalette'}
  <UI.Button variant="outline" onclick={() => commandOpen = true}>Command Palette öffnen</UI.Button>
  <UI.CommandPalette bind:open={commandOpen} items={commandItems} placeholder="Aktion suchen …" />
{:else if name === 'ToastViewport'}
  <UI.Button variant="outline" onclick={showToast}>Toast anzeigen</UI.Button>
  <UI.ToastViewport toaster={demoToaster} />
{:else if Preview}
  <Preview {...config.props} />
{:else}
  <UI.ErrorState title="Vorschau nicht gefunden" description={`Für ${name} ist kein öffentlicher Export verfügbar.`} />
{/if}
