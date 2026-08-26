<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { CalendarDays } from '@lucide/svelte';
  import { cn } from '../../internal/cn.js';
  import Avatar from '../foundation/Avatar.svelte';
  import ReadingTime from './ReadingTime.svelte';

  type Props = HTMLAttributes<HTMLDivElement> & {
    author?: string;
    authorHref?: string;
    avatar?: string;
    published?: string;
    publishedDatetime?: string;
    updated?: string;
    updatedDatetime?: string;
    minutes?: number;
    words?: number;
    category?: string;
  };

  let {
    author,
    authorHref,
    avatar,
    published,
    publishedDatetime,
    updated,
    updatedDatetime,
    minutes,
    words,
    category,
    class: className,
    ...rest
  }: Props = $props();
</script>

<div {...rest} class={cn('rg-article-meta', className)}>
  {#if author}
    <div class="rg-article-author">
      <Avatar name={author} src={avatar} size="sm" />
      {#if authorHref}<a href={authorHref}>{author}</a>{:else}<span>{author}</span>{/if}
    </div>
  {/if}
  {#if published}
    <span class="rg-article-meta-item">
      <CalendarDays size={15} aria-hidden="true" />
      <time datetime={publishedDatetime}>{published}</time>
    </span>
  {/if}
  {#if updated}
    <span class="rg-article-meta-item rg-article-updated">
      Aktualisiert <time datetime={updatedDatetime}>{updated}</time>
    </span>
  {/if}
  {#if minutes !== undefined || words !== undefined}<ReadingTime {minutes} {words} />{/if}
  {#if category}<span class="rg-badge" data-tone="neutral">{category}</span>{/if}
</div>
