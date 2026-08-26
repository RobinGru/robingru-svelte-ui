<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { ArrowUpRight } from '@lucide/svelte';
  import { cn } from '../../internal/cn.js';
  import ReadingTime from './ReadingTime.svelte';
  import TagList from './TagList.svelte';

  type Props = HTMLAttributes<HTMLElement> & {
    title: string;
    href: string;
    excerpt?: string;
    image?: string;
    imageAlt?: string;
    eyebrow?: string;
    date?: string;
    dateTime?: string;
    author?: string;
    minutes?: number;
    tags?: string[];
    orientation?: 'vertical' | 'horizontal';
    featured?: boolean;
    loading?: 'lazy' | 'eager';
  };

  let {
    title,
    href,
    excerpt,
    image,
    imageAlt = '',
    eyebrow,
    date,
    dateTime,
    author,
    minutes,
    tags = [],
    orientation = 'vertical',
    featured = false,
    loading = 'lazy',
    class: className,
    ...rest
  }: Props = $props();
</script>

<article {...rest} class={cn('rg-post-card', className)} data-orientation={orientation} data-featured={featured}>
  {#if image}
    <a class="rg-post-media" href={href} aria-label={title}>
      <img src={image} alt={imageAlt} {loading} />
    </a>
  {/if}
  <div class="rg-post-body">
    {#if eyebrow}<div class="rg-post-eyebrow">{eyebrow}</div>{/if}
    <h2 class="rg-post-title"><a href={href}>{title}<ArrowUpRight size={17} aria-hidden="true" /></a></h2>
    {#if excerpt}<p class="rg-post-excerpt">{excerpt}</p>{/if}
    {#if tags.length}<TagList {tags} size="sm" />{/if}
    {#if date || author || minutes !== undefined}
      <div class="rg-post-meta">
        {#if author}<span>{author}</span>{/if}
        {#if date}<time datetime={dateTime}>{date}</time>{/if}
        {#if minutes !== undefined}<ReadingTime {minutes} />{/if}
      </div>
    {/if}
  </div>
</article>
