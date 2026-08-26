<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=HTMLAttributes<HTMLSpanElement>&{label?:string;size?:string}; let {label='Lädt',size='1.1rem',class:className,...rest}:Props=$props();
</script>
<span {...rest} class={cn('rg-spinner',className)} style:width={size} style:height={size} role="status"><span class="rg-sr-only">{label}</span></span>
