<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'; import { Eye, EyeOff } from '@lucide/svelte'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLInputAttributes,'type'|'value'>&{value?:string;label?:string}; let {value=$bindable(''),label='Passwort',class:className,...rest}:Props=$props(); let visible=$state(false);
</script>
<div class={cn('rg-input-wrap',className)}><input {...rest} class="rg-input" style="padding-inline-end:2.5rem" type={visible?'text':'password'} bind:value aria-label={label}/><button class="rg-input-action" type="button" aria-label={visible?'Passwort ausblenden':'Passwort anzeigen'} aria-pressed={visible} onclick={() => visible=!visible}>{#if visible}<EyeOff size={16}/>{:else}<Eye size={16}/>{/if}</button></div>
