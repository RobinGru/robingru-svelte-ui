<script lang="ts">
  import {
    AppShell,
    Article,
    ArticleHeader,
    ArticleMeta,
    ArticleNavigation,
    AuthorCard,
    Badge,
    Blockquote,
    Breadcrumbs,
    Button,
    Callout,
    ChartCard,
    ChartLegend,
    CodeBlock,
    CommandPalette,
    DashboardGrid,
    DashboardSection,
    DataTable,
    DateRangePicker,
    DonutChart,
    FilterBar,
    FormField,
    IconButton,
    Kbd,
    KpiCard,
    MiniBarChart,
    Navbar,
    NewsletterCard,
    PageHeader,
    Prose,
    QuickActions,
    RelatedPosts,
    Select,
    ShareButtons,
    Sidebar,
    Sparkline,
    StatusSummary,
    TableOfContents,
    ThemeToggle,
    ToastViewport,
    Tooltip,
    toast,
    type ChartDatum,
    type DataTableColumn,
    type DataTableRowId,
    type DateRangePreset,
    type PostSummary,
    type StatusSummaryItem
  } from '$lib';
  import {
    Boxes,
    Check,
    Component,
    LayoutDashboard,
    Palette,
    Plus,
    Search,
    Settings,
    Sparkles
  } from '@lucide/svelte';

  let commandOpen = $state(false);
  let selectedOrders = $state<DataTableRowId[]>([]);
  let rangeFrom = $state('2026-08-01');
  let rangeTo = $state('2026-08-25');
  let segment = $state('all');
  let newsletterEmail = $state('');

  const segmentOptions = [
    { value: 'all', label: 'Alle Segmente' },
    { value: 'teams', label: 'Teams' },
    { value: 'solo', label: 'Solo' }
  ];

  const rangePresets: DateRangePreset[] = [
    { label: '7 Tage', from: '2026-08-19', to: '2026-08-25' },
    { label: '30 Tage', from: '2026-07-27', to: '2026-08-25' }
  ];

  const revenueData: ChartDatum[] = [
    { label: 'Mär', value: 32 },
    { label: 'Apr', value: 39 },
    { label: 'Mai', value: 36 },
    { label: 'Jun', value: 48 },
    { label: 'Jul', value: 54 },
    { label: 'Aug', value: 61 }
  ];

  const channelData: ChartDatum[] = [
    { label: 'Direkt', value: 44, tone: 'primary' },
    { label: 'Organisch', value: 31, tone: 'info' },
    { label: 'Referral', value: 17, tone: 'success' },
    { label: 'Kampagnen', value: 8, tone: 'warning' }
  ];

  const systemStatus: StatusSummaryItem[] = [
    { label: 'API', value: '99,99 %', detail: 'keine Störung', tone: 'success' },
    { label: 'Background Jobs', value: '12 ms', detail: 'Median', tone: 'success' },
    { label: 'E-Mail Queue', value: '38', detail: 'wird abgearbeitet', tone: 'warning' },
    { label: 'Fehlerrate', value: '0,08 %', detail: 'unter Grenzwert', tone: 'info' }
  ];

  const orderColumns: DataTableColumn[] = [
    { key: 'id', label: 'Auftrag', sortable: true, searchable: false, width: '7rem' },
    { key: 'customer', label: 'Kund:in', sortable: true, minWidth: '11rem' },
    { key: 'product', label: 'Produkt', sortable: true, minWidth: '11rem' },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      filterLabel: 'Status',
      filterOptions: [
        { value: 'Bezahlt', label: 'Bezahlt' },
        { value: 'Offen', label: 'Offen' },
        { value: 'Prüfung', label: 'Prüfung' },
        { value: 'Erstattet', label: 'Erstattet' }
      ],
      width: '8rem'
    },
    { key: 'plan', label: 'Plan', sortable: true, width: '7rem' },
    { key: 'amount', label: 'Betrag', sortable: true, searchable: false, align: 'end', width: '8rem' },
    { key: 'updated', label: 'Aktualisiert', sortable: true, width: '9rem', hidden: true }
  ];

  const orderRows: Record<string, unknown>[] = [
    { id: 'RG-1048', customer: 'Mara Klein', product: 'Workspace', status: 'Bezahlt', plan: 'Team', amount: 890, updated: '25.08.2026' },
    { id: 'RG-1047', customer: 'Studio Nord', product: 'Analytics', status: 'Offen', plan: 'Pro', amount: 420, updated: '25.08.2026' },
    { id: 'RG-1046', customer: 'Jonas Weber', product: 'Workspace', status: 'Prüfung', plan: 'Solo', amount: 190, updated: '24.08.2026' },
    { id: 'RG-1045', customer: 'Hain & Partner', product: 'Portal', status: 'Bezahlt', plan: 'Team', amount: 1240, updated: '24.08.2026' },
    { id: 'RG-1044', customer: 'Karo Labs', product: 'Analytics', status: 'Erstattet', plan: 'Pro', amount: 420, updated: '23.08.2026' },
    { id: 'RG-1043', customer: 'Lea Sommer', product: 'Workspace', status: 'Bezahlt', plan: 'Solo', amount: 190, updated: '23.08.2026' },
    { id: 'RG-1042', customer: 'Fjord Digital', product: 'Portal', status: 'Offen', plan: 'Team', amount: 1360, updated: '22.08.2026' },
    { id: 'RG-1041', customer: 'Büro Mitte', product: 'Workspace', status: 'Bezahlt', plan: 'Team', amount: 760, updated: '22.08.2026' },
    { id: 'RG-1040', customer: 'Lina Roth', product: 'Analytics', status: 'Prüfung', plan: 'Solo', amount: 160, updated: '21.08.2026' },
    { id: 'RG-1039', customer: 'Werkraum 7', product: 'Portal', status: 'Bezahlt', plan: 'Pro', amount: 980, updated: '21.08.2026' },
    { id: 'RG-1038', customer: 'Nils Hahn', product: 'Workspace', status: 'Offen', plan: 'Solo', amount: 190, updated: '20.08.2026' },
    { id: 'RG-1037', customer: 'Kollektiv West', product: 'Analytics', status: 'Bezahlt', plan: 'Team', amount: 1140, updated: '20.08.2026' },
    { id: 'RG-1036', customer: 'Mila Brandt', product: 'Portal', status: 'Bezahlt', plan: 'Pro', amount: 640, updated: '19.08.2026' },
    { id: 'RG-1035', customer: 'Form & Funktion', product: 'Workspace', status: 'Erstattet', plan: 'Team', amount: 820, updated: '18.08.2026' }
  ];

  const relatedPosts: PostSummary[] = [
    {
      title: 'Dichte ohne Enge: Tabellen für echte Arbeitsabläufe',
      href: '#table',
      excerpt: 'Wie Spaltensteuerung, Filter und klare Zustände zusammenarbeiten, ohne eine Enterprise-Grid-Engine einzubauen.',
      eyebrow: 'Data UI',
      date: '22. August 2026',
      dateTime: '2026-08-22',
      author: 'Editorial Team',
      minutes: 6,
      tags: ['DataTable', 'UX']
    },
    {
      title: 'Dashboard-Karten, die Entscheidungen unterstützen',
      href: '#dashboard',
      excerpt: 'KPIs, Trends und kleine Diagramme werden als zusammenhängende Informationshierarchie gestaltet.',
      eyebrow: 'Dashboard',
      date: '18. August 2026',
      dateTime: '2026-08-18',
      author: 'Editorial Team',
      minutes: 5,
      tags: ['KPI', 'Charts']
    },
    {
      title: 'Ein ruhiges Editorial-System für SvelteKit',
      href: '#editorial',
      excerpt: 'Prose, Metadaten, Inhaltsverzeichnis und verwandte Beiträge mit denselben Tokens wie die App-Oberfläche.',
      eyebrow: 'Content',
      date: '12. August 2026',
      dateTime: '2026-08-12',
      author: 'Editorial Team',
      minutes: 7,
      tags: ['Blog', 'SvelteKit']
    }
  ];

  const tocItems = [
    { label: 'Eine gemeinsame Sprache', href: '#common-language', level: 2 as const, active: true },
    { label: 'Dashboard und Editorial', href: '#dashboard-editorial', level: 2 as const },
    { label: 'Weniger Abhängigkeiten', href: '#fewer-dependencies', level: 2 as const }
  ];

  const exampleCode = `<script lang="ts">\n  import { Article, Prose, TableOfContents } from '@robingru/svelte-ui';\n<\/script>\n\n<Article>\n  <Prose>Dein Inhalt bleibt der Mittelpunkt.</Prose>\n</Article>`;

  const commands = [
    { id: 'dashboard', label: 'Dashboard öffnen', description: 'KPIs, Charts und Status', keywords: ['kpi', 'chart'], action: () => jumpTo('dashboard') },
    { id: 'table', label: 'DataTable öffnen', description: 'Suche, Auswahl, Filter und Spalten', keywords: ['data', 'orders'], action: () => jumpTo('table') },
    { id: 'editorial', label: 'Blog-Komponenten öffnen', description: 'Artikel, Prose und Posts', keywords: ['blog', 'content'], action: () => jumpTo('editorial') },
    { id: 'tokens', label: 'Designprinzipien öffnen', description: 'Robin Blue und Redundanzregeln', keywords: ['theme', 'blue'], action: () => jumpTo('principles') }
  ];

  let dashboardFilterCount = $derived(
    Number(segment !== 'all') + Number(Boolean(rangeFrom || rangeTo))
  );

  function jumpTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function statusTone(value: unknown): 'success' | 'warning' | 'info' | 'neutral' {
    if (value === 'Bezahlt') return 'success';
    if (value === 'Offen') return 'warning';
    if (value === 'Prüfung') return 'info';
    return 'neutral';
  }

  function formatCurrency(value: unknown) {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
      .format(Number(value ?? 0));
  }

  function resetDashboardFilters() {
    segment = 'all';
    rangeFrom = '';
    rangeTo = '';
  }

  function subscribe(email: string) {
    toast.push({
      title: 'Newsletter-Demo gespeichert',
      description: `${email} wurde nur lokal in der Workbench verarbeitet.`,
      tone: 'success'
    });
    newsletterEmail = '';
  }
