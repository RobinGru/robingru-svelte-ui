<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import {
    Accessibility,
    BookOpen,
    Boxes,
    ChartNoAxesCombined,
    ChevronRight,
    Component,
    Database,
    Download,
    Gauge,
    LayoutTemplate,
    Menu,
    PanelLeftClose,
    PanelLeftOpen,
    Palette,
    Scale,
    Search,
    X
  } from '@lucide/svelte';
  import { Badge, CommandPalette, IconButton, Kbd, ThemeToggle } from '$lib';
  import { componentCatalog } from '../catalog.js';

  type Props = {
    routeId: string | null;
    componentSlug?: string;
    children: Snippet;
  };
  let { routeId, componentSlug, children }: Props = $props();

  let mobileOpen = $state(false);
  let searchOpen = $state(false);
  let compact = $state(false);
  let sidebarCollapsed = $state(false);
  let mounted = $state(false);
  const href = (path: string) => `${base}${path}`;
  const markdownPath = $derived(
    routeId === '/' ? '/index.md'
      : routeId === '/components/[slug]' && componentSlug ? `/components/${componentSlug}/index.md`
      : ['/start', '/installation', '/why-robingru', '/components', '/patterns', '/dashboard', '/blog', '/data', '/tokens', '/accessibility', '/workbench'].includes(routeId ?? '') ? `${routeId}/index.md`
      : undefined
  );

  const mainLinks = [
    { href: '/', label: 'Übersicht', icon: Gauge },
    { href: '/start', label: 'Starte hier', icon: Download },
    { href: '/installation', label: 'Installation', icon: Download },
    { href: '/why-robingru', label: 'Warum RG Svelte UI?', icon: Scale },
    { href: '/components', label: 'Komponenten', icon: Component, count: componentCatalog.length },
    { href: '/patterns', label: 'Patterns', icon: LayoutTemplate }
  ];
  const showcaseLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: ChartNoAxesCombined },
    { href: '/blog', label: 'Blog & Editorial', icon: BookOpen },
    { href: '/data', label: 'DataTable', icon: Database }
  ];
  const systemLinks = [
    { href: '/tokens', label: 'Design Tokens', icon: Palette },
    { href: '/accessibility', label: 'Accessibility', icon: Accessibility },
    { href: '/workbench', label: 'Gesamt-Workbench', icon: Boxes }
  ];

  const commands = [
    ...mainLinks,
    ...showcaseLinks,
    ...systemLinks,
    ...componentCatalog.map((item) => ({
      href: `/components/${item.slug}`,
      label: item.name,
      description: item.description
    }))
  ].map((item, index) => ({
    id: `docs-${index}`,
    label: item.label,
    description: 'description' in item ? item.description : undefined,
    keywords: [item.href, item.label.toLowerCase()],
    action: () => {
      window.location.href = href(item.href);
    }
  }));

  function active(href: string) {
    if (href === '/') return routeId === '/';
    return routeId === href || routeId?.startsWith(`${href}/`);
  }

  function applyDensity(next: boolean) {
    compact = next;
    if (next) document.documentElement.dataset.density = 'compact';
    else delete document.documentElement.dataset.density;
    try { localStorage.setItem('rg-docs-density', next ? 'compact' : 'comfortable'); } catch {}
  }

  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
    try { localStorage.setItem('rg-docs-sidebar', sidebarCollapsed ? 'collapsed' : 'expanded'); } catch {}
  }

  onMount(() => {
    try {
      applyDensity(localStorage.getItem('rg-docs-density') === 'compact');
      sidebarCollapsed = localStorage.getItem('rg-docs-sidebar') === 'collapsed';
    } catch {}
    mounted = true;
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchOpen = true;
      }
    };
    window.addEventListener('keydown', shortcut);
    return () => {
      window.removeEventListener('keydown', shortcut);
    };
  });
</script>

