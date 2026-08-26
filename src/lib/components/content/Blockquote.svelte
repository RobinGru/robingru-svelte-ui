<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';

  type Props = Omit<HTMLAttributes<HTMLQuoteElement>, 'children'> & {
    children: Snippet;
    source?: string;
    cite?: string;
    href?: string;
    tone?: 'neutral' | 'primary';
  };

  let {
    children,
    source,
    cite,
    href,
    tone = 'neutral',
    class: className,
    ...rest
  }: Props = $props();
</script>

<blockquote {...rest} class={cn('rg-blockquote', className)} data-tone={tone} {cite}>
  <div class="rg-blockquote-body">{@render children()}</div>
  {#if source || cite}
    <footer class="rg-blockquote-source">
      {#if href}<a href={href}>{source ?? cite}</a>{:else}<span>{source ?? cite}</span>{/if}
    </footer>
  {/if}
</blockquote>
