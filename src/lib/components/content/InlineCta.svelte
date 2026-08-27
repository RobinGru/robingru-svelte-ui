<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { ArrowRight, FileText, X } from '@lucide/svelte';
  import { cn } from '../../internal/cn.js';

  type Props = Omit<HTMLAttributes<HTMLElement>, 'children' | 'onsubmit'> & {
    title: string;
    description?: string;
    eyebrow?: string;
    variant?: 'actions' | 'email' | 'file';
    image?: string;
    imageAlt?: string;
    icon?: Snippet;
    children?: Snippet;
    primaryLabel?: string;
    secondaryLabel?: string;
    onprimary?: () => void;
    onsecondary?: () => void;
    ondismiss?: () => void;
    email?: string;
    placeholder?: string;
    onsubmit?: (email: string, event: SubmitEvent) => void;
    fileName?: string;
    fileMeta?: string;
  };

  let {
    title, description, eyebrow, variant = 'actions', image, imageAlt = '', icon, children,
    primaryLabel = 'Mehr erfahren', secondaryLabel, onprimary, onsecondary, ondismiss,
    email = $bindable(''), placeholder = 'name@beispiel.de', onsubmit, fileName, fileMeta,
    class: className, ...rest
  }: Props = $props();

  function submit(event: SubmitEvent) {
    if (!onsubmit) return;
    event.preventDefault();
    onsubmit(email, event);
  }
</script>

<section {...rest} class={cn('rg-inline-cta', className)} data-variant={variant}>
  {#if image || icon}
    <div class="rg-inline-cta-media">
      {#if image}<img src={image} alt={imageAlt} />{:else if icon}{@render icon()}{/if}
    </div>
  {/if}
  <div class="rg-inline-cta-content">
    {#if eyebrow}<span class="rg-inline-cta-eyebrow">{eyebrow}</span>{/if}
    <h2>{title}</h2>
    {#if description}<p>{description}</p>{/if}
    {#if children}<div class="rg-inline-cta-details">{@render children()}</div>{/if}
    {#if variant === 'file' && fileName}
      <div class="rg-inline-cta-file"><FileText size={18} aria-hidden="true" /><span><strong>{fileName}</strong>{#if fileMeta}<small>{fileMeta}</small>{/if}</span></div>
    {/if}
    {#if variant === 'email'}
      <form class="rg-inline-cta-form" onsubmit={submit}>
        <label><span class="rg-sr-only">E-Mail-Adresse</span><input class="rg-input" type="email" bind:value={email} {placeholder} autocomplete="email" required /></label>
        <button class="rg-button" data-variant="solid" type="submit">{primaryLabel}<ArrowRight size={16} aria-hidden="true" /></button>
      </form>
    {:else}
      <div class="rg-inline-cta-actions">
        {#if secondaryLabel}<button class="rg-button" data-variant="ghost" type="button" onclick={onsecondary}>{secondaryLabel}</button>{/if}
        <button class="rg-button" data-variant="solid" type="button" onclick={onprimary}>{primaryLabel}<ArrowRight size={16} aria-hidden="true" /></button>
      </div>
    {/if}
  </div>
  {#if ondismiss}<button class="rg-inline-cta-dismiss" type="button" aria-label="Hinweis schließen" onclick={ondismiss}><X size={17} aria-hidden="true" /></button>{/if}
</section>
