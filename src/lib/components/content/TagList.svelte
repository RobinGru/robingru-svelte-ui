<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { ContentTag } from '../../types.js';

  type Props = HTMLAttributes<HTMLDivElement> & {
    tags: Array<string | ContentTag>;
    label?: string;
    size?: 'sm' | 'md';
  };

  let {
    tags,
    label = 'Schlagwörter',
    size = 'md',
    class: className,
    ...rest
  }: Props = $props();
</script>

<div {...rest} class={cn('rg-tag-list', className)} aria-label={label} data-size={size}>
  {#each tags as tag}
    {@const item = typeof tag === 'string' ? { label: tag } : tag}
    {#if item.href}
      <a class="rg-tag" data-tone={item.tone ?? 'neutral'} href={item.href}>{item.label}</a>
    {:else}
      <span class="rg-tag" data-tone={item.tone ?? 'neutral'}>{item.label}</span>
    {/if}
  {/each}
</div>
