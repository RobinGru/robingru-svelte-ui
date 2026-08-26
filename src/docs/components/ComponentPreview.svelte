<script lang="ts">
  import type { Component } from 'svelte';
  import * as UI from '$lib';
  import { previewFor } from '../preview-config.js';

  type Props = {
    name: string;
  };

  let { name }: Props = $props();
  let commandOpen = $state(false);
  const demoToaster = UI.createToaster();

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
    { id: 'components', label: 'Komponenten öffnen', description: 'Alle 116 Live-Previews', shortcut: 'G C' },
    { id: 'dashboard', label: 'Dashboard-Demo öffnen', description: 'KPIs, Filter und Charts', shortcut: 'G D' },
    { id: 'tokens', label: 'Tokens ansehen', description: 'Farben, Radien und Typografie', shortcut: 'G T' }
  ];

  function showToast() {
    demoToaster.push({
      title: 'Änderungen gespeichert',
      description: 'Die Vorschau verwendet den RobinGru ToastViewport.',
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
