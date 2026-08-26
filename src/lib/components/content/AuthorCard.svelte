<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '../../internal/cn.js';
  import Avatar from '../foundation/Avatar.svelte';

  type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    name: string;
    avatar?: string;
    href?: string;
    role?: string;
    bio?: string;
    actions?: Snippet;
    children?: Snippet;
  };

  let {
    name,
    avatar,
    href,
    role,
    bio,
    actions,
    children,
    class: className,
    ...rest
  }: Props = $props();
</script>

<section {...rest} class={cn('rg-author-card', className)} aria-label={`Über ${name}`}>
  <Avatar name={name} src={avatar} size="lg" />
  <div class="rg-author-body">
    <div class="rg-author-heading">
      <div>
        {#if href}<a class="rg-author-name" href={href}>{name}</a>{:else}<div class="rg-author-name">{name}</div>{/if}
        {#if role}<div class="rg-author-role">{role}</div>{/if}
      </div>
      {#if actions}<div class="rg-author-actions">{@render actions()}</div>{/if}
    </div>
    {#if bio}<p class="rg-author-bio">{bio}</p>{/if}
    {#if children}<div class="rg-author-extra">{@render children()}</div>{/if}
  </div>
</section>
