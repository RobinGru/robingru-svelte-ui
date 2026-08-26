<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=HTMLAttributes<HTMLSpanElement>&{color:string;label?:string;showValue?:boolean}; let {color,label,showValue=false,class:className,...rest}:Props=$props();
</script>
<span {...rest} class={cn('rg-swatch',className)}><span class="rg-swatch-dot" style={`--swatch:${color}`} aria-hidden="true"></span>{#if label}<span>{label}</span>{/if}{#if showValue}<code class="rg-code">{color}</code>{/if}</span>
