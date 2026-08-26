<script lang="ts">
  import { base } from '$app/paths';
  import {
    Accessibility,
    Check,
    CircleHelp,
    Eye,
    Focus,
    Keyboard,
    MessageSquareText,
    MousePointer2,
    MoveRight,
    Volume2
  } from '@lucide/svelte';
  import {
    Alert,
    Button,
    Checkbox,
    FormField,
    IconButton,
    Input,
    Kbd,
    RadioGroup,
    Select,
    Switch,
    Textarea,
    Tooltip
  } from '$lib';
  import SectionIntro from '$docs/components/SectionIntro.svelte';

  let email = $state('');
  let message = $state('');
  let notifications = $state(true);
  let consent = $state(false);
  let role = $state('editor');
  let region = $state('de');
  let announcement = $state('Noch keine Aktion ausgeführt.');

  const roleOptions = [
    { value: 'viewer', label: 'Lesen', description: 'Kann Inhalte ansehen.' },
    { value: 'editor', label: 'Bearbeiten', description: 'Kann Inhalte erstellen und ändern.' },
    { value: 'admin', label: 'Administrieren', description: 'Kann Rollen und Einstellungen verwalten.' }
  ];
  const regionOptions = [
    { value: 'de', label: 'Deutschland' },
    { value: 'at', label: 'Österreich' },
    { value: 'ch', label: 'Schweiz' }
  ];

  const checks = [
    'Interaktive Elemente sind mit der Tastatur erreichbar.',
    'Icon-only Buttons besitzen einen zugänglichen Namen.',
    'Formularfelder werden über sichtbare Labels beschrieben.',
    'Fehler werden nicht ausschließlich über Farbe kommuniziert.',
    'Overlays verwalten Fokus und Escape-Verhalten über Bits UI.',
    'Bewegung wird bei prefers-reduced-motion reduziert.',
    'Tabellen verwenden Caption, Headings und native Zellen.',
    'Light und Dark Theme teilen semantische Zustände.'
  ];
</script>

<svelte:head>
  <title>Accessibility · RobinGru Svelte UI</title>
  <meta name="description" content="Interaktives Accessibility-Labor für Tastatur, Fokus, Formulare, Statusmeldungen und reduzierte Bewegung." />
</svelte:head>

<SectionIntro
  eyebrow="System"
  title="Accessibility-Labor"
  description="Die Seite macht Tastaturpfade, Fokuszustände, Labels, Fehlermeldungen und Statusansagen direkt prüfbar. Sie ist eine praktische Testfläche – keine formale Zertifizierung."
/>

