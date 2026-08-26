<script lang="ts">
  import type { Snippet } from 'svelte'; import { ContextMenu as BitsContextMenu } from 'bits-ui'; import { cn } from '../../internal/cn.js';
  export type ContextItem={label:string;disabled?:boolean;separatorBefore?:boolean;tone?:'neutral'|'danger';action?:()=>void};
  type Props={children:Snippet;items:ContextItem[];label?:string;class?:string}; let {children,items,label='Kontextbereich',class:className}:Props=$props();
</script>
<BitsContextMenu.Root><BitsContextMenu.Trigger class={className} aria-label={label}>{@render children()}</BitsContextMenu.Trigger><BitsContextMenu.Portal><BitsContextMenu.Content class="rg-menu">{#each items as item}{#if item.separatorBefore}<BitsContextMenu.Separator class="rg-menu-separator"/>{/if}<BitsContextMenu.Item class="rg-menu-item" data-tone={item.tone??'neutral'} disabled={item.disabled} onclick={item.action}>{item.label}</BitsContextMenu.Item>{/each}</BitsContextMenu.Content></BitsContextMenu.Portal></BitsContextMenu.Root>
