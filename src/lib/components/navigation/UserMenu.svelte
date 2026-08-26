<script lang="ts">
  import type { Snippet } from 'svelte'; import { DropdownMenu } from 'bits-ui'; import { LogOut, Settings, User } from '@lucide/svelte'; import { cn } from '../../internal/cn.js';
  export type UserMenuItem={label:string;icon?:Snippet;tone?:'neutral'|'danger';disabled?:boolean;action?:()=>void};
  type Props={name:string;detail?:string;avatar?:Snippet;items?:UserMenuItem[];label?:string;class?:string};
  let {name,detail,avatar,items=[{label:'Profil'},{label:'Einstellungen'},{label:'Abmelden',tone:'danger'}],label='Benutzermenü',class:className}:Props=$props();
  const defaults=[User,Settings,LogOut];
</script>
<DropdownMenu.Root>
  <DropdownMenu.Trigger class={cn('rg-button',className)} data-variant="ghost" data-size="sm" aria-label={label}>{#if avatar}{@render avatar()}{/if}<span style="display:grid;text-align:left;line-height:1.15"><strong>{name}</strong>{#if detail}<small style="color:var(--rg-fg-subtle);font-weight:500">{detail}</small>{/if}</span></DropdownMenu.Trigger>
  <DropdownMenu.Portal><DropdownMenu.Content class="rg-menu" sideOffset={6} align="end">{#each items as item,i}<DropdownMenu.Item class="rg-menu-item" data-tone={item.tone??'neutral'} disabled={item.disabled} onclick={item.action}>{#if item.icon}{@render item.icon()}{:else}{@const Icon=defaults[i]??User}<Icon size={15}/>{/if}{item.label}</DropdownMenu.Item>{/each}</DropdownMenu.Content></DropdownMenu.Portal>
</DropdownMenu.Root>
