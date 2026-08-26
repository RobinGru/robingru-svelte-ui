<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { Star } from '@lucide/svelte'; import { cn } from '../../internal/cn.js';
  type Props=HTMLAttributes<HTMLDivElement>&{value?:number;max?:number;readonly?:boolean;label?:string;onchange?: (value:number)=>void};
  let {value=$bindable(0),max=5,readonly=false,label='Bewertung',onchange,class:className,...rest}:Props=$props();
  function set(next:number){ if(readonly)return; value=next; onchange?.(next); }
</script>
<div {...rest} class={cn('rg-rating',className)} role="radiogroup" aria-label={label}>
  {#each Array.from({length:max},(_,i)=>i+1) as item}
    <button type="button" role="radio" aria-checked={item===value} aria-label={`${item} von ${max}`} data-active={item<=value} disabled={readonly} onclick={() => set(item)}><Star size={19} fill={item<=value?'currentColor':'none'}/></button>
  {/each}
</div>
