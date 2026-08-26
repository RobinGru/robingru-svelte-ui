<script lang="ts">
  import { base } from '$app/paths';
  import { Bell, Check, Globe2, LockKeyhole, MessageSquare, Plus, UserPlus } from '@lucide/svelte';
  import {
    Avatar,
    Badge,
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    Checkbox,
    EmptyState,
    FormField,
    Input,
    PasswordInput,
    Stepper,
    Switch,
    Textarea
  } from '$lib';
  import CodePanel from '$docs/components/CodePanel.svelte';
  import SectionIntro from '$docs/components/SectionIntro.svelte';

  let email = $state('robin@example.de');
  let password = $state('');
  let remember = $state(true);
  let productUpdates = $state(true);
  let securityAlerts = $state(true);
  let weeklySummary = $state(false);
  let comment = $state('');

  const loginCode = `<Card>\n  <CardHeader title="Anmelden" description="Zurück in deinen Workspace." />\n  <CardContent>\n    <FormField label="E-Mail"><Input type="email" /></FormField>\n    <FormField label="Passwort"><PasswordInput /></FormField>\n  </CardContent>\n  <CardFooter><Button full>Anmelden</Button></CardFooter>\n</Card>`;

  const settingsCode = `<div class="settings-list">\n  <Switch bind:checked={productUpdates}>Produktupdates</Switch>\n  <Switch bind:checked={securityAlerts}>Sicherheitsmeldungen</Switch>\n  <Switch bind:checked={weeklySummary}>Wöchentliche Zusammenfassung</Switch>\n</div>`;
</script>

<svelte:head>
  <title>Patterns · RobinGru Svelte UI</title>
  <meta name="description" content="Zusammengesetzte UI-Patterns für Authentifizierung, Einstellungen, Kommentare und Onboarding." />
</svelte:head>

<SectionIntro
  eyebrow="Zusammengesetzte UI"
  title="Patterns statt Copy-paste-Blöcke."
  description="Patterns zeigen, wie Komponenten in echten Abläufen zusammenarbeiten. Sie sind bewusst nachvollziehbar aufgebaut und bleiben anpassbar – keine magischen, schwer wartbaren Mega-Komponenten."
/>

