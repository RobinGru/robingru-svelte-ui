<script lang="ts">
  import { Check, Minus, X } from '@lucide/svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { ComparisonColumn, ComparisonFeature } from '../../types.js';

  type Props = HTMLAttributes<HTMLDivElement> & {
    columns: ComparisonColumn[];
    features: ComparisonFeature[];
    caption?: string;
    featureLabel?: string;
    compact?: boolean;
  };

  let { columns, features, caption = 'Funktionsvergleich', featureLabel = 'Funktion', compact = false, class: className, ...rest }: Props = $props();
</script>

<div {...rest} class={cn('rg-comparison-wrap', className)} data-compact={compact}>
  <table class="rg-comparison">
    <caption>{caption}</caption>
    <thead><tr><th scope="col">{featureLabel}</th>{#each columns as column}<th scope="col" data-highlighted={column.highlighted}><span>{column.label}{#if column.badge}<small>{column.badge}</small>{/if}</span>{#if column.description}<p>{column.description}</p>{/if}</th>{/each}</tr></thead>
    <tbody>
      {#each features as feature}
        <tr><th scope="row"><span>{feature.label}</span>{#if feature.description}<small>{feature.description}</small>{/if}</th>
          {#each columns as column}
            {@const cell = feature.values[column.id]}
            <td data-highlighted={column.highlighted} data-value={cell === true ? 'yes' : cell === false ? 'no' : 'text'}>
              {#if cell === true}<Check size={17} aria-label="Enthalten" />{:else if cell === false}<X size={17} aria-label="Nicht enthalten" />{:else if cell == null}<Minus size={17} aria-label="Keine Angabe" />{:else}{cell}{/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
