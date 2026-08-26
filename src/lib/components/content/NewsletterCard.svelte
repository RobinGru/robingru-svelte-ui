<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { ArrowRight } from '@lucide/svelte';
  import { cn } from '../../internal/cn.js';

  type Props = Omit<HTMLAttributes<HTMLElement>, 'onsubmit'> & {
    title?: string;
    description?: string;
    placeholder?: string;
    buttonLabel?: string;
    privacyText?: string;
    action?: string;
    method?: 'get' | 'post';
    email?: string;
    onsubmit?: (email: string, event: SubmitEvent) => void;
  };

  let {
    title = 'Neue Beiträge im Postfach',
    description = 'Seltene, sorgfältig kuratierte Updates – ohne tägliche Marketing-Mails.',
    placeholder = 'name@beispiel.de',
    buttonLabel = 'Abonnieren',
    privacyText,
    action,
    method = 'post',
    email = $bindable(''),
    onsubmit,
    class: className,
    ...rest
  }: Props = $props();

  function submit(event: SubmitEvent) {
    if (!onsubmit) return;
    event.preventDefault();
    onsubmit(email, event);
  }
</script>

<section {...rest} class={cn('rg-newsletter', className)}>
  <div>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
  <form {action} {method} onsubmit={submit} class="rg-newsletter-form">
    <label class="rg-newsletter-email">
      <span class="rg-sr-only">E-Mail-Adresse</span>
      <input class="rg-input" type="email" name="email" bind:value={email} {placeholder} autocomplete="email" required />
    </label>
    <button class="rg-button" data-variant="solid" type="submit">{buttonLabel}<ArrowRight size={16} aria-hidden="true" /></button>
  </form>
  {#if privacyText}<small class="rg-newsletter-privacy">{privacyText}</small>{/if}
</section>
