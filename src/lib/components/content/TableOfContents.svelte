<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { TocItem } from '../../types.js';

  type Props = HTMLAttributes<HTMLElement> & {
    items: TocItem[];
    title?: string;
    label?: string;
    sticky?: boolean;
  };

  let {
    items,
    title = 'Inhalt',
    label = 'Inhaltsverzeichnis',
    sticky = true,
    class: className,
    ...rest
  }: Props = $props();
</script>

<nav {...rest} class={cn('rg-toc', className)} aria-label={label} data-sticky={sticky}>
  <div class="rg-toc-title">{title}</div>
  <ol class="rg-toc-list">
    {#each items as item}
      <li style={`--rg-toc-level:${Math.max(0, (item.level ?? 2) - 2)}`}>
        <a href={item.href} aria-current={item.active ? 'location' : undefined}>{item.label}</a>
      </li>
    {/each}
  </ol>
</nav>
