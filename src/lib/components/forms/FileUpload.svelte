<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { Upload } from '@lucide/svelte'; import { cn } from '../../internal/cn.js';
  type Props=HTMLAttributes<HTMLDivElement>&{accept?:string;multiple?:boolean;disabled?:boolean;label?:string;hint?:string;onfiles?: (files:File[])=>void};
  let {accept,multiple=false,disabled=false,label='Datei auswählen',hint='Klicken oder Datei hier ablegen',onfiles,class:className,...rest}:Props=$props();
  function change(event:Event){const files=Array.from((event.currentTarget as HTMLInputElement).files??[]);if(files.length)onfiles?.(files)}
</script>
<div {...rest} class={cn('rg-upload',className)}><Upload size={23} color="var(--rg-primary)"/><div><div class="rg-upload-title">{label}</div><div class="rg-upload-hint">{hint}</div></div><input type="file" {accept} {multiple} {disabled} aria-label={label} onchange={change}/></div>
