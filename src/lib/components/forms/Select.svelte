<script lang="ts">
  import type { HTMLSelectAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js'; import type { Option } from '../../types.js';
  type Props=Omit<HTMLSelectAttributes,'value'>&{value?:string;options:Option[];placeholder?:string;invalid?:boolean};
  let {value=$bindable(''),options,placeholder,invalid=false,class:className,...rest}:Props=$props();
</script>
<select {...rest} bind:value class={cn('rg-select',className)} data-invalid={invalid} aria-invalid={invalid || undefined}>
  {#if placeholder}<option value="" disabled>{placeholder}</option>{/if}
  {#each options as option}<option value={option.value} disabled={option.disabled}>{option.label}</option>{/each}
</select>
