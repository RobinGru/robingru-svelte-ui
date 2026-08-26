<script lang="ts">
  import {
    ArrowRight,
    Blocks,
    BookOpen,
    CheckCircle2,
    Code2,
    Component,
    Database,
    Download,
    Gauge,
    Keyboard,
    LayoutDashboard,
    MoonStar,
    Palette,
    Scale,
    Sparkles
  } from '@lucide/svelte';
  import { Badge, Button, InlineCode } from '$lib';
  import { base } from '$app/paths';
  import { featuredComponents, componentCategories, componentCatalog } from '$docs/catalog.js';
  import CodePanel from '$docs/components/CodePanel.svelte';
  import ComponentCard from '$docs/components/ComponentCard.svelte';

  const installation = `bun add github:RobinGru/robingru-svelte-ui\n\n# optional für Skeleton/Tailwind-Integration\nbun add -d @skeletonlabs/skeleton tailwindcss`;
  const setup = `/* src/app.css */\n@import '@robingru/svelte-ui/styles.css';`;

  const featureCards = [
    { icon: Component, title: '116 abgestimmte Komponenten', text: 'Grundlagen, Formulare, Navigation, Daten, Dashboard und Editorial in einer gemeinsamen Sprache.' },
    { icon: Keyboard, title: 'Interaktion und Accessibility', text: 'Native Semantik, sichtbare Fokuszustände sowie Bits UI für komplexes Fokus- und Overlayverhalten.' },
    { icon: Palette, title: 'Robin Light und Dark', text: 'Ein ruhiges helles Blau, neutrale Flächen, moderate Radien und eine kompakte optionale Dichte.' },
    { icon: Code2, title: 'Source-orientierte API', text: 'Svelte-5-Komponenten, Snippets und klare Props ohne parallele Utility- oder Styling-Schichten.' },
    { icon: Database, title: 'Daten ohne Enterprise-Ballast', text: 'DataTable mit Suche, Sortierung, Filtern, Spaltensteuerung, Auswahl und Pagination – ohne VirtualTable.' },
    { icon: BookOpen, title: 'Apps und Editorial', text: 'Dashboard und Blog verwenden dieselben Tokens, Zustände und Abstände, statt wie zwei Produkte zu wirken.' }
  ];

  const routes = [
    { icon: Component, href: '/components', title: 'Komponenten', text: 'Alle Komponenten live, filterbar und mit eigener Detailseite.', meta: '116 Live-Previews' },
    { icon: Download, href: '/installation', title: 'Installation', text: 'GitHub-Installation, Styles und erste Komponente in wenigen nachvollziehbaren Schritten.', meta: 'Kein npm-Release nötig' },
    { icon: Scale, href: '/why-robingru', title: 'Warum RG Svelte UI?', text: 'Einordnung, Stärken und der passende Einsatzbereich statt pauschaler Vergleichsversprechen.', meta: 'Klare Positionierung' },
    { icon: Blocks, href: '/patterns', title: 'Patterns', text: 'Login, Einstellungen, Kommentare und weitere zusammengesetzte Oberflächen.', meta: 'Produktnahe Beispiele' },
    { icon: LayoutDashboard, href: '/dashboard', title: 'Dashboard', text: 'KPIs, Filter, leichte Charts, Status und operative Tabelle.', meta: 'Vollständige Demo' },
    { icon: BookOpen, href: '/blog', title: 'Blog & Editorial', text: 'Beitragsübersicht und vollständiger Artikel mit Prose-System.', meta: 'Editorial Showcase' },
    { icon: Database, href: '/data', title: 'DataTable', text: 'Mittelgroße Tabelle mit Auswahl, Filtern, Suche und Spaltensteuerung.', meta: 'Keine Virtualisierung' },
    { icon: Palette, href: '/tokens', title: 'Design Tokens', text: 'Farben, Radien, Schatten, Typografie, Spacing und Motion.', meta: 'Light & Dark' }
  ];
</script>

<svelte:head>
  <title>RobinGru Svelte UI · Dokumentation und Live-Demos</title>
  <meta name="description" content="RobinGru Svelte UI: 116 live dokumentierte Svelte-Komponenten für Anwendungen, Dashboards, Datentabellen und Editorial Content." />
</svelte:head>

