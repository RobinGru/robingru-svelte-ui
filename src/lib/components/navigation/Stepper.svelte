<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { Check } from '@lucide/svelte'; import { cn } from '../../internal/cn.js';
  export type Step={label:string;description?:string}; type Props=HTMLAttributes<HTMLOListElement>&{steps:Step[];current?:number;label?:string}; let {steps,current=1,label='Fortschritt',class:className,...rest}:Props=$props();
</script>
<ol {...rest} class={cn('rg-stepper',className)} style={`--steps:${steps.length}`} aria-label={label}>{#each steps as step,i}{@const number=i+1}{@const state=number<current?'complete':number===current?'current':'upcoming'}<li class="rg-step" data-state={state} aria-current={state==='current'?'step':undefined}><span class="rg-step-dot">{#if state==='complete'}<Check size={12}/>{:else}{number}{/if}</span><span>{step.label}</span>{#if step.description}<span class="rg-sr-only">{step.description}</span>{/if}</li>{/each}</ol>
