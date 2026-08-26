<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';

  type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    title?: string;
    description?: string;
    action?: Snippet;
    children: Snippet;
  };

  let { title, description, action, children, class: className, ...rest }: Props = $props();
</script>

<section {...rest} class={cn('rg-dashboard-section', className)}>
  {#if title || description || action}
    <header>
      <div>
        {#if title}<h2>{title}</h2>{/if}
        {#if description}<p>{description}</p>{/if}
      </div>
      {#if action}<div class="rg-dashboard-section-action">{@render action()}</div>{/if}
    </header>
  {/if}
  <div class="rg-dashboard-section-body">{@render children()}</div>
</section>