<section class="docs-home-hero">
  <div class="docs-home-copy">
    <Badge tone="primary"><Sparkles size={13} /> Release 0.3.1 · Live Docs</Badge>
    <h1>Ruhige Svelte-Oberflächen, vollständig live dokumentiert.</h1>
    <p>RobinGru Svelte UI verbindet App-Komponenten, Dashboards, normale bis mittelgroße Datentabellen und redaktionelle Inhalte – ohne visuelle Effekt-Überladung und ohne redundante UI-Schichten.</p>
    <div class="docs-home-actions">
      <Button onclick={() => window.location.href = `${base}/components`}>Komponenten ansehen <ArrowRight size={16} /></Button>
      <Button variant="outline" tone="neutral" onclick={() => window.location.href = `${base}/installation`}>Installation</Button>
      <Button variant="outline" tone="neutral" onclick={() => window.location.href = `${base}/patterns`}>Patterns öffnen</Button>
    </div>
    <div class="docs-home-meta">
      <span><CheckCircle2 size={14} /> Svelte 5</span>
      <span><CheckCircle2 size={14} /> Bits UI Verhalten</span>
      <span><MoonStar size={14} /> Light, Dark und Compact</span>
      <span><Gauge size={14} /> Keine VirtualTable</span>
    </div>
  </div>

  <div class="docs-hero-workbench" aria-label="Stilisierte Vorschau eines RobinGru Dashboards">
    <header>
      <span class="docs-window-dots"><i></i><i></i><i></i></span>
      <span>RobinGru Workspace</span>
      <InlineCode>robin</InlineCode>
    </header>
    <div class="docs-hero-workbench-body">
      <div class="docs-mini-sidebar"><span></span><span></span><span></span><span></span></div>
      <div class="docs-mini-content">
        <div class="docs-mini-kpis">
          <div class="docs-mini-kpi"><span>Umsatz</span><strong>84 Tsd. €</strong></div>
          <div class="docs-mini-kpi"><span>Nutzer</span><strong>8.420</strong></div>
          <div class="docs-mini-kpi"><span>Conversion</span><strong>6,8 %</strong></div>
        </div>
        <div class="docs-mini-chart">
          {#each [38, 52, 45, 68, 61, 78, 72, 91] as height}
            <i style={`--h:${height}%`}></i>
          {/each}
        </div>
        <div class="docs-mini-table"><span></span><span></span><span></span></div>
      </div>
    </div>
  </div>
</section>

<section class="docs-section">
  <div class="docs-section-heading">
    <div><h2>Ein System, keine Komponenten-Sammlung</h2><p>Alle Bereiche teilen dieselben Tokens und Zustände. Das hält Anwendungen visuell ruhig und technisch nachvollziehbar.</p></div>
  </div>
  <div class="docs-feature-grid">
    {#each featureCards as feature}
      {@const Icon = feature.icon}
      <article class="docs-feature-card">
        <span><Icon size={18} /></span>
        <h3>{feature.title}</h3>
        <p>{feature.text}</p>
      </article>
    {/each}
  </div>
</section>

<section class="docs-section">
  <div class="docs-section-heading">
    <div><h2>Die Live-Dokumentation</h2><p>Isolierte Vorschauen und echte Anwendungsszenen stehen nebeneinander. So wird sichtbar, ob Komponenten auch im Zusammenspiel funktionieren.</p></div>
  </div>
  <div class="docs-route-grid">
    {#each routes as route}
      {@const Icon = route.icon}
      <a class="docs-route-card" href={`${base}${route.href}`}>
        <span><Icon size={21} /></span>
        <div><h3>{route.title}</h3><p>{route.text}</p></div>
        <footer><span>{route.meta}</span><ArrowRight size={15} /></footer>
      </a>
    {/each}
  </div>
</section>

<section class="docs-section">
  <div class="docs-section-heading">
    <div><h2>Ausgewählte Komponenten</h2><p>Ein kleiner Ausschnitt aus {componentCatalog.length} Komponenten in {componentCategories.length} klar getrennten Bereichen.</p></div>
    <a class="docs-text-link" href={`${base}/components`}>Vollständiger Katalog <ArrowRight size={15} /></a>
  </div>
  <div class="docs-component-grid">
    {#each featuredComponents.slice(0, 6) as item}
      <ComponentCard {item} />
    {/each}
  </div>
</section>

<section class="docs-section">
  <div class="docs-section-heading">
    <div><h2>Installation</h2><p>Die eigenständigen Styles funktionieren ohne Tailwind-Runtime. Skeleton bleibt eine optionale Integration.</p></div>
  </div>
  <div class="docs-pattern-grid">
    <CodePanel code={installation} language="shell" filename="Terminal" />
    <CodePanel code={setup} language="css" filename="src/app.css" />
  </div>
</section>

<footer class="docs-footer"><div><span>RobinGru Svelte UI · Release 0.3.1</span><a href={`${base}/accessibility`}>Accessibility und Prüfprinzipien</a></div></footer>
