<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'; import { Search, X } from '@lucide/svelte'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLInputAttributes,'type'|'value'>&{value?:string;label?:string;clearable?:boolean;onsearch?: (value:string)=>void};
  let {value=$bindable(''),label='Suchen',clearable=true,onsearch,class:className,placeholder='Suchen …',...rest}:Props=$props();
  function input(){onsearch?.(value)} function clear(){value='';onsearch?.('')}
</script>
<div class={cn('rg-input-wrap',className)}><Search size={17} aria-hidden="true"/><input {...rest} class="rg-input has-start" type="search" bind:value {placeholder} aria-label={label} oninput={input}/>{#if clearable && value}<button class="rg-input-action" type="button" aria-label="Suche leeren" onclick={clear}><X size={15}/></button>{/if}</div>
