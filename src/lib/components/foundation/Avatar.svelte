<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import type { Size } from '../../types.js';
  type Props = HTMLAttributes<HTMLSpanElement> & { src?: string; alt?: string; name?: string; initials?: string; size?: Size };
  let { src, alt='', name='', initials, size='md', class: className, ...rest }: Props = $props();
  let failed = $state(false);
  let fallback = $derived(initials ?? name.split(/\s+/).filter(Boolean).slice(0,2).map((part)=>part[0]?.toUpperCase()).join('') ?? '?');
</script>
<span {...rest} class={cn('rg-avatar', className)} data-size={size} aria-label={name || alt || undefined}>
  {#if src && !failed}<img {src} {alt} onerror={() => (failed = true)} />{:else}<span aria-hidden="true">{fallback || '?'}</span>{/if}
</span>