<svelte:head>
  <meta name="theme-color" content="#f8fafc" />
  {#if markdownPath}<link rel="alternate" href={href(markdownPath)} type="text/markdown" />{/if}
</svelte:head>

<div class:docs-sidebar-is-collapsed={sidebarCollapsed} class="docs-shell">
  <aside class:docs-sidebar-open={mobileOpen} class="docs-sidebar" aria-label="Dokumentation">
    <div class="docs-brand-row">
      <a class="docs-brand" href={href('/')} aria-label="RobinGru Svelte UI Startseite">
        <span class="docs-brand-mark" aria-hidden="true">R</span>
        <span><strong>RobinGru</strong><small>Svelte UI</small></span>
      </a>
      <IconButton class="docs-sidebar-collapse" label={sidebarCollapsed ? 'Seitenleiste ausklappen' : 'Seitenleiste einklappen'} variant="outline" onclick={toggleSidebar}>
        {#if sidebarCollapsed}<PanelLeftOpen size={18} />{:else}<PanelLeftClose size={18} />{/if}
      </IconButton>
      <IconButton class="docs-mobile-close" label="Navigation schließen" size="sm" variant="ghost" onclick={() => mobileOpen = false}><X size={17} /></IconButton>
    </div>

    <button class="docs-search-trigger" type="button" onclick={() => searchOpen = true}>
      <Search size={16} aria-hidden="true" />
      <span>Suchen</span>
      <Kbd>⌘ K</Kbd>
    </button>

    <nav class="docs-nav">
      <div class="docs-nav-group">
        <span>Dokumentation</span>
        {#each mainLinks as item}
          {@const Icon = item.icon}
          <a href={href(item.href)} data-active={active(item.href)} onclick={() => mobileOpen = false}>
            <Icon size={16} aria-hidden="true" /><span>{item.label}</span>
            {#if 'count' in item && item.count}<Badge tone="neutral">{item.count}</Badge>{/if}
          </a>
        {/each}
      </div>
      <div class="docs-nav-group">
        <span>Live-Demos</span>
        {#each showcaseLinks as item}
          {@const Icon = item.icon}
          <a href={href(item.href)} data-active={active(item.href)} onclick={() => mobileOpen = false}>
            <Icon size={16} aria-hidden="true" /><span>{item.label}</span>
          </a>
        {/each}
      </div>
      <div class="docs-nav-group">
        <span>System</span>
        {#each systemLinks as item}
          {@const Icon = item.icon}
          <a href={href(item.href)} data-active={active(item.href)} onclick={() => mobileOpen = false}>
            <Icon size={16} aria-hidden="true" /><span>{item.label}</span>
          </a>
        {/each}
      </div>
    </nav>

    <div class="docs-sidebar-footer">
      <div><span>Release</span><strong>0.3.1</strong></div>
      <a href={href('/components')}>132 Komponenten <ChevronRight size={14} /></a>
    </div>
  </aside>

  {#if mobileOpen}<button class="docs-backdrop" aria-label="Navigation schließen" onclick={() => mobileOpen = false}></button>{/if}

  <div class="docs-main">
    <header class="docs-topbar">
      <div class="docs-topbar-start">
        <IconButton class="docs-mobile-menu" label="Navigation öffnen" size="sm" variant="ghost" onclick={() => mobileOpen = true}><Menu size={18} /></IconButton>
        <a href={href('/')}>RobinGru Svelte UI</a>
      </div>
      <div class="docs-topbar-actions">
        <button class="docs-density-toggle" type="button" aria-pressed={mounted ? compact : false} onclick={() => applyDensity(!compact)}>{mounted && compact ? 'Kompakt' : 'Normal'}</button>
        <ThemeToggle class="docs-theme-toggle" storageKey="rg-docs-theme" />
      </div>
    </header>
    <main class="docs-content" id="main-content">
      {@render children()}
    </main>
  </div>
</div>

<CommandPalette bind:open={searchOpen} items={commands} placeholder="Komponente oder Bereich suchen …" emptyLabel="Kein passender Eintrag" />
