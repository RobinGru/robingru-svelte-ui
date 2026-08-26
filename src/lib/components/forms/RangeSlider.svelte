<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=HTMLAttributes<HTMLDivElement>&{minValue?:number;maxValue?:number;min?:number;max?:number;step?:number;label?:string};
  let {minValue=$bindable(20),maxValue=$bindable(80),min=0,max=100,step=1,label='Bereich',class:className,...rest}:Props=$props();
  function clampMin(){ if(minValue>maxValue) minValue=maxValue; }
  function clampMax(){ if(maxValue<minValue) maxValue=minValue; }
</script>
<div {...rest} class={cn('rg-range',className)} aria-label={label}>
  <div style="display:flex;justify-content:space-between;color:var(--rg-fg-muted);font-size:var(--rg-text-xs)"><span>{minValue}</span><span>{maxValue}</span></div>
  <input class="rg-slider" type="range" bind:value={minValue} {min} {max} {step} aria-label={`${label} Minimum`} oninput={clampMin}/>
  <input class="rg-slider" type="range" bind:value={maxValue} {min} {max} {step} aria-label={`${label} Maximum`} oninput={clampMax}/>
</div>
