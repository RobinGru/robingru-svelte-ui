<script lang="ts">
  import { Portal } from 'bits-ui';
  import { tick, type Snippet } from 'svelte';

  type Props = {
    anchor: HTMLElement | undefined;
    children: Snippet;
    class?: string;
    element?: HTMLElement;
    onfocusout?: (event: FocusEvent) => void;
  };

  let { anchor, children, class: className, element = $bindable<HTMLElement | undefined>(undefined), onfocusout }: Props = $props();
  let left = $state(0);
  let top = $state(0);
  let width = $state(0);
  let maxHeight = $state(0);

  async function position() {
    await tick();
    if (!anchor || !element) return;

    const anchorRect = anchor.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const gap = 6;
    const edge = 8;
    const menuHeight = element.offsetHeight;
    const roomBelow = viewportHeight - anchorRect.bottom - gap - edge;
    const roomAbove = anchorRect.top - gap - edge;
    const placeAbove = menuHeight > roomBelow && roomAbove > roomBelow;

    width = Math.min(anchorRect.width, viewportWidth - edge * 2);
    left = Math.max(edge, Math.min(anchorRect.left, viewportWidth - width - edge));
    top = placeAbove ? Math.max(edge, anchorRect.top - gap - Math.min(menuHeight, roomAbove)) : anchorRect.bottom + gap;
    maxHeight = Math.max(0, placeAbove ? roomAbove : roomBelow);
  }

  $effect(() => {
    if (!anchor || !element) return;
    void position();

    const observer = new ResizeObserver(() => void position());
    observer.observe(anchor);
    observer.observe(element);
    window.addEventListener('resize', position);
    window.addEventListener('scroll', position, true);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', position);
      window.removeEventListener('scroll', position, true);
    };
  });
</script>

<Portal>
  <div
    bind:this={element}
    class={className}
    style={`--rg-floating-left:${left}px;--rg-floating-top:${top}px;--rg-floating-width:${width}px;--rg-floating-max-height:${maxHeight}px`}
    onfocusout={onfocusout}
  >
    {@render children()}
  </div>
</Portal>
