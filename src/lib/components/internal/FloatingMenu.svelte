<script lang="ts">
  import { Portal } from 'bits-ui';
  import { tick, type Snippet } from 'svelte';

  type Props = {
    anchor: HTMLElement | undefined;
    children: Snippet;
    class?: string;
    element?: HTMLElement;
    onfocusout?: (event: FocusEvent) => void;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    matchAnchorWidth?: boolean;
  };

  let { anchor, children, class: className, element = $bindable<HTMLElement | undefined>(undefined), onfocusout, side = 'bottom', align = 'start', matchAnchorWidth = true }: Props = $props();
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
    const menuWidth = Math.min(matchAnchorWidth ? anchorRect.width : element.offsetWidth, viewportWidth - edge * 2);
    const menuHeight = element.offsetHeight;
    const roomBelow = viewportHeight - anchorRect.bottom - gap - edge;
    const roomAbove = anchorRect.top - gap - edge;
    const roomRight = viewportWidth - anchorRect.right - gap - edge;
    const roomLeft = anchorRect.left - gap - edge;
    const vertical = side === 'top' || side === 'bottom';
    const placeAbove = side === 'top' || (side === 'bottom' && menuHeight > roomBelow && roomAbove > roomBelow);
    const placeLeft = side === 'left' || (side === 'right' && menuWidth > roomRight && roomLeft > roomRight);
    const alignedLeft = align === 'end' ? anchorRect.right - menuWidth : align === 'center' ? anchorRect.left + (anchorRect.width - menuWidth) / 2 : anchorRect.left;
    const alignedTop = align === 'end' ? anchorRect.bottom - menuHeight : align === 'center' ? anchorRect.top + (anchorRect.height - menuHeight) / 2 : anchorRect.top;

    width = menuWidth;
    if (vertical) {
      left = Math.max(edge, Math.min(alignedLeft, viewportWidth - menuWidth - edge));
      top = placeAbove ? Math.max(edge, anchorRect.top - gap - Math.min(menuHeight, roomAbove)) : anchorRect.bottom + gap;
      maxHeight = Math.max(0, placeAbove ? roomAbove : roomBelow);
    } else {
      left = placeLeft ? Math.max(edge, anchorRect.left - gap - menuWidth) : anchorRect.right + gap;
      top = Math.max(edge, Math.min(alignedTop, viewportHeight - Math.min(menuHeight, viewportHeight - edge * 2) - edge));
      maxHeight = Math.max(0, placeLeft ? roomLeft : roomRight);
    }
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
