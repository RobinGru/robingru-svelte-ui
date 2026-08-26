<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { Check, Copy } from '@lucide/svelte';
  import { cn } from '../../internal/cn.js';

  type Props = HTMLAttributes<HTMLElement> & {
    code: string;
    language?: string;
    filename?: string;
    lineNumbers?: boolean;
    highlightLines?: number[];
    wrap?: boolean;
    copyLabel?: string;
  };

  let {
    code,
    language,
    filename,
    lineNumbers = false,
    highlightLines = [],
    wrap = false,
    copyLabel = 'Code kopieren',
    class: className,
    ...rest
  }: Props = $props();

  let copied = $state(false);
  let lines = $derived(code.replace(/\n$/, '').split('\n'));

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      window.setTimeout(() => copied = false, 1500);
    } catch {
      copied = false;
    }
  }
</script>

<section {...rest} class={cn('rg-code-block', className)}>
  <header class="rg-code-header">
    <div class="rg-code-meta">
      {#if filename}<strong>{filename}</strong>{/if}
      {#if language}<span>{language}</span>{/if}
    </div>
    <button type="button" class="rg-code-copy" onclick={copy} aria-label={copyLabel}>
      {#if copied}<Check size={15} aria-hidden="true" /> Kopiert{:else}<Copy size={15} aria-hidden="true" /> Kopieren{/if}
    </button>
  </header>
  <pre class="rg-code-pre" data-wrap={wrap}><code>{#if lineNumbers}{#each lines as line, index}<span class="rg-code-line" data-highlight={highlightLines.includes(index + 1)}><span class="rg-code-number" aria-hidden="true">{index + 1}</span><span>{line}</span></span>{/each}{:else}{code}{/if}</code></pre>
</section>
