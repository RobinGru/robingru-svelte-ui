<script lang="ts">
  import type { Snippet } from 'svelte'; import { Tooltip as BitsTooltip } from 'bits-ui'; import { cn } from '../../internal/cn.js';
  type Props={content:string;children:Snippet;side?:'top'|'right'|'bottom'|'left';delay?:number;class?:string};
  type TriggerProps={props:Record<string, unknown>};
  let {content,children,side='top',delay=350,class:className}:Props=$props();
</script>
{#snippet trigger({ props }: TriggerProps)}
  <span {...props} class="rg-tooltip-trigger">{@render children()}</span>
{/snippet}

<BitsTooltip.Provider delayDuration={delay}><BitsTooltip.Root><BitsTooltip.Trigger child={trigger} /><BitsTooltip.Portal><BitsTooltip.Content class={cn('rg-tooltip',className)} {side} sideOffset={6}>{content}</BitsTooltip.Content></BitsTooltip.Portal></BitsTooltip.Root></BitsTooltip.Provider>
