<script lang="ts">
  import { FileClock } from '@lucide/svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { AuditLogEntry } from '../../types.js';
  import Avatar from '../foundation/Avatar.svelte';
  import Skeleton from '../foundation/Skeleton.svelte';

  type Props = HTMLAttributes<HTMLOListElement> & {
    entries: AuditLogEntry[];
    label?: string;
    emptyLabel?: string;
    loading?: boolean;
    compact?: boolean;
  };

  let { entries, label = 'Änderungsprotokoll', emptyLabel = 'Noch keine protokollierten Änderungen.', loading = false, compact = false, class: className, ...rest }: Props = $props();
</script>

<ol {...rest} class={cn('rg-audit-log', className)} aria-label={label} aria-busy={loading} data-compact={compact}>
  {#if loading}
    {#each Array.from({ length: 3 }) as _}<li class="rg-audit-entry"><Skeleton width="2rem" height="2rem" radius="999px" /><div class="rg-stack" style="flex:1"><Skeleton width="65%" /><Skeleton width="38%" height=".7rem" /></div></li>{/each}
  {:else if entries.length}
    {#each entries as entry}
      <li class="rg-audit-entry" data-tone={entry.tone ?? 'neutral'}>
        <Avatar src={entry.avatar} name={entry.actor} initials={entry.initials} size="sm" />
        <div class="rg-audit-content">
          <div class="rg-audit-summary"><strong>{entry.actor}</strong>{' '}<span>{entry.action}</span>{#if entry.target}{' '}<b>{entry.target}</b>{/if}</div>
          {#if entry.detail}<details><summary>Details anzeigen</summary><p>{entry.detail}</p></details>{/if}
        </div>
        <time datetime={entry.datetime}>{entry.time}</time>
      </li>
    {/each}
  {:else}
    <li class="rg-audit-empty"><FileClock size={21} aria-hidden="true" /><span>{emptyLabel}</span></li>
  {/if}
</ol>