<div class="docs-showcase">
  <div class="docs-a11y-grid">
    <article class="docs-a11y-card"><span><Keyboard size={18} /></span><h2>Tastatur zuerst</h2><p>Native Controls bleiben nativ. Komplexe Overlays delegieren Fokus, Pfeiltasten und Escape an zugängliche Primitives.</p></article>
    <article class="docs-a11y-card"><span><Focus size={18} /></span><h2>Sichtbarer Fokus</h2><p>Ein konsistenter blauer Ring zeigt Orientierung, ohne Hover und Fokus visuell gleichzusetzen.</p></article>
    <article class="docs-a11y-card"><span><MessageSquareText size={18} /></span><h2>Verständliche Rückmeldung</h2><p>Status, Fehler und Erfolg werden durch Text, Semantik und gegebenenfalls Icon vermittelt – nicht nur durch Farbe.</p></article>
    <article class="docs-a11y-card"><span><Eye size={18} /></span><h2>Robuste Themes</h2><p>Semantische Tokens halten Text, Ränder und Zustände in Light und Dark Mode nachvollziehbar.</p></article>
  </div>

  <section class="docs-lab-section" aria-labelledby="focus-lab-title">
    <div class="docs-section-heading">
      <div><span class="docs-eyebrow">Interaktiv</span><h2 id="focus-lab-title">Fokus- und Tastaturpfad</h2><p>Starte vor dem ersten Element und navigiere ausschließlich mit <Kbd>Tab</Kbd> und <Kbd>Shift</Kbd> + <Kbd>Tab</Kbd>.</p></div>
      <span class="docs-keyboard-hint"><Keyboard size={15} /> Keine Maus erforderlich</span>
    </div>
    <div class="docs-focus-lab">
      <Button onclick={() => announcement = 'Primäre Aktion wurde ausgelöst.'}>Primäre Aktion</Button>
      <Button variant="outline" tone="neutral" onclick={() => announcement = 'Sekundäre Aktion wurde ausgelöst.'}>Sekundär</Button>
      <IconButton label="Kontext-Hilfe öffnen" variant="ghost" onclick={() => announcement = 'Kontext-Hilfe wurde geöffnet.'}><CircleHelp size={17} /></IconButton>
      <Tooltip content="Zusätzliche Erläuterung"><CircleHelp size={17} aria-label="Hinweis" /></Tooltip>
      <a href="#form-lab" class="rg-button" data-variant="link" data-tone="primary">Zum Formular <MoveRight size={15} /></a>
    </div>
    <div class="docs-live-region" role="status" aria-live="polite"><Volume2 size={16} aria-hidden="true" /><span>{announcement}</span></div>
  </section>

  <section class="docs-lab-section" id="form-lab" aria-labelledby="form-lab-title">
    <div class="docs-section-heading"><div><span class="docs-eyebrow">Formulare</span><h2 id="form-lab-title">Labels, Hilfe und Fehler</h2><p>Alle Felder besitzen eine sichtbare Bezeichnung. Fehlertext und <code>aria-invalid</code> ergänzen die visuelle Markierung.</p></div></div>
    <div class="docs-a11y-form-grid">
      <form class="docs-a11y-form" onsubmit={(event) => { event.preventDefault(); announcement = email.includes('@') ? 'Formular wurde erfolgreich geprüft.' : 'Bitte die E-Mail-Adresse korrigieren.'; }}>
        <FormField label="E-Mail-Adresse" for="a11y-email" required error={email && !email.includes('@') ? 'Bitte eine vollständige E-Mail-Adresse eingeben.' : undefined} hint={!email ? 'Wird nur für Systemmeldungen verwendet.' : undefined}>
          <Input id="a11y-email" type="email" bind:value={email} invalid={Boolean(email && !email.includes('@'))} autocomplete="email" />
        </FormField>
        <FormField label="Region" for="a11y-region" hint="Beeinflusst Datums- und Zahlenformate.">
          <Select id="a11y-region" bind:value={region} options={regionOptions} />
        </FormField>
        <FormField label="Anmerkung" for="a11y-message" optional hint={`${message.length}/240 Zeichen`}>
          <Textarea id="a11y-message" bind:value={message} maxlength={240} rows={4} />
        </FormField>
        <RadioGroup bind:value={role} name="a11y-role" label="Berechtigungsrolle" options={roleOptions} />
        <Switch bind:checked={notifications} description="Kann später in den Einstellungen geändert werden.">Systemmeldungen erhalten</Switch>
        <Checkbox bind:checked={consent} description="Erforderlich, um die Demo-Aktion auszuführen.">Änderungen verstanden</Checkbox>
        <Button type="submit" disabled={!consent}>Eingaben prüfen</Button>
      </form>
      <div class="docs-a11y-form-notes">
        <Alert title="Fehler bleiben konkret" description="Das Feld benennt das Problem direkt. Ein roter Rand allein wäre nicht ausreichend." tone="danger" />
        <Alert title="Statusmeldungen werden angekündigt" description="Die Live-Region oberhalb aktualisiert sich nach Aktionen, ohne Fokus zu verschieben." tone="info" />
        <Alert title="Beschreibung und Label sind getrennt" description="Kurze Labels bleiben scanbar; zusätzliche Hinweise stehen als unterstützender Text darunter." tone="success" />
      </div>
    </div>
  </section>

  <section class="docs-lab-section" aria-labelledby="motion-title">
    <div class="docs-section-heading"><div><span class="docs-eyebrow">Motion</span><h2 id="motion-title">Reduzierte Bewegung</h2><p>Das Quadrat bewegt sich nur, wenn das Betriebssystem keine reduzierte Bewegung verlangt. Inhalt und Bedienung hängen nie von Animation ab.</p></div></div>
    <div class="docs-motion-demo" aria-label="Demonstration einer optionalen Bewegung"><i aria-hidden="true"></i></div>
  </section>

  <section class="docs-lab-section" aria-labelledby="checklist-title">
    <div class="docs-section-heading"><div><span class="docs-eyebrow">Prüfliste</span><h2 id="checklist-title">Standardmäßig berücksichtigt</h2><p>Diese Punkte werden in Komponenten und Demo-Routen sichtbar gemacht und sollten bei projektspezifischen Anpassungen erhalten bleiben.</p></div><Accessibility size={24} aria-hidden="true" /></div>
    <ul class="docs-checklist docs-checklist-wide">
      {#each checks as item}<li><Check size={17} aria-hidden="true" /><span>{item}</span></li>{/each}
    </ul>
  </section>

  <section class="docs-lab-section docs-a11y-note" aria-labelledby="audit-note-title">
    <div><MousePointer2 size={20} aria-hidden="true" /><div><h2 id="audit-note-title">Was zusätzlich projektspezifisch geprüft werden muss</h2><p>Inhalte, Kontraste eigener Markenfarben, Überschriftenstruktur, Alt-Texte, verständliche Fehlermeldungen und vollständige Nutzerabläufe können keine UI-Library allein garantieren. Vor Veröffentlichung gehören manuelle Tastatur- und Screenreader-Tests zum Projekt.</p></div></div>
  </section>
</div>

<footer class="docs-footer"><div><span>Zugänglichkeit bleibt Teil der Implementierung, nicht ein späteres Theme.</span><a href={`${base}/patterns`}>Interaktionen in Patterns testen</a></div></footer>
