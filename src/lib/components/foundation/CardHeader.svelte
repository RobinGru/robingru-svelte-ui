<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & { title?: string; description?: string; action?: Snippet; children?: Snippet };
  let { title, description, action, children, class: className, ...rest }: Props = $props();
</script>
<header {...rest} class={cn('rg-card-header', className)}>
  <div>
    {#if title}<h3 class="rg-card-title">{title}</h3>{/if}
    {#if description}<p class="rg-card-description">{description}</p>{/if}
    {#if children}{@render children()}{/if}
  </div>
  {#if action}<div>{@render action()}</div>{/if}
</header>
