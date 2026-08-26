<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js'; import type { Option } from '../../types.js';
  type Props=HTMLAttributes<HTMLDivElement>&{value?:string;options:Option[];label?:string;onchange?: (value:string)=>void};
  let {value=$bindable(''),options,label='Ansicht',onchange,class:className,...rest}:Props=$props(); function choose(next:string){value=next;onchange?.(next)}
</script>
<div {...rest} class={cn('rg-segmented',className)} role="radiogroup" aria-label={label}>{#each options as option}<button type="button" role="radio" aria-checked={value===option.value} disabled={option.disabled} onclick={()=>choose(option.value)}>{option.label}</button>{/each}</div>
