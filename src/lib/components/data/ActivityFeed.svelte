<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js'; import Avatar from '../foundation/Avatar.svelte';
  export type ActivityItem={name:string;detail:string;time:string;avatar?:string;initials?:string}; type Props=HTMLAttributes<HTMLDivElement>&{items:ActivityItem[];label?:string}; let {items,label='Aktivitäten',class:className,...rest}:Props=$props();
</script>
<div {...rest} class={cn('rg-activity',className)} role="feed" aria-label={label}>{#each items as item}<article class="rg-activity-item"><Avatar src={item.avatar} name={item.name} initials={item.initials} size="sm"/><div><div class="rg-activity-title">{item.name}</div><div class="rg-activity-detail">{item.detail}</div></div><time class="rg-activity-time">{item.time}</time></article>{/each}</div>
