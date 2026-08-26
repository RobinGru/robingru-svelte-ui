<script lang="ts">
  import { ArrowRight, CheckCircle2, CircleGauge, Code2, Eye, Layers3, Scale } from '@lucide/svelte';
  import { Button, Callout } from '$lib';
  import { base } from '$app/paths';
  import SectionIntro from '$docs/components/SectionIntro.svelte';

  const strengths = [
    { icon: Layers3, title: 'Ein System für mehrere Oberflächen', text: 'App-Controls, Dashboard, Datenansichten und Editorial teilen Tokens, Zustände und Abstände. Das reduziert visuelle Brüche zwischen Produktbereichen.' },
    { icon: CircleGauge, title: 'Pragmatische Datendichte', text: 'DataTable, Filter und Kennzahlen richten sich an normale bis mittelgroße Datenmengen – ohne den technischen und visuellen Ballast einer VirtualTable.' },
    { icon: Eye, title: 'Ruhige, überprüfbare Gestaltung', text: 'Kontrast, Fokus, Zustände, Light/Dark und kompakte Dichte gehören zum System. Die Gestaltung setzt auf klare Hierarchie statt auf dekorative Effekte.' },
    { icon: Code2, title: 'Svelte-5-nah statt zusätzlicher Schichten', text: 'Snippets, Props und native Semantik bleiben im Vordergrund. Die UI erzwingt weder eine Utility-Klassen-Sprache noch einen bestimmten App-Aufbau.' }
  ];
</script>

<svelte:head>
  <title>Warum RG Svelte UI? · RobinGru Svelte UI</title>
  <meta name="description" content="Wofür RobinGru Svelte UI geeignet ist – und wann ein anderes UI-System die bessere Wahl sein kann." />
</svelte:head>

<SectionIntro eyebrow="RG = RobinGru" title="Warum RG Svelte UI?" description="Nicht jede UI-Bibliothek muss für jedes Projekt die beste sein. RG Svelte UI ist für Teams gedacht, die eine ruhige, konsistente Svelte-Oberfläche für Produkt, Daten und Inhalte aus einem System aufbauen möchten." />

<section class="docs-token-section" aria-labelledby="strengths-title">
  <div class="docs-section-heading"><div><h2 id="strengths-title">Worin RG Svelte UI stark ist</h2><p>Der Vorteil entsteht nicht durch eine möglichst lange Komponentenliste, sondern dadurch, dass die Teile im Alltag zusammenpassen.</p></div></div>
  <div class="docs-feature-grid">
    {#each strengths as strength}
      {@const Icon = strength.icon}
      <article class="docs-feature-card"><span><Icon size={18} /></span><h3>{strength.title}</h3><p>{strength.text}</p></article>
    {/each}
  </div>
</section>

<section class="docs-token-section" aria-labelledby="compare-title">
  <div class="docs-section-heading"><div><h2 id="compare-title">Die bewusste Alternative</h2><p>RG Svelte UI ist besonders passend, wenn diese Prioritäten wichtiger sind als maximale Breite oder ein vollständig neutrales Basissystem.</p></div></div>
  <div class="docs-a11y-grid">
    <article class="docs-a11y-card"><span><CheckCircle2 size={18} /></span><h2>Passend für</h2><ul class="docs-checklist"><li><CheckCircle2 size={17} aria-hidden="true" /><span>Svelte-5-Produkte mit Anwendung, Dashboard und Content in einer Marke.</span></li><li><CheckCircle2 size={17} aria-hidden="true" /><span>Teams, die einen gestalteten Startpunkt statt eines ungestylten Primitivesystems wünschen.</span></li><li><CheckCircle2 size={17} aria-hidden="true" /><span>Projekte, in denen eine durchgehende Dichte- und Theme-Logik wichtig ist.</span></li></ul></article>
    <article class="docs-a11y-card"><span><Scale size={18} /></span><h2>Weniger passend für</h2><ul class="docs-checklist"><li><CheckCircle2 size={17} aria-hidden="true" /><span>Ein komplett markenneutrales Fundament, das erst von Grund auf gestaltet werden soll.</span></li><li><CheckCircle2 size={17} aria-hidden="true" /><span>Sehr große Tabellen, bei denen Virtualisierung eine harte technische Anforderung ist.</span></li><li><CheckCircle2 size={17} aria-hidden="true" /><span>Projekte, die ausschließlich eine kleine Handvoll isolierter Primitives benötigen.</span></li></ul></article>
  </div>
</section>

<section class="docs-token-section" aria-labelledby="proof-title">
  <div class="docs-section-heading"><div><h2 id="proof-title">Nicht nur behauptet, sondern sichtbar</h2><p>Die Demo dokumentiert einzelne Bausteine und zeigt sie zugleich in vollständigen Produktflächen. So lassen sich Konsistenz, Dichte und Interaktionen direkt beurteilen.</p></div></div>
  <Callout title="Am besten im Kontext bewerten" tone="primary">Öffne Dashboard, DataTable und Patterns. Dort zeigt sich, ob die visuelle Sprache zu deinem Produkt passt – überzeugender als ein pauschales „besser als alle anderen“.</Callout>
  <div class="docs-home-actions"><Button onclick={() => window.location.href = `${base}/workbench`}>Gesamt-Workbench öffnen <ArrowRight size={16} /></Button><Button variant="outline" tone="neutral" onclick={() => window.location.href = `${base}/installation`}>Installation ansehen</Button></div>
</section>
