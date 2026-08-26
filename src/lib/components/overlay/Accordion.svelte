<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { ChevronDown } from '@lucide/svelte'; import { cn } from '../../internal/cn.js';
  export type AccordionItem={value:string;title:string;content:string;disabled?:boolean};
  type Props=HTMLAttributes<HTMLDivElement>&{items:AccordionItem[];value?:string[];multiple?:boolean;label?:string;onchange?: (value:string[])=>void};
  let {items,value=$bindable([]),multiple=false,label='Aufklappbare Bereiche',onchange,class:className,...rest}:Props=$props();
  function toggle(item:string){if(value.includes(item))value=value.filter(v=>v!==item);else value=multiple?[...value,item]:[item];onchange?.(value)}
</script>
<div {...rest} class={cn('rg-accordion',className)} aria-label={label}>{#each items as item}<section class="rg-accordion-item"><h3 style="margin:0"><button class="rg-accordion-trigger" type="button" aria-expanded={value.includes(item.value)} aria-controls={`rg-accordion-${item.value}`} disabled={item.disabled} onclick={()=>toggle(item.value)}><span>{item.title}</span><ChevronDown size={17} style={`transition:transform var(--rg-duration);transform:rotate(${value.includes(item.value)?'180deg':'0'})`}/></button></h3>{#if value.includes(item.value)}<div class="rg-accordion-content" id={`rg-accordion-${item.value}`}>{item.content}</div>{/if}</section>{/each}</div>
