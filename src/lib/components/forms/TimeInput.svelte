<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLInputAttributes,'type'|'value'>&{value?:string;invalid?:boolean}; let {value=$bindable(''),invalid=false,class:className,...rest}:Props=$props();
</script>
<input {...rest} class={cn('rg-input',className)} type="time" bind:value data-invalid={invalid} aria-invalid={invalid||undefined}/>
