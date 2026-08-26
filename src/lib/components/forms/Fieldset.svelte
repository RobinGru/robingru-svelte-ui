<script lang="ts">
  import type { Snippet } from 'svelte'; import type { HTMLFieldsetAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=Omit<HTMLFieldsetAttributes,'children'>&{legend:string;description?:string;children:Snippet}; let {legend,description,children,class:className,...rest}:Props=$props();
</script>
<fieldset {...rest} class={cn('rg-fieldset',className)}><legend>{legend}</legend>{#if description}<p class="rg-field-hint" style="margin-bottom:.8rem">{description}</p>{/if}<div class="rg-stack">{@render children()}</div></fieldset>
