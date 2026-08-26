<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';

  type Props = HTMLAttributes<HTMLDivElement> & {
    rows?: number;
    columns?: number;
    caption?: string;
  };

  let { rows = 5, columns = 4, caption = 'Tabelle wird geladen', class: className, ...rest }: Props = $props();
</script>

<div {...rest} class={cn('rg-table-wrap', className)} role="status" aria-label={caption}>
  <table class="rg-table rg-table-skeleton" aria-hidden="true">
    <thead><tr>{#each Array(columns) as _}<th><span class="rg-skeleton"></span></th>{/each}</tr></thead>
    <tbody>{#each Array(rows) as _}<tr>{#each Array(columns) as _}<td><span class="rg-skeleton"></span></td>{/each}</tr>{/each}</tbody>
  </table>
</div>
