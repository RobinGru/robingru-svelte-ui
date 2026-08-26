<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLInputAttributes,'value'>&{value?:string;invalid?:boolean};
  let {value=$bindable(''),invalid=false,class:className,type='text',...rest}:Props=$props();
</script>
<input {...rest} bind:value {type} class={cn('rg-input',className)} data-invalid={invalid} aria-invalid={invalid || undefined}/>
