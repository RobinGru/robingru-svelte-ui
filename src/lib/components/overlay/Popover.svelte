<script lang="ts">
  import type { Snippet } from 'svelte'; import { Popover as BitsPopover } from 'bits-ui'; import { cn } from '../../internal/cn.js';
  type Props={open?:boolean;trigger:Snippet;children:Snippet;label?:string;side?:'top'|'right'|'bottom'|'left';align?:'start'|'center'|'end';class?:string};
  let {open=$bindable(false),trigger,children,label='Weitere Informationen',side='bottom',align='center',class:className}:Props=$props();
</script>
<BitsPopover.Root bind:open><BitsPopover.Trigger class="rg-button" data-variant="outline" data-tone="neutral" aria-label={label}>{@render trigger()}</BitsPopover.Trigger><BitsPopover.Portal><BitsPopover.Content class={cn('rg-popover',className)} {side} {align} sideOffset={7}>{@render children()}</BitsPopover.Content></BitsPopover.Portal></BitsPopover.Root>
