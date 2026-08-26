<script lang="ts">
  import { Check, Copy } from '@lucide/svelte';
  import { IconButton } from '$lib';

  type Props = {
    code: string;
    language?: string;
    filename?: string;
    title?: string;
  };

  let { code, language = 'svelte', filename, title }: Props = $props();
  let copied = $state(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      window.setTimeout(() => copied = false, 1400);
    } catch {
      copied = false;
    }
  }
</script>

<div class="docs-code-panel">
  <header>
    <div>{#if title}<strong>{title}</strong>{/if}{#if filename}<span>{filename}</span>{/if}<small>{language}</small></div>
    <IconButton label="Code kopieren" size="sm" variant="ghost" onclick={copy}>
      {#if copied}<Check size={15} />{:else}<Copy size={15} />{/if}
    </IconButton>
  </header>
  <pre><code>{code}</code></pre>
</div>
