<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js'; import type { Option } from '../../types.js';
  type Props=HTMLAttributes<HTMLDivElement>&{value?:string;options:Option[];name:string;label?:string;orientation?:'horizontal'|'vertical';onchange?: (value:string)=>void};
  let {value=$bindable(''),options,name,label='Auswahl',orientation='vertical',onchange,class:className,...rest}:Props=$props();
  function choose(next:string){value=next;onchange?.(next)}
</script>
<div {...rest} class={cn('rg-radio-group',className)} style:flex-direction={orientation==='horizontal'?'row':undefined} style:display={orientation==='horizontal'?'flex':undefined} role="radiogroup" aria-label={label}>
  {#each options as option}
    <label class="rg-radio"><input type="radio" {name} value={option.value} checked={value===option.value} disabled={option.disabled} onchange={() => choose(option.value)}/><span>{option.label}{#if option.description}<span style="display:block;color:var(--rg-fg-muted);font-size:var(--rg-text-xs);margin-top:.15rem">{option.description}</span>{/if}</span></label>
  {/each}
</div>
