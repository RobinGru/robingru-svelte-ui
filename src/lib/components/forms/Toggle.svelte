<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLButtonAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLButtonAttributes,'children'>&{children:Snippet;pressed?:boolean;label?:string;onchange?: (pressed:boolean)=>void};
  let {children,pressed=$bindable(false),label,onchange,class:className,...rest}:Props=$props(); function toggle(){pressed=!pressed;onchange?.(pressed)}
</script>
<button {...rest} type="button" class={cn('rg-toggle',className)} aria-pressed={pressed} aria-label={label} onclick={toggle}>{@render children()}</button>
