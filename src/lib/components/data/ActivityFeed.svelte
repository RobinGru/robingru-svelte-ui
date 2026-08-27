<script lang="ts">
  import { Activity as ActivityIcon } from '@lucide/svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { ActivityFeedItem } from '../../types.js';
  import Avatar from '../foundation/Avatar.svelte';
  import Badge from '../foundation/Badge.svelte';
  import Skeleton from '../foundation/Skeleton.svelte';

  type Props = Omit<HTMLAttributes<HTMLOListElement>, 'children'> & {
    items: ActivityFeedItem[];
    label?: string;
    emptyLabel?: string;
    loading?: boolean;
    divided?: boolean;
    compact?: boolean;
  };

  let { items, label = 'Aktivitäten', emptyLabel = 'Noch keine Aktivitäten.', loading = false, divided = true, compact = false, class: className, ...rest }: Props = $props();
</script>

<ol {...rest} class={cn('rg-activity', className)} aria-label={label} aria-busy={loading} data-divided={divided} data-compact={compact}>
  {#if loading}
    {#each Array.from({ length: 3 }) as _}<li class="rg-activity-item rg-activity-loading" aria-hidden="true"><Skeleton width="2rem" height="2rem" radius="999px" /><div class="rg-activity-content"><Skeleton width="52%" /><Skeleton width="78%" height=".7rem" /></div></li>{/each}
  {:else if items.length}
    {#each items as item}
      <li class="rg-activity-item" data-tone={item.tone ?? 'primary'} data-unread={item.unread}>
        <Avatar src={item.avatar} name={item.name} initials={item.initials} size="sm" />
        <div class="rg-activity-content">
          <div class="rg-activity-summary"><strong>{item.name}</strong>{#if item.action}<span>{item.action}</span>{/if}{#if item.target}<b>{item.target}</b>{/if}</div>
          {#if item.detail}<p class="rg-activity-detail">{item.detail}</p>{/if}
          {#if item.tags?.length}<div class="rg-activity-tags" aria-label="Kategorien">{#each item.tags as tag}{@const tagLabel = typeof tag === 'string' ? tag : tag.label}{@const tone = typeof tag === 'string' ? 'neutral' : (tag.tone ?? 'neutral')}<Badge {tone}>{tagLabel}</Badge>{/each}</div>{/if}
        </div>
        <div class="rg-activity-meta"><time datetime={item.datetime}>{item.time}</time>{#if item.unread}<span class="rg-activity-unread" aria-label="Ungelesen"></span>{/if}</div>
      </li>
    {/each}
  {:else}
    <li class="rg-activity-empty"><ActivityIcon size={21} aria-hidden="true" /><span>{emptyLabel}</span></li>
  {/if}
</ol>
