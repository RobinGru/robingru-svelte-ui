<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=HTMLAttributes<HTMLDivElement>&{label?:string;description?:string}; let {label='Inhalte werden geladen',description='Einen Moment bitte.',class:className,...rest}:Props=$props();
</script>
<div {...rest} class={cn('rg-state',className)} role="status"><div class="rg-state-icon"><span class="rg-spinner"></span></div><h3 class="rg-state-title">{label}</h3><p class="rg-state-description">{description}</p></div>
