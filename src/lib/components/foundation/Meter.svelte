<script lang="ts">
  import type { HTMLMeterAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=HTMLMeterAttributes&{label?:string}; let {value=0,min=0,max=100,label='Messwert',class:className,...rest}:Props=$props();
</script>
<meter {...rest} class={cn('rg-meter',className)} {value} {min} {max} aria-label={label}>{value}</meter>
