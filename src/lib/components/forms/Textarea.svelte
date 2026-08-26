<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLTextareaAttributes,'value'>&{value?:string;invalid?:boolean}; let {value=$bindable(''),invalid=false,class:className,...rest}:Props=$props();
</script>
<textarea {...rest} bind:value class={cn('rg-textarea',className)} data-invalid={invalid} aria-invalid={invalid || undefined}></textarea>
