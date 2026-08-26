<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLInputAttributes,'type'|'value'>&{value?:number;label?:string;showValue?:boolean};
  let {value=$bindable(0),min=0,max=100,step=1,label='Wert',showValue=false,class:className,...rest}:Props=$props();
</script>
<div style="display:grid;gap:.4rem;width:100%">{#if showValue}<div style="display:flex;justify-content:space-between;color:var(--rg-fg-muted);font-size:var(--rg-text-xs)"><span>{label}</span><strong>{value}</strong></div>{/if}<input {...rest} class={cn('rg-slider',className)} type="range" bind:value {min} {max} {step} aria-label={label}/></div>
