<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import { Button, ErrorState } from '$lib';
</script>

<svelte:head><title>{page.status} · RobinGru Svelte UI</title></svelte:head>

<div class="docs-error-page">
  <ErrorState
    title={page.status === 404 ? 'Seite nicht gefunden' : 'Diese Seite konnte nicht geladen werden'}
    description={page.status === 404 ? 'Der gesuchte Komponenten- oder Demo-Link existiert nicht.' : page.error?.message ?? 'Bitte zur Übersicht zurückkehren.'}
  >
    {#snippet actions()}<Button onclick={() => window.location.href = `${base}/`}>Zur Übersicht</Button>{/snippet}
  </ErrorState>
</div>
