<script lang="ts">
  import { base } from '$app/paths';
  import { Braces, CircleDot, Grid3X3, MoonStar, Ruler, SunMedium, Type } from '@lucide/svelte';
  import { Badge, Button, Callout, SegmentedControl } from '$lib';
  import CodePanel from '$docs/components/CodePanel.svelte';
  import SectionIntro from '$docs/components/SectionIntro.svelte';

  let previewTheme = $state<'light' | 'dark'>('light');

  const themeOptions = [
    { value: 'light', label: 'Robin' },
    { value: 'dark', label: 'Robin Dark' }
  ];

  const colorSteps = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const blueScale = colorSteps.map((step) => ({
    name: `Blue ${step}`,
    variable: `--rg-blue-${step}`,
    darkText: step >= 500
  }));

  const slateScale = [0, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((step) => ({
    name: `Slate ${step}`,
    variable: `--rg-slate-${step}`,
    darkText: step >= 500
  }));

  const statusScales = [
    { name: 'Cyan', key: 'cyan', description: 'Information, sekundäre Datenreihe und unterstützende Hinweise.' },
    { name: 'Green', key: 'green', description: 'Erfolg, bestätigte Zustände und positive Kennzahlen.' },
    { name: 'Amber', key: 'amber', description: 'Warnungen, Aufmerksamkeit und begrenzte Risiken.' },
    { name: 'Red', key: 'red', description: 'Fehler, destruktive Aktionen und kritische Zustände.' }
  ].map((scale) => ({
    ...scale,
    tokens: colorSteps.map((step) => ({
      name: `${scale.name} ${step}`,
      variable: `--rg-${scale.key}-${step}`,
      darkText: step >= 600
    }))
  }));

  const semanticTokens = [
    { label: 'Hintergrund', variable: '--rg-bg' },
    { label: 'Oberfläche', variable: '--rg-surface' },
    { label: 'Eingesunken', variable: '--rg-surface-sunken' },
    { label: 'Text', variable: '--rg-fg' },
    { label: 'Text gedämpft', variable: '--rg-fg-muted' },
    { label: 'Rand', variable: '--rg-border' },
    { label: 'Primär', variable: '--rg-primary' },
    { label: 'Primär weich', variable: '--rg-primary-soft' },
    { label: 'Info', variable: '--rg-info' },
    { label: 'Info weich', variable: '--rg-info-soft' },
    { label: 'Erfolg', variable: '--rg-success' },
    { label: 'Erfolg weich', variable: '--rg-success-soft' },
    { label: 'Warnung', variable: '--rg-warning' },
    { label: 'Warnung weich', variable: '--rg-warning-soft' },
    { label: 'Gefahr', variable: '--rg-danger' },
    { label: 'Gefahr weich', variable: '--rg-danger-soft' }
  ];

  const buttonTones = [
    { label: 'Primary', tone: 'primary' as const },
    { label: 'Cyan', tone: 'cyan' as const },
    { label: 'Green', tone: 'green' as const },
    { label: 'Amber', tone: 'amber' as const },
    { label: 'Red', tone: 'red' as const }
  ];

  const radii = [
    { label: 'XS', variable: '--rg-radius-xs' },
    { label: 'SM', variable: '--rg-radius-sm' },
    { label: 'MD', variable: '--rg-radius-md' },
    { label: 'LG', variable: '--rg-radius-lg' },
    { label: 'XL', variable: '--rg-radius-xl' },
    { label: 'Pill', variable: '--rg-radius-pill' }
  ];

  const shadows = [
    { label: 'XS', variable: '--rg-shadow-xs' },
    { label: 'SM', variable: '--rg-shadow-sm' },
    { label: 'MD', variable: '--rg-shadow-md' },
    { label: 'LG', variable: '--rg-shadow-lg' }
  ];

  const typeScale = [
    { label: 'XS', variable: '--rg-text-xs', sample: 'Metadaten und Hinweise' },
    { label: 'SM', variable: '--rg-text-sm', sample: 'Sekundärer Fließtext' },
    { label: 'MD', variable: '--rg-text-md', sample: 'Standardoberfläche' },
    { label: 'LG', variable: '--rg-text-lg', sample: 'Einleitung und Lead' },
    { label: 'XL', variable: '--rg-text-xl', sample: 'Kleine Überschrift' },
    { label: '2XL', variable: '--rg-text-2xl', sample: 'Bereichsüberschrift' }
  ];

  const spaces = [1, 2, 3, 4, 5, 6, 8, 10, 12].map((step) => ({
    label: `Space ${step}`,
    variable: `--rg-space-${step}`
  }));

  const textOpacities = [100, 90, 75, 50, 25];

  const tokenCode = `@import '@robingru/svelte-ui/tokens.css';

.my-panel {
  color: var(--rg-fg);
  background: var(--rg-surface);
  border: 1px solid var(--rg-border);
  border-radius: var(--rg-radius-lg);
  box-shadow: var(--rg-shadow-sm);
  padding: var(--rg-space-5);
}`;
</script>

<svelte:head>
  <title>Design Tokens · RobinGru Svelte UI</title>
  <meta name="description" content="Farben, Typografie, Abstände, Radien, Schatten und Motion-Tokens von RobinGru Svelte UI." />
</svelte:head>

<SectionIntro
  eyebrow="System"
  title="Design Tokens"
  description="Die Komponenten teilen eine kleine, semantische Token-Schicht. Die hellblaue Palette setzt Orientierung; neutrale Flächen tragen Inhalt und Daten. Alle Beispiele reagieren live auf das gewählte Robin-Theme."
>
  {#snippet actions()}
    <SegmentedControl bind:value={previewTheme} options={themeOptions} label="Token-Theme" />
  {/snippet}
</SectionIntro>

<div class="docs-token-preview" data-theme={previewTheme === 'dark' ? 'robin-dark' : 'robin'}>
  <div class="docs-token-preview-header">
    <div>
      {#if previewTheme === 'dark'}<MoonStar size={18} />{:else}<SunMedium size={18} />{/if}
      <strong>{previewTheme === 'dark' ? 'Robin Dark' : 'Robin'}</strong>
    </div>
    <Badge tone="primary">Live-Kontext</Badge>
  </div>

  <section class="docs-token-section" aria-labelledby="blue-scale">
    <h2 id="blue-scale">Robin Blue</h2>
    <p>Eine ruhige, leicht kühle Skala für Fokus, Links, aktive Navigation, Auswahl und primäre Aktionen.</p>
    <div class="docs-color-scale docs-color-scale-blue">
      {#each blueScale as token}
        <div class="docs-color-token" style={`--token:var(${token.variable});--token-text:${token.darkText ? 'white' : 'var(--rg-slate-900)'}`}>
          <strong>{token.name.replace('Blue ', '')}</strong><small>{token.variable}</small>
        </div>
      {/each}
    </div>
  </section>

  <section class="docs-token-section" aria-labelledby="slate-scale">
    <h2 id="slate-scale">Robin Slate</h2>
    <p>Neutrale Ebenen für längere Texte, Tabellen, Cards und App-Oberflächen.</p>
    <div class="docs-color-scale docs-color-scale-slate">
      {#each slateScale as token}
        <div class="docs-color-token" style={`--token:var(${token.variable});--token-text:${token.darkText ? 'white' : 'var(--rg-slate-900)'}`}>
          <strong>{token.name.replace('Slate ', '')}</strong><small>{token.variable}</small>
        </div>
      {/each}
    </div>
  </section>

  <section class="docs-token-section" aria-labelledby="status-scales">
    <h2 id="status-scales">Statuspaletten</h2>
    <p>Jede Statusfarbe besitzt dieselben Helligkeitsstufen. Komponenten greifen in der Regel auf die semantischen Tokens darunter zu; die Skalen stehen für Charts, eigene Datenvisualisierungen und kontrollierte Erweiterungen bereit.</p>
    <div class="docs-palette-grid">
      {#each statusScales as scale}
        <section class="docs-palette-group" aria-label={`${scale.name}-Skala`}>
          <h3>{scale.name}</h3>
          <div class="docs-color-scale">
            {#each scale.tokens as token}
              <div class="docs-color-token" style={`--token:var(${token.variable});--token-text:${token.darkText ? 'white' : 'var(--rg-slate-900)'}`}>
                <strong>{token.name.replace(`${scale.name} `, '')}</strong><small>{token.variable}</small>
              </div>
            {/each}
          </div>
        </section>
      {/each}
    </div>
  </section>

  <section class="docs-token-section" aria-labelledby="semantic-colors">
    <h2 id="semantic-colors">Semantische Farben</h2>
    <p>Komponenten verwenden Bedeutungen statt fester Palettenstufen. Dadurch wechseln Light und Dark Mode aus derselben API.</p>
    <div class="docs-semantic-grid">
      {#each semanticTokens as token}
        <div class="docs-semantic-token">
          <i style={`--token:var(${token.variable})`} aria-hidden="true"></i>
          <div class="docs-token-caption"><strong>{token.label}</strong><code>{token.variable}</code></div>
        </div>
      {/each}
    </div>
  </section>

  <section class="docs-token-section" aria-labelledby="component-accents">
    <h2 id="component-accents">Akzent-Töne in Komponenten</h2>
    <p>Die Palette steht direkt über <code>tone</code> bereit – bei Buttons, IconButtons, SplitButtons, Badges, Chips, Tags, Hinweisen, Aktivitätsmarkierungen und Diagrammen. Verwende <code>primary</code> für die eine Hauptaktion; weitere Töne geben Status und Kontext, nicht beliebige Dekoration, wieder.</p>
    <div class="rg-cluster">
      {#each buttonTones as button}
        <Button tone={button.tone}>{button.label}</Button>
      {/each}
    </div>
  </section>

  <section class="docs-token-section" aria-labelledby="spacing-scale">
    <h2 id="spacing-scale">Spacing</h2>
    <p>Eine bewusst kleine Skala verhindert zufällige Abstände zwischen Blog, Dashboard und Formularen.</p>
    <div class="docs-spacing-scale">
      {#each spaces as token}
        <div class="docs-spacing-token">
          <i style={`--token:var(${token.variable})`} aria-hidden="true"></i>
          <div class="docs-token-caption"><strong>{token.label}</strong><code>{token.variable}</code></div>
        </div>
      {/each}
    </div>
  </section>

  <section class="docs-token-section" aria-labelledby="radius-scale">
    <h2 id="radius-scale">Radien</h2>
    <p>Controls bleiben kompakt, Container etwas weicher. Pill-Radien sind für Badges und echte Status-Chips reserviert.</p>
    <div class="docs-radius-grid">
      {#each radii as token}
        <div class="docs-radius-token" style={`--token:var(${token.variable})`}>
          <div class="docs-token-caption"><strong>{token.label}</strong><code>{token.variable}</code></div>
        </div>
      {/each}
    </div>
  </section>

  <section class="docs-token-section" aria-labelledby="shadow-scale">
    <h2 id="shadow-scale">Schatten</h2>
    <p>Schatten markieren echte Ebenen wie Popover oder Dialoge. Normale Cards funktionieren primär über Rand und Oberfläche.</p>
    <div class="docs-shadow-grid">
      {#each shadows as token}
        <div class="docs-shadow-token" style={`--token:var(${token.variable})`}>
          <div class="docs-token-caption"><strong>{token.label}</strong><code>{token.variable}</code></div>
        </div>
      {/each}
    </div>
  </section>

  <section class="docs-token-section" aria-labelledby="type-scale">
    <h2 id="type-scale">Typografie</h2>
    <p>Die Interface-Skala ist kompakt; redaktionelle Überschriften werden innerhalb von <code>Prose</code> separat abgestimmt.</p>
    <div class="docs-type-scale">
      {#each typeScale as token}
        <div class="docs-type-token" style={`--token:var(${token.variable})`}>
          <span>{token.sample}</span>
          <div class="docs-token-caption"><strong>{token.label}</strong><code>{token.variable}</code></div>
        </div>
      {/each}
    </div>
  </section>

  <section class="docs-token-section" aria-labelledby="text-opacity">
    <h2 id="text-opacity">Text-Deckkraft</h2>
    <p>Für abgestufte Metadaten oder unterstützende Beschriftungen stehen kleine Utilities bereit. Setze sie nur auf Text-Elemente, damit Icons und interaktive Inhalte ihre eigene Sichtbarkeit behalten.</p>
    <div class="docs-semantic-grid">
      {#each textOpacities as opacity}
        <div class="docs-semantic-token">
          <span class={`rg-text-opacity-${opacity}`}>Sekundäre Information</span>
          <div class="docs-token-caption"><strong>{opacity} %</strong><code>.rg-text-opacity-{opacity}</code></div>
        </div>
      {/each}
    </div>
  </section>

  <section class="docs-token-section docs-token-principles" aria-labelledby="token-principles">
    <h2 id="token-principles">Anwendungsregeln</h2>
    <div class="docs-a11y-grid">
      <article class="docs-a11y-card"><span><CircleDot size={18} /></span><h3>Semantisch auswählen</h3><p><code>--rg-primary</code> statt einer festen Blue-Stufe verwenden, sobald eine Komponente themenfähig sein soll.</p></article>
      <article class="docs-a11y-card"><span><Grid3X3 size={18} /></span><h3>Skalen wiederverwenden</h3><p>Abstände und Radien nicht pro Route neu erfinden. Dadurch bleiben Content und App-Flächen verwandt.</p></article>
      <article class="docs-a11y-card"><span><Ruler size={18} /></span><h3>Dichte zentral steuern</h3><p><code>data-density="compact"</code> verändert Control-Höhen systemweit, nicht über lokale Sonderklassen.</p></article>
      <article class="docs-a11y-card"><span><Type size={18} /></span><h3>Lesbarkeit priorisieren</h3><p>Interface-Text bleibt kompakt; lange Artikel erhalten eine begrenzte Zeilenlänge und eigene Prose-Abstände.</p></article>
    </div>
  </section>
</div>

<div class="docs-token-code-grid">
  <Callout title="Tokens sind die stabile API" tone="info">
    Komponentenklassen dürfen sich intern entwickeln. Semantische <code>--rg-*</code>-Variablen sind die vorgesehene Stelle für kontrollierte Anpassungen.
  </Callout>
  <CodePanel title="Eigene Oberfläche" code={tokenCode} language="css" />
</div>

<footer class="docs-footer"><div><span>Eine Quelle für Farbe, Raum und Hierarchie.</span><a href={`${base}/components`}>Komponenten im Token-Kontext ansehen</a></div></footer>
