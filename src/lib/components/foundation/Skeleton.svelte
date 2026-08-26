<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=HTMLAttributes<HTMLDivElement>&{width?:string;height?:string;radius?:string};
  let {width='100%',height='1rem',radius,class:className,style,...rest}:Props=$props();
</script>
<div {...rest} class={cn('rg-skeleton',className)} aria-hidden="true" style={`width:${width};height:${height};${radius?`border-radius:${radius};`:''}${style??''}`}></div>
