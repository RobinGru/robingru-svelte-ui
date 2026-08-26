<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    eyebrow?: string;
    title: string;
    description?: string;
    actions?: Snippet;
  };
  let { eyebrow, title, description, actions }: Props = $props();
</script>

<header class="docs-section-intro">
  <div>
    {#if eyebrow}<span class="docs-eyebrow">{eyebrow}</span>{/if}
    <h1>{title}</h1>
    {#if description}<p>{description}</p>{/if}
  </div>
  {#if actions}<div class="docs-section-actions">{@render actions()}</div>{/if}
</header>
