<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'; import { cn } from '../../internal/cn.js';
  let {class:className,...rest}:HTMLAttributes<HTMLHRElement>=$props();
</script>
<hr {...rest} class={cn('rg-divider',className)}/>
