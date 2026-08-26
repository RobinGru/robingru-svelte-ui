<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { CloudUpload } from '@lucide/svelte'; import { cn } from '../../internal/cn.js';
  type Props=HTMLAttributes<HTMLDivElement>&{accept?:string;multiple?:boolean;label?:string;hint?:string;onfiles?: (files:File[])=>void};
  let {accept,multiple=false,label='Dateien ablegen',hint='oder klicken, um Dateien auszuwählen',onfiles,class:className,...rest}:Props=$props(); let dragging=$state(false);
  function drop(event:DragEvent){event.preventDefault();dragging=false;const files=Array.from(event.dataTransfer?.files??[]);if(files.length)onfiles?.(files)}
  function change(event:Event){const files=Array.from((event.currentTarget as HTMLInputElement).files??[]);if(files.length)onfiles?.(files)}
</script>
<div {...rest} class={cn('rg-upload',className)} data-dragging={dragging} ondragenter={(e)=>{e.preventDefault();dragging=true}} ondragover={(e)=>e.preventDefault()} ondragleave={()=>dragging=false} ondrop={drop}><CloudUpload size={26} color="var(--rg-primary)"/><div><div class="rg-upload-title">{label}</div><div class="rg-upload-hint">{hint}</div></div><input type="file" {accept} {multiple} aria-label={label} onchange={change}/></div>
