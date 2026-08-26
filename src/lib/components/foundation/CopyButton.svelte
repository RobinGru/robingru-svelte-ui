<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'; import { Check, Copy } from '@lucide/svelte'; import { cn } from '../../internal/cn.js';
  type Props=HTMLButtonAttributes&{value:string;label?:string;successLabel?:string;oncopy?: (value:string)=>void};
  let {value,label='Kopieren',successLabel='Kopiert',oncopy,class:className,...rest}:Props=$props(); let copied=$state(false);
  async function copy(){ try{ await navigator.clipboard.writeText(value); copied=true; oncopy?.(value); window.setTimeout(()=>copied=false,1500); }catch{ copied=false; } }
</script>
<button {...rest} type="button" class={cn('rg-button',className)} data-size="sm" data-variant="outline" data-tone="neutral" onclick={copy}>{#if copied}<Check size={15}/>{successLabel}{:else}<Copy size={15}/>{label}{/if}</button>
