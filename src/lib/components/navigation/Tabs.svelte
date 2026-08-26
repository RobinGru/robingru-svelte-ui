<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js'; import type { Option } from '../../types.js';
  type Props=HTMLAttributes<HTMLDivElement>&{value?:string;items:Option[];content:Snippet<[string]>;label?:string;onchange?: (value:string)=>void};
  let {value=$bindable(''),items,content,label='Bereiche',onchange,class:className,...rest}:Props=$props();
  $effect(()=>{if(!value&&items[0])value=items[0].value});
  function choose(next:string){value=next;onchange?.(next)}
  function key(event:KeyboardEvent,index:number){if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();let next=index;if(event.key==='ArrowLeft')next=(index-1+items.length)%items.length;if(event.key==='ArrowRight')next=(index+1)%items.length;if(event.key==='Home')next=0;if(event.key==='End')next=items.length-1;const option=items[next];if(option&&!option.disabled){choose(option.value);(event.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLButtonElement>('[role=tab]')[next]?.focus()}}
</script>
<div {...rest} class={cn(className)}><div class="rg-tabs-list" role="tablist" aria-label={label}>{#each items as item,i}<button class="rg-tabs-trigger" type="button" role="tab" id={`rg-tab-${item.value}`} aria-selected={value===item.value} aria-controls={`rg-panel-${item.value}`} data-state={value===item.value?'active':'inactive'} tabindex={value===item.value?0:-1} disabled={item.disabled} onclick={()=>choose(item.value)} onkeydown={(e)=>key(e,i)}>{item.label}</button>{/each}</div><div class="rg-tabs-content" role="tabpanel" id={`rg-panel-${value}`} aria-labelledby={`rg-tab-${value}`}>{@render content(value)}</div></div>
