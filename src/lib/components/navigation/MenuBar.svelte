<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  export type MenuBarItem={label:string;disabled?:boolean;action?:()=>void}; type Props=HTMLAttributes<HTMLDivElement>&{items:MenuBarItem[];label?:string}; let {items,label='Anwendungsmenü',class:className,...rest}:Props=$props();
</script>
<div {...rest} class={cn('rg-menubar',className)} role="menubar" aria-label={label}>{#each items as item}<button type="button" role="menuitem" disabled={item.disabled} onclick={item.action}>{item.label}</button>{/each}</div>
