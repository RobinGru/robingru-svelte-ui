<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLAttributes<HTMLUListElement>,'children'>&{items:unknown[];item:Snippet<[unknown,number]>;label?:string}; let {items,item,label,class:className,...rest}:Props=$props();
</script>
<ul {...rest} class={cn('rg-list',className)} aria-label={label}>{#each items as entry,i}<li class="rg-list-item">{@render item(entry,i)}</li>{/each}</ul>