<div class="docs-pattern-grid">
  <article class="docs-pattern-card">
    <header><h2>Anmeldung</h2><p>Formularhierarchie, Fehlerfläche und klare Primäraktion.</p></header>
    <div class="docs-pattern-stage">
      <Card class="docs-auth-card">
        <CardHeader title="Willkommen zurück" description="Melde dich in deinem Workspace an." />
        <CardContent>
          <div class="rg-stack">
            <FormField label="E-Mail-Adresse" for="pattern-email" required>
              <Input id="pattern-email" type="email" bind:value={email} autocomplete="email" />
            </FormField>
            <FormField label="Passwort" for="pattern-password" required hint="Mindestens 12 Zeichen.">
              <PasswordInput id="pattern-password" bind:value={password} autocomplete="current-password" />
            </FormField>
            <Checkbox bind:checked={remember}>Angemeldet bleiben</Checkbox>
          </div>
        </CardContent>
        <CardFooter>
          <Button full>Anmelden</Button>
        </CardFooter>
      </Card>
    </div>
  </article>

  <article class="docs-pattern-card">
    <header><h2>Benachrichtigungseinstellungen</h2><p>Erklärende Texte und Controls bleiben visuell ruhig getrennt.</p></header>
    <div class="docs-pattern-stage">
      <Card>
        <CardHeader title="Benachrichtigungen" description="Wähle, welche Informationen relevant sind." />
        <CardContent>
          <div class="docs-settings-list">
            <div class="docs-settings-row"><div><strong>Produktupdates</strong><p>Neue Funktionen und wichtige Änderungen.</p></div><Switch bind:checked={productUpdates}><Bell size={15} /> Aktiv</Switch></div>
            <div class="docs-settings-row"><div><strong>Sicherheitsmeldungen</strong><p>Anmeldungen und kritische Kontobewegungen.</p></div><Switch bind:checked={securityAlerts}><LockKeyhole size={15} /> Aktiv</Switch></div>
            <div class="docs-settings-row"><div><strong>Wöchentliche Zusammenfassung</strong><p>Eine kompakte Übersicht jeden Montag.</p></div><Switch bind:checked={weeklySummary}>Zusammenfassung</Switch></div>
          </div>
        </CardContent>
        <CardFooter><Button size="sm">Änderungen speichern</Button><Button size="sm" variant="ghost" tone="neutral">Zurücksetzen</Button></CardFooter>
      </Card>
    </div>
  </article>

  <article class="docs-pattern-card">
    <header><h2>Kommentarverlauf</h2><p>Person, Zeitpunkt, Inhalt und Antwortfeld als lesbarer Ablauf.</p></header>
    <div class="docs-pattern-stage">
      <div class="docs-comments">
        <div class="docs-comment">
          <Avatar name="Mara Klein" initials="MK" size="sm" />
          <div class="docs-comment-body"><header><strong>Mara Klein</strong><Badge tone="neutral">vor 18 Min.</Badge></header><p>Die Informationsdichte passt. Beim Tabellenfilter würde ich die aktive Auswahl noch deutlicher benennen.</p></div>
        </div>
        <div class="docs-comment">
          <Avatar name="Jonas Weber" initials="JW" size="sm" />
          <div class="docs-comment-body"><header><strong>Jonas Weber</strong><Badge tone="neutral">vor 7 Min.</Badge></header><p>Erledigt. Der Zähler wird jetzt direkt im Filterkopf angezeigt.</p></div>
        </div>
        <FormField label="Antwort" for="pattern-comment" optional>
          <Textarea id="pattern-comment" bind:value={comment} placeholder="Gedanken ergänzen …" rows={3} />
        </FormField>
        <div class="rg-cluster"><Button size="sm"><MessageSquare size={15} /> Kommentar senden</Button><Button size="sm" variant="ghost" tone="neutral">Entwurf verwerfen</Button></div>
      </div>
    </div>
  </article>

  <article class="docs-pattern-card">
    <header><h2>Onboarding und leerer Zustand</h2><p>Fortschritt und nächste sinnvolle Aktion werden gemeinsam erklärt.</p></header>
    <div class="docs-pattern-stage">
      <div class="rg-stack">
        <Stepper current={2} steps={[{ label: 'Konto' }, { label: 'Workspace' }, { label: 'Team' }, { label: 'Fertig' }]} />
        <EmptyState title="Lade dein Team ein" description="Gemeinsame Projekte werden übersichtlicher, sobald die richtigen Personen Zugriff haben.">
          {#snippet icon()}<UserPlus size={20} />{/snippet}
          {#snippet actions()}<Button size="sm"><Plus size={15} /> Person einladen</Button><Button size="sm" variant="outline" tone="neutral"><Globe2 size={15} /> Link kopieren</Button>{/snippet}
        </EmptyState>
      </div>
    </div>
  </article>
</div>

<section class="docs-section">
  <div class="docs-section-heading"><div><h2>Patterns bleiben normale Svelte-Kompositionen</h2><p>Die Struktur ist im Quellcode sichtbar. Einzelne Teile lassen sich austauschen, ohne gegen einen versteckten internen State anzukämpfen.</p></div></div>
  <div class="docs-pattern-grid">
    <CodePanel code={loginCode} filename="LoginPattern.svelte" />
    <CodePanel code={settingsCode} filename="NotificationSettings.svelte" />
  </div>
</section>

<footer class="docs-footer"><div><span>Patterns verwenden nur öffentliche Exports.</span><a href={`${base}/dashboard`}>Vollständiges Dashboard öffnen</a></div></footer>