</script>

<svelte:head>
  <title>RobinGru Svelte UI · Workbench</title>
  <meta
    name="description"
    content="Abgestimmte Svelte-Komponenten für Apps, Dashboards, Datentabellen und Editorial Content."
  />
</svelte:head>

{#snippet tableCell(value: unknown, row: Record<string, unknown>, column: DataTableColumn)}
  {#if column.key === 'status'}
    <Badge tone={statusTone(value)} dot>{String(value)}</Badge>
  {:else if column.key === 'amount'}
    <span class="tabular-number">{formatCurrency(value)}</span>
  {:else}
    {String(value ?? '—')}
  {/if}
{/snippet}

{#snippet tableActions(row: Record<string, unknown>)}
  <IconButton
    label={`Auftrag ${String(row.id)} öffnen`}
    size="sm"
    onclick={() => toast.push({ title: String(row.id), description: 'Detailansicht aus der Tabellenaktion.', tone: 'info' })}
  >
    <Settings size={15} aria-hidden="true" />
  </IconButton>
{/snippet}

<AppShell>
  {#snippet sidebar()}
    <Sidebar>
      {#snippet header()}
        <a class="brand" href="#top" aria-label="RobinGru Svelte UI Start">
          <span class="brand-mark">R</span>
          <span><strong>RobinGru</strong><small>Svelte UI</small></span>
        </a>
      {/snippet}

      <div class="rg-nav-section">
        <div class="rg-nav-label">Workbench</div>
        <a class="rg-nav-item" aria-current="page" href="#top"><LayoutDashboard size={17} />Übersicht</a>
        <a class="rg-nav-item" href="#dashboard"><Sparkles size={17} />Dashboard</a>
        <a class="rg-nav-item" href="#table"><Boxes size={17} />Datentabelle</a>
        <a class="rg-nav-item" href="#editorial"><Component size={17} />Blog & Content</a>
      </div>

      <div class="rg-nav-section">
        <div class="rg-nav-label">System</div>
        <a class="rg-nav-item" href="#principles"><Palette size={17} />Designprinzipien</a>
        <a class="rg-nav-item" href="#catalog"><Settings size={17} />Katalog <Badge tone="primary">116</Badge></a>
      </div>

      {#snippet footer()}
        <div class="version-card">
          <span class="status-dot"></span>
          <div><strong>v0.3.1</strong><small>116 Komponenten · ohne VirtualTable</small></div>
        </div>
      {/snippet}
    </Sidebar>
  {/snippet}

  {#snippet header()}
    <Navbar>
      {#snippet start()}
        <a class="mobile-brand" href="#top"><span class="brand-mark small">R</span> RobinGru UI</a>
      {/snippet}
      <button class="top-search" type="button" onclick={() => commandOpen = true}>
        <Search size={16} aria-hidden="true" />
        <span>Bereich oder Komponente suchen</span>
        <Kbd>⌘ K</Kbd>
      </button>
      {#snippet end()}
        <Tooltip content="Befehlspalette öffnen">
          <IconButton label="Befehlspalette" onclick={() => commandOpen = true}><Search size={17} /></IconButton>
        </Tooltip>
        <ThemeToggle storageKey="rg-docs-theme" />
      {/snippet}
    </Navbar>
  {/snippet}

  <div id="top" class="page-stack">
    <PageHeader
      eyebrow="Release · v0.3.1"
      title="Eine Oberfläche für App, Daten und Inhalt"
      description="116 aufeinander abgestimmte Svelte-Komponenten: ruhiges Robin Blue, klare Informationshierarchie und keine parallelen Komponentenbibliotheken."
    >
      {#snippet breadcrumbs()}
        <Breadcrumbs items={[{ label: 'Übersicht', href: '#top' }, { label: 'Workbench', current: true }]} />
      {/snippet}
      {#snippet actions()}
        <Button variant="outline" onclick={() => jumpTo('editorial')}>Blog ansehen</Button>
        <Button onclick={() => jumpTo('dashboard')}><Plus size={16} />Dashboard ansehen</Button>
      {/snippet}
    </PageHeader>

    <div class="release-strip" id="catalog">
      <div><strong>116</strong><span>eindeutige Komponenten</span></div>
      <div><strong>17</strong><span>Editorial-Bausteine</span></div>
      <div><strong>14</strong><span>Dashboard-Bausteine</span></div>
      <div><strong>1</strong><span>DataTable für normale Größen</span></div>
    </div>

    <Callout tone="info" title="Bewusst ohne VirtualTable">
      Die DataTable ist für typische Produkt-, CRM-, Admin- und Blog-Backoffice-Tabellen ausgelegt. Suche,
      Sortierung, Auswahl, Statusfilter, Spaltensteuerung, Sticky Header und Pagination bleiben in einer
      einzigen verständlichen Komponente.
    </Callout>

    <section id="dashboard" class="workbench-section" aria-labelledby="dashboard-title">
      <DashboardSection
        title="Dashboard-Komponenten"
        description="KPI, Trend, Status und Verteilung nutzen dieselben Abstände, Tokens und Zustände wie Formulare und Tabellen."
      >
        {#snippet action()}
          <Badge tone="success" dot>Live-Demo</Badge>
        {/snippet}

        <FilterBar title="Auswertung" activeCount={dashboardFilterCount} onreset={resetDashboardFilters}>
          <FormField label="Segment" for="segment">
            <Select id="segment" bind:value={segment} options={segmentOptions} />
          </FormField>
          <DateRangePicker
            bind:from={rangeFrom}
            bind:to={rangeTo}
            presets={rangePresets}
            onchange={() => toast.push({ title: 'Zeitraum aktualisiert', tone: 'info' })}
          />
        </FilterBar>

        <DashboardGrid columns={4} minItemWidth="13rem">
          <KpiCard label="Umsatz" value="61.240 €" trend="+12,4 %" direction="up" detail="gegen Vorperiode">
            {#snippet icon()}<LayoutDashboard size={16} aria-hidden="true" />{/snippet}
            {#snippet visual()}<Sparkline values={[31, 35, 34, 42, 46, 52, 61]} label="Umsatztrend" />{/snippet}
          </KpiCard>
          <KpiCard label="Aktive Teams" value="428" trend="+18" direction="up" detail="im Zeitraum">
            {#snippet icon()}<Component size={16} aria-hidden="true" />{/snippet}
            {#snippet visual()}<Sparkline values={[352, 361, 374, 390, 401, 410, 428]} tone="info" label="Teamtrend" />{/snippet}
          </KpiCard>
          <KpiCard label="Konversion" value="7,8 %" trend="+0,6 pp" direction="up" detail="Signup zu Paid">
            {#snippet icon()}<Sparkles size={16} aria-hidden="true" />{/snippet}
            {#snippet visual()}<Sparkline values={[6.2, 6.5, 6.4, 7.1, 7.0, 7.5, 7.8]} tone="success" label="Konversionstrend" />{/snippet}
          </KpiCard>
          <KpiCard label="Fehlerrate" value="0,08 %" trend="−0,04 pp" direction="down" inverseTrend detail="niedriger ist besser">
            {#snippet icon()}<Check size={16} aria-hidden="true" />{/snippet}
            {#snippet visual()}<Sparkline values={[0.18, 0.16, 0.15, 0.13, 0.12, 0.09, 0.08]} tone="success" label="Fehlerratentrend" />{/snippet}
          </KpiCard>
        </DashboardGrid>

        <div class="chart-layout">
          <ChartCard title="Monatlicher Umsatz" description="Kompakte Balken ohne zusätzliche Chart-Runtime." value="61.240 €" delta="+12,4 %" direction="up">
            {#snippet chart()}<MiniBarChart data={revenueData} label="Umsatz März bis August" height={205} />{/snippet}
            {#snippet footer()}Sechs Monate · Werte in Tsd. €{/snippet}
          </ChartCard>

          <ChartCard title="Akquisekanäle" description="Verteilung mit zugänglicher Legende." value="4.820" delta="+8,1 %" direction="up">
            {#snippet chart()}
              <div class="donut-layout">
                <DonutChart data={channelData} centerValue="4.820" centerLabel="Besuche" size={190} />
                <ChartLegend items={channelData} orientation="vertical" format={(value) => `${value} %`} />
              </div>
            {/snippet}
          </ChartCard>
        </div>

        <div class="dashboard-detail-grid">
          <StatusSummary
            title="Systemstatus"
            description="Kleine Zustände, keine separate Status-Card pro Kennzahl."
            items={systemStatus}
          />
          <div>
            <div class="minor-heading"><strong>Schnellaktionen</strong><span>Direkt aus dem Dashboard</span></div>
            <QuickActions
              items={[
                { label: 'Beitrag verfassen', description: 'Editorial-Vorlage öffnen', onselect: () => jumpTo('editorial') },
                { label: 'Aufträge prüfen', description: 'Zur gefilterten Tabelle', onselect: () => jumpTo('table') },
                { label: 'Tokens ansehen', description: 'Farben und Dichte prüfen', onselect: () => jumpTo('principles') }
              ]}
            />
          </div>
        </div>
      </DashboardSection>
    </section>

    <section id="table" class="workbench-section" aria-labelledby="table-title">
      <div class="section-heading">
        <div>
          <span class="section-kicker">Data UI</span>
          <h2 id="table-title">Eine starke DataTable, keine zweite Tabellenwelt</h2>
          <p>Für deine Größenordnung bleiben alle wichtigen Arbeitsfunktionen in einer Komponente und im Browser gut nachvollziehbar.</p>
        </div>
        <Badge tone={selectedOrders.length ? 'primary' : 'neutral'}>{selectedOrders.length} ausgewählt</Badge>
      </div>

      <DataTable
        columns={orderColumns}
        rows={orderRows}
        rowId="id"
        bind:selected={selectedOrders}
        selectable
        striped
        hover
        stickyHeader
        showColumnPicker
        pageSize={6}
        pageSizeOptions={[6, 10, 20]}
        maxHeight="32rem"
        caption="Aufträge und Zahlungsstatus"
        cell={tableCell}
        rowActions={tableActions}
        onrowclick={(row) => toast.push({ title: String(row.id), description: `${String(row.customer)} · ${String(row.product)}`, tone: 'info' })}
      />
    </section>

    <section id="editorial" class="workbench-section" aria-labelledby="editorial-title">
      <div class="section-heading">
        <div>
          <span class="section-kicker">Blog & Editorial</span>
          <h2 id="editorial-title">Blog-Komponenten mit derselben visuellen Sprache</h2>
          <p>Artikel werden nicht wie ein SaaS-Dashboard verkleidet. Typografie, Metadaten und Navigation geben dem Inhalt Ruhe.</p>
        </div>
        <Badge tone="primary">17 Komponenten</Badge>
      </div>

      <div class="editorial-canvas">
        <Article size="lg">
          {#snippet aside()}
            <TableOfContents items={tocItems} />
          {/snippet}

          <ArticleHeader
            eyebrow="Design System"
            title="Ein Svelte-UI-Kit muss Inhalt und Anwendung zusammenhalten"
            description="Arbeitsoberflächen, Daten und Editorial Content teilen dieselben Tokens – nicht dieselben Karten für alles."
          >
            {#snippet breadcrumbs()}
              <Breadcrumbs items={[{ label: 'Blog', href: '#editorial' }, { label: 'Design System', current: true }]} />
            {/snippet}
            {#snippet meta()}
              <ArticleMeta
                author="Robin Gru"
                published="25. August 2026"
                publishedDatetime="2026-08-25"
                minutes={7}
                category="SvelteKit"
              />
            {/snippet}
          </ArticleHeader>

          <Prose>
            <p>
              Ein gutes Design-System macht nicht jede Oberfläche gleich. Es sorgt dafür, dass sich Buttons,
              Formulare, Tabellen und redaktionelle Seiten <strong>verwandt</strong> anfühlen, während jeder
              Bereich seine eigene Aufgabe ernst nimmt.
            </p>

            <h2 id="common-language">Eine gemeinsame Sprache</h2>
            <p>
              Robin Blue markiert Fokus, Auswahl und wichtige Aktionen. Flächen bleiben überwiegend neutral,
              damit Kennzahlen, Tabelleninhalte und Texte nicht um Aufmerksamkeit konkurrieren.
            </p>

            <Blockquote source="Designprinzip" tone="primary">
              <p>Farbe soll Bedeutung tragen. Sie darf nicht die fehlende Informationshierarchie ersetzen.</p>
            </Blockquote>

            <h2 id="dashboard-editorial">Dashboard und Editorial</h2>
            <p>
              Im Dashboard zählt Vergleichbarkeit. Im Artikel zählen Rhythmus und Lesefluss. Beide verwenden
              dennoch dieselben Radien, Fokuszustände, Abstände und semantischen Farben.
            </p>

            <CodeBlock
              code={exampleCode}
              language="svelte"
              filename="+page.svelte"
              lineNumbers
              highlightLines={[2, 6]}
            />

            <h2 id="fewer-dependencies">Weniger Abhängigkeiten</h2>
            <p>
              Komplexes Fokusmanagement kommt aus Bits UI. Das optionale Skeleton-Stylesheet integriert
              Tailwind und Skeleton. Daneben entsteht keine zweite Toast-, Tabellen- oder
              Komponentenbibliothek ein.
            </p>

            <table>
              <thead><tr><th>Bereich</th><th>Priorität</th><th>Bausteine</th></tr></thead>
              <tbody>
                <tr><td>Blog</td><td>Lesefluss</td><td>Article, Prose, TOC, CodeBlock</td></tr>
                <tr><td>Dashboard</td><td>Vergleich</td><td>KpiCard, ChartCard, StatusSummary</td></tr>
                <tr><td>Backoffice</td><td>Bearbeitung</td><td>DataTable, FilterBar, Dialog</td></tr>
              </tbody>
            </table>
          </Prose>

          <ShareButtons url="https://example.com/design-system" title="Design-System" />

          <AuthorCard
            name="Robin Gru"
            role="Maintainer des Design-Systems"
            bio="Entwickelt ein ruhiges, Svelte-natives Komponenten-System für produktive Anwendungen und redaktionelle Inhalte."
          />

          <NewsletterCard
            bind:email={newsletterEmail}
            title="Release-Notizen statt Marketing-Dauerfeuer"
            description="Neue Komponenten, Migrationshinweise und relevante Designentscheidungen."
            privacyText="Workbench-Demo: Es werden keine Daten übertragen."
            onsubmit={subscribe}
          />

          <ArticleNavigation
            previous={{ title: 'Datentabellen mit klaren Zuständen', href: '#table' }}
            next={{ title: 'Dashboard-Komponenten sinnvoll kombinieren', href: '#dashboard' }}
          />
        </Article>
      </div>

      <RelatedPosts
        posts={relatedPosts}
        title="Weitere Muster"
        description="Blog-Karten verwenden dieselben Tokens, aber eine eigenständige Editorial-Hierarchie."
      />
    </section>

    <section id="principles" class="workbench-section principles" aria-labelledby="principles-title">
      <div class="section-heading">
        <div>
          <span class="section-kicker">Abstimmung</span>
          <h2 id="principles-title">Ein System, klar getrennte Verantwortungen</h2>
        </div>
      </div>
      <div class="principle-grid">
        <div><strong>Core</strong><p>Native Controls, Foundation, Navigation und Feedback bleiben leicht und universell.</p></div>
        <div><strong>Dashboard</strong><p>Leichte SVG-Charts und Kompositionen verwenden keine zusätzliche Chart-Runtime.</p></div>
        <div><strong>Editorial</strong><p>Prose und Artikelbausteine optimieren Lesbarkeit statt jeden Abschnitt einzurahmen.</p></div>
        <div><strong>DataTable</strong><p>Eine erweiterte Tabelle deckt typische Datenmengen ab; Virtualisierung ist bewusst nicht enthalten.</p></div>
      </div>
      <div class="dependency-row">
        <span><Check size={16} />kein daisyUI-Runtime-Paket</span>
        <span><Check size={16} />kein shadcn-Duplikat</span>
        <span><Check size={16} />keine zweite Toast-Library</span>
        <span><Check size={16} />keine VirtualTable</span>
      </div>
    </section>
  </div>
</AppShell>

<CommandPalette bind:open={commandOpen} items={commands} />
<ToastViewport />

<style>
  :global(body) { overflow-x: hidden; }
  :global(.rg-app-main) { max-width: 100vw; }
  :global(section[id]) { scroll-margin-top: 4.5rem; }

  .page-stack { display: grid; gap: 2.5rem; }
  .brand, .mobile-brand { display: flex; align-items: center; gap: .65rem; color: var(--rg-fg); text-decoration: none; }
  .brand > span:last-child { display: grid; line-height: 1.05; }
  .brand small { margin-top: .2rem; color: var(--rg-fg-subtle); font-size: var(--rg-text-2xs); }
  .brand-mark { display: grid; width: 2rem; height: 2rem; place-items: center; border-radius: .65rem; background: var(--rg-primary); color: var(--rg-primary-fg); font-weight: 820; box-shadow: var(--rg-shadow-xs); }
  .brand-mark.small { width: 1.7rem; height: 1.7rem; font-size: .75rem; }
  .mobile-brand { font-weight: 750; }
  .version-card { display: flex; align-items: center; gap: .6rem; padding: .65rem; border: 1px solid var(--rg-border); border-radius: var(--rg-radius-md); background: var(--rg-surface-sunken); }
  .version-card div { display: grid; line-height: 1.2; }
  .version-card small { color: var(--rg-fg-subtle); font-size: var(--rg-text-2xs); }
  .status-dot { width: .5rem; height: .5rem; border-radius: 50%; background: var(--rg-success); box-shadow: 0 0 0 3px color-mix(in oklab, var(--rg-success) 14%, transparent); }
  .top-search { display: flex; align-items: center; gap: .55rem; width: min(25rem, 100%); height: 2.25rem; padding: 0 .65rem; border: 1px solid var(--rg-border); border-radius: var(--rg-radius-sm); background: var(--rg-surface-sunken); color: var(--rg-fg-subtle); font-size: var(--rg-text-sm); cursor: pointer; }
  .top-search span { flex: 1; text-align: left; }

  .release-strip { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); overflow: hidden; border: 1px solid var(--rg-border); border-radius: var(--rg-radius-lg); background: var(--rg-surface); }
  .release-strip > div { display: grid; gap: .15rem; padding: 1rem 1.15rem; }
  .release-strip > div + div { border-left: 1px solid var(--rg-border); }
  .release-strip strong { color: var(--rg-fg); font-size: var(--rg-text-2xl); letter-spacing: -.03em; }
  .release-strip span { color: var(--rg-fg-subtle); font-size: var(--rg-text-xs); }

  .workbench-section { display: grid; gap: 1.25rem; padding-top: .5rem; }
  .workbench-section + .workbench-section { padding-top: 2.25rem; border-top: 1px solid var(--rg-border); }
  .section-heading { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 1rem; }
  .section-heading h2 { max-width: 28ch; margin: .2rem 0 0; color: var(--rg-fg); font-size: clamp(1.45rem, 3vw, 2rem); line-height: 1.16; letter-spacing: -.03em; }
  .section-heading p { max-width: 68ch; margin: .5rem 0 0; color: var(--rg-fg-muted); }
  .section-kicker { color: var(--rg-primary); font-size: var(--rg-text-xs); font-weight: 780; letter-spacing: .07em; text-transform: uppercase; }

  .chart-layout { display: grid; grid-template-columns: minmax(0, 1.45fr) minmax(18rem, .8fr); gap: 1rem; }
  .donut-layout { display: grid; grid-template-columns: auto minmax(9rem, 1fr); align-items: center; justify-content: center; gap: 1.25rem; }
  .dashboard-detail-grid { display: grid; grid-template-columns: minmax(18rem, .8fr) minmax(0, 1.2fr); gap: 1rem; }
  .minor-heading { display: grid; gap: .15rem; margin-bottom: .65rem; }
  .minor-heading span { color: var(--rg-fg-subtle); font-size: var(--rg-text-xs); }

  .tabular-number { font-variant-numeric: tabular-nums; font-weight: 680; }
  .editorial-canvas { padding: clamp(1rem, 4vw, 3rem); border: 1px solid var(--rg-border); border-radius: var(--rg-radius-lg); background: var(--rg-surface); }
  .editorial-canvas :global(.rg-newsletter) { margin-top: 2rem; }
  .editorial-canvas :global(.rg-author-card) { margin-top: 2rem; }

  .principle-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border: 1px solid var(--rg-border); border-radius: var(--rg-radius-lg); background: var(--rg-surface); }
  .principle-grid > div { padding: 1.15rem; }
  .principle-grid > div + div { border-left: 1px solid var(--rg-border); }
  .principle-grid p { margin: .35rem 0 0; color: var(--rg-fg-muted); font-size: var(--rg-text-sm); }
  .dependency-row { display: flex; flex-wrap: wrap; gap: .6rem 1.25rem; color: var(--rg-fg-muted); font-size: var(--rg-text-sm); }
  .dependency-row span { display: inline-flex; align-items: center; gap: .4rem; }
  .dependency-row :global(svg) { color: var(--rg-success); }

  @media (max-width: 70rem) {
    .chart-layout, .dashboard-detail-grid { grid-template-columns: minmax(0, 1fr); }
    .principle-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .principle-grid > div:nth-child(3) { border-left: 0; border-top: 1px solid var(--rg-border); }
    .principle-grid > div:nth-child(4) { border-top: 1px solid var(--rg-border); }
  }

  @media (max-width: 48rem) {
    .top-search { display: none; }
    .release-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .release-strip > div:nth-child(3) { border-left: 0; border-top: 1px solid var(--rg-border); }
    .release-strip > div:nth-child(4) { border-top: 1px solid var(--rg-border); }
    .donut-layout { grid-template-columns: minmax(0, 1fr); justify-items: center; }
  }

  @media (max-width: 36rem) {
    .release-strip, .principle-grid { grid-template-columns: minmax(0, 1fr); }
    .release-strip > div + div, .principle-grid > div + div { border-left: 0; border-top: 1px solid var(--rg-border); }
    .editorial-canvas { padding-inline: .85rem; }
  }
</style>
