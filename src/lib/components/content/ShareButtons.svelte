<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { Check, Copy, Mail, Share2 } from '@lucide/svelte';
  import { cn } from '../../internal/cn.js';
  import type { SharePlatform } from '../../types.js';

  type Props = HTMLAttributes<HTMLDivElement> & {
    url: string;
    title: string;
    platforms?: SharePlatform[];
    label?: string;
  };

  let {
    url,
    title,
    platforms = ['copy', 'email', 'linkedin', 'bluesky'],
    label = 'Beitrag teilen',
    class: className,
    ...rest
  }: Props = $props();

  let copied = $state(false);
  let encodedUrl = $derived(encodeURIComponent(url));
  let encodedTitle = $derived(encodeURIComponent(title));

  const names: Record<Exclude<SharePlatform, 'copy'>, string> = {
    email: 'E-Mail',
    linkedin: 'LinkedIn',
    bluesky: 'Bluesky'
  };

  function shareHref(platform: Exclude<SharePlatform, 'copy'>) {
    if (platform === 'email') return `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
    if (platform === 'linkedin') return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    return `https://bsky.app/intent/compose?text=${encodedTitle}%20${encodedUrl}`;
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      copied = true;
      window.setTimeout(() => copied = false, 1500);
    } catch {
      copied = false;
    }
  }
</script>

<div {...rest} class={cn('rg-share', className)} aria-label={label}>
  <span class="rg-share-label"><Share2 size={16} aria-hidden="true" /> {label}</span>
  <div class="rg-share-actions">
    {#each platforms as platform}
      {#if platform === 'copy'}
        <button class="rg-button" data-variant="outline" data-size="sm" type="button" onclick={copy}>
          {#if copied}<Check size={15} aria-hidden="true" /> Kopiert{:else}<Copy size={15} aria-hidden="true" /> Link{/if}
        </button>
      {:else}
        <a class="rg-button" data-variant="outline" data-size="sm" href={shareHref(platform)} target={platform === 'email' ? undefined : '_blank'} rel={platform === 'email' ? undefined : 'noreferrer'}>
          {#if platform === 'email'}<Mail size={15} aria-hidden="true" />{/if}{names[platform]}
        </a>
      {/if}
    {/each}
  </div>
</div>
