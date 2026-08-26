<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'; import { onMount } from 'svelte'; import { Moon, Sun } from '@lucide/svelte'; import { cn } from '../../internal/cn.js';
  type Props=HTMLButtonAttributes&{storageKey?:string;lightTheme?:string;darkTheme?:string}; let {storageKey='rg-theme',lightTheme='robin',darkTheme='robin-dark',class:className,...rest}:Props=$props(); let dark=$state(false); let mounted=$state(false);
  function apply(next:boolean){dark=next;document.documentElement.dataset.theme=next?darkTheme:lightTheme;try{localStorage.setItem(storageKey,next?'dark':'light')}catch{}}
  onMount(()=>{requestAnimationFrame(()=>{let saved:string|null=null;try{saved=localStorage.getItem(storageKey)}catch{}const current=document.documentElement.dataset.theme;apply(saved?saved==='dark':current===darkTheme||(current!==lightTheme&&matchMedia('(prefers-color-scheme: dark)').matches));mounted=true})});
</script>
<button {...rest} type="button" class={cn('rg-button rg-icon-button',className)} data-variant="ghost" data-size="sm" aria-label={mounted ? (dark?'Helles Design aktivieren':'Dunkles Design aktivieren') : 'Design umschalten'} aria-pressed={mounted ? dark : undefined} onclick={()=>apply(!dark)}>{#if mounted && dark}<Sun size={17}/>{:else}<Moon size={17}/>{/if}</button>
