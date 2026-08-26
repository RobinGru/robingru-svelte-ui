<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  export type DescriptionItem={term:string;description:string}; type Props=HTMLAttributes<HTMLDListElement>&{items:DescriptionItem[]}; let {items,class:className,...rest}:Props=$props();
</script>
<dl {...rest} class={cn('rg-description-list',className)}>{#each items as item}<dt>{item.term}</dt><dd>{item.description}</dd>{/each}</dl>
