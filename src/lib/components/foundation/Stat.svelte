<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLAttributes<HTMLDivElement>,'children'>&{label:string;value:string|number;detail?:string;icon?:Snippet};
  let {label,value,detail,icon,class:className,...rest}:Props=$props();
</script>
<div {...rest} class={cn('rg-stat',className)}>
  <div class="rg-stat-label">{#if icon}{@render icon()}{/if}{label}</div>
  <div class="rg-stat-value">{value}</div>
  {#if detail}<div class="rg-stat-detail">{detail}</div>{/if}
</div>
