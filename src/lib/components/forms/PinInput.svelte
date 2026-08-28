<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  type Props=HTMLAttributes<HTMLDivElement>&{value?:string;length?:number;label?:string;masked?:boolean;oncomplete?: (value:string)=>void};
  let {value=$bindable(''),length=6,label='Sicherheitscode',masked=false,oncomplete,class:className,...rest}:Props=$props();
  function update(index:number,event:Event){const input=event.currentTarget as HTMLInputElement;const char=input.value.replace(/\D/g,'').slice(-1);const chars=value.padEnd(length,' ').slice(0,length).split('');chars[index]=char||' ';value=chars.join('');if(char){(input.nextElementSibling as HTMLInputElement|null)?.focus()}if(value.replace(/\s/g,'').length===length)oncomplete?.(value)}
  function key(index:number,event:KeyboardEvent){const input=event.currentTarget as HTMLInputElement;if(event.key==='Backspace'&&!input.value){(input.previousElementSibling as HTMLInputElement|null)?.focus()}}
</script>
<div {...rest} class={cn('rg-pin',className)} role="group" aria-label={label}>{#each Array.from({length}) as _,i}<input class="rg-input" type={masked?'password':'text'} inputmode="numeric" autocomplete={i===0&&!value.trim()?'one-time-code':'off'} maxlength="1" value={value.charAt(i)} aria-label={`${label} Stelle ${i+1}`} oninput={(e)=>update(i,e)} onkeydown={(e)=>key(i,e)}/>{/each}</div>
