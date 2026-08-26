<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js'; import type { Tone } from '../../types.js';
  export type TimelineItem={title:string;meta?:string;body?:string;tone?:Tone}; type Props=HTMLAttributes<HTMLOListElement>&{items:TimelineItem[];label?:string}; let {items,label='Zeitverlauf',class:className,...rest}:Props=$props();
</script>
<ol {...rest} class={cn('rg-timeline',className)} aria-label={label}>{#each items as item}<li class="rg-timeline-item"><span class="rg-timeline-dot" style={`background:var(--rg-${item.tone&&item.tone!=='neutral'?item.tone:'primary'});box-shadow:0 0 0 1px var(--rg-${item.tone&&item.tone!=='neutral'?item.tone:'primary'})`}></span><div><div class="rg-timeline-title">{item.title}</div>{#if item.meta}<div class="rg-timeline-meta">{item.meta}</div>{/if}{#if item.body}<div class="rg-timeline-body">{item.body}</div>{/if}</div></li>{/each}</ol>
