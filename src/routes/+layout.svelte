<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';
  import { page } from '$app/state';
  import DocsShell from '$docs/components/DocsShell.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<a class="docs-skip-link" href="#main-content">Zum Hauptinhalt springen</a>
<DocsShell routeId={page.route.id} componentSlug={page.params.slug}>
  {@render children()}
</DocsShell>
