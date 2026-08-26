<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { PostSummary } from '../../types.js';
  import PostCard from './PostCard.svelte';
  import PostGrid from './PostGrid.svelte';

  type Props = HTMLAttributes<HTMLElement> & {
    posts: PostSummary[];
    title?: string;
    description?: string;
  };

  let {
    posts,
    title = 'Weiterlesen',
    description,
    class: className,
    ...rest
  }: Props = $props();
</script>

<section {...rest} class={cn('rg-related-posts', className)}>
  <header class="rg-section-heading">
    <h2>{title}</h2>
    {#if description}<p>{description}</p>{/if}
  </header>
  <PostGrid>
    {#each posts as post}
      <PostCard {...post} />
    {/each}
  </PostGrid>
</section>
