<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { StatusSummaryItem } from '../../types.js';

  type Props = HTMLAttributes<HTMLElement> & {
    items: StatusSummaryItem[];
    title?: string;
    description?: string;
    compact?: boolean;
  };

  let {
    items,
    title,
    description,
    compact = false,
    class: className,
    ...rest
  }: Props = $props();
</script>

<section {...rest} class={cn('rg-status-summary', className)} data-compact={compact}>
  {#if title || description}
    <header>{#if title}<h2>{title}</h2>{/if}{#if description}<p>{description}</p>{/if}</header>
  {/if}
  <ul>
    {#each items as item}
      <li>
        <span class="rg-status-dot" data-tone={item.tone ?? 'neutral'} aria-hidden="true"></span>
        <div><strong>{item.label}</strong>{#if item.detail}<small>{item.detail}</small>{/if}</div>
        <span class="rg-status-value">{item.value}</span>
      </li>
    {/each}
  </ul>
</section>
