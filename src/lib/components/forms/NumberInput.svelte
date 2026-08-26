<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { Minus, Plus } from '@lucide/svelte'; import { cn } from '../../internal/cn.js';
  type Props=HTMLAttributes<HTMLDivElement>&{value?:number;min?:number;max?:number;step?:number;label?:string;disabled?:boolean;onchange?: (value:number)=>void};
  let {value=$bindable(0),min=-Infinity,max=Infinity,step=1,label='Anzahl',disabled=false,onchange,class:className,...rest}:Props=$props();
  function set(next:number){value=Math.min(max,Math.max(min,next));onchange?.(value)}
</script>
<div {...rest} class={cn('rg-number',className)}><button type="button" aria-label={`${label} verringern`} {disabled} onclick={() => set(value-step)}><Minus size={15}/></button><input class="rg-input" type="number" bind:value {min} {max} {step} aria-label={label} {disabled} onchange={() => onchange?.(value)}/><button type="button" aria-label={`${label} erhöhen`} {disabled} onclick={() => set(value+step)}><Plus size={15}/></button></div>
