<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';

  type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    src?: string;
    alt?: string;
    caption?: string;
    credit?: string;
    media?: Snippet;
    children?: Snippet;
    aspect?: string;
    loading?: 'lazy' | 'eager';
    bleed?: boolean;
  };

  let {
    src,
    alt = '',
    caption,
    credit,
    media,
    children,
    aspect,
    loading = 'lazy',
    bleed = false,
    class: className,
    ...rest
  }: Props = $props();
</script>

<figure {...rest} class={cn('rg-figure', className)} data-bleed={bleed}>
  <div class="rg-figure-media" style:aspect-ratio={aspect}>
    {#if media}
      {@render media()}
    {:else if src}
      <img {src} {alt} {loading} />
    {/if}
  </div>
  {#if caption || credit || children}
    <figcaption class="rg-figure-caption">
      <span>{caption}</span>
      {#if credit}<span class="rg-figure-credit">{credit}</span>{/if}
      {#if children}{@render children()}{/if}
    </figcaption>
  {/if}
</figure>
