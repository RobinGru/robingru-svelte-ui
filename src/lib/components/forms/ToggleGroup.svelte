<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js'; import type { Option } from '../../types.js';
  type Props=HTMLAttributes<HTMLDivElement>&{value?:string[];options:Option[];label?:string;onchange?: (value:string[])=>void};
  let {value=$bindable([]),options,label='Mehrfachauswahl',onchange,class:className,...rest}:Props=$props();
  function toggle(item:string){value=value.includes(item)?value.filter((v)=>v!==item):[...value,item];onchange?.(value)}
</script>
<div {...rest} class={cn('rg-toggle-group',className)} role="group" aria-label={label}>{#each options as option}<button type="button" class="rg-toggle" aria-pressed={value.includes(option.value)} disabled={option.disabled} onclick={()=>toggle(option.value)}>{option.label}</button>{/each}</div>
