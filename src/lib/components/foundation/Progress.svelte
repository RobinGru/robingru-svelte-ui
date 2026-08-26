<script lang="ts">
  import type { HTMLProgressAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=HTMLProgressAttributes&{label?:string}; let {value=0,max=100,label='Fortschritt',class:className,...rest}:Props=$props();
</script>
<progress {...rest} class={cn('rg-progress',className)} {value} {max} aria-label={label}></progress>
