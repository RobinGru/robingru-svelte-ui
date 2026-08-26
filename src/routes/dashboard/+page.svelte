<script lang="ts">
  import { base } from '$app/paths';
  import { Download, Plus, Settings, UserPlus } from '@lucide/svelte';
  import {
    Badge,
    Button,
    ChartCard,
    ChartLegend,
    DashboardGrid,
    DashboardSection,
    DataTable,
    DateRangePicker,
    DonutChart,
    FilterBar,
    IconButton,
    KpiCard,
    MiniBarChart,
    ProgressRing,
    QuickActions,
    Select,
    Sparkline,
    StatusSummary,
    type ChartDatum,
    type DataTableColumn,
    type DataTableRowId,
    type StatusSummaryItem
  } from '$lib';
  import SectionIntro from '$docs/components/SectionIntro.svelte';

  let segment = $state('all');
  let from = $state('2026-08-01');
  let to = $state('2026-08-26');
  let selected = $state<DataTableRowId[]>([]);

  const segmentOptions = [
    { value: 'all', label: 'Alle Segmente' },
    { value: 'team', label: 'Team' },
    { value: 'solo', label: 'Solo' },
    { value: 'enterprise', label: 'Enterprise' }
  ];
  const presets = [
    { label: '7 Tage', from: '2026-08-20', to: '2026-08-26' },
    { label: '30 Tage', from: '2026-07-28', to: '2026-08-26' },
    { label: 'Quartal', from: '2026-06-01', to: '2026-08-26' }
  ];
  const revenue: ChartDatum[] = [
    { label: 'Mär', value: 32 }, { label: 'Apr', value: 39 }, { label: 'Mai', value: 36 },
    { label: 'Jun', value: 48 }, { label: 'Jul', value: 54 }, { label: 'Aug', value: 61 }
  ];
  const channels: ChartDatum[] = [
    { label: 'Direkt', value: 44, tone: 'primary' },
    { label: 'Organisch', value: 31, tone: 'info' },
    { label: 'Referral', value: 17, tone: 'success' },
    { label: 'Kampagnen', value: 8, tone: 'warning' }
  ];
  const statusItems: StatusSummaryItem[] = [
    { label: 'API', value: '99,99 %', detail: 'keine Störung', tone: 'success' },
    { label: 'Background Jobs', value: '12 ms', detail: 'Median', tone: 'success' },
    { label: 'E-Mail Queue', value: '38', detail: 'wird abgearbeitet', tone: 'warning' },
    { label: 'Fehlerrate', value: '0,08 %', detail: 'unter Grenzwert', tone: 'info' }
  ];
  const actions = [
    { label: 'Projekt anlegen', description: 'Neuen Workspace starten', onselect: () => undefined },
    { label: 'Mitglied einladen', description: 'Teamzugriff verwalten', onselect: () => undefined },
    { label: 'Report exportieren', description: 'CSV oder PDF vorbereiten', onselect: () => undefined }
  ];
  const columns: DataTableColumn[] = [
    { key: 'account', label: 'Konto', sortable: true, minWidth: '11rem' },
    { key: 'plan', label: 'Plan', sortable: true, width: '7rem' },
    {
      key: 'status', label: 'Status', sortable: true, width: '8rem', filterLabel: 'Status',
      filterOptions: [{ value: 'Aktiv', label: 'Aktiv' }, { value: 'Prüfung', label: 'Prüfung' }, { value: 'Pausiert', label: 'Pausiert' }]
    },
    { key: 'members', label: 'Mitglieder', sortable: true, align: 'end', width: '7rem' },
    { key: 'mrr', label: 'MRR', sortable: true, searchable: false, align: 'end', width: '8rem' },
    { key: 'updated', label: 'Aktualisiert', sortable: true, width: '9rem', hidden: true }
  ];
  const rows = [
    { id: 1, account: 'Studio Nord', plan: 'Team', status: 'Aktiv', members: 18, mrr: 890, updated: '26.08.2026' },
    { id: 2, account: 'Fjord Digital', plan: 'Pro', status: 'Aktiv', members: 9, mrr: 640, updated: '26.08.2026' },
    { id: 3, account: 'Werkraum 7', plan: 'Team', status: 'Prüfung', members: 14, mrr: 760, updated: '25.08.2026' },
    { id: 4, account: 'Karo Labs', plan: 'Solo', status: 'Pausiert', members: 1, mrr: 90, updated: '25.08.2026' },
    { id: 5, account: 'Büro Mitte', plan: 'Team', status: 'Aktiv', members: 21, mrr: 1040, updated: '24.08.2026' },
    { id: 6, account: 'Form & Funktion', plan: 'Pro', status: 'Aktiv', members: 7, mrr: 520, updated: '24.08.2026' },
    { id: 7, account: 'Kollektiv West', plan: 'Team', status: 'Prüfung', members: 16, mrr: 820, updated: '23.08.2026' },
    { id: 8, account: 'Hain & Partner', plan: 'Pro', status: 'Aktiv', members: 11, mrr: 690, updated: '23.08.2026' }
  ];

  let activeFilterCount = $derived(Number(segment !== 'all') + Number(Boolean(from || to)));

  function resetFilters() {
    segment = 'all';
    from = '';
    to = '';
  }
  function statusTone(value: unknown) {
    if (value === 'Aktiv') return 'success' as const;
    if (value === 'Prüfung') return 'warning' as const;
    return 'neutral' as const;
  }
  function currency(value: unknown) {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Number(value));
  }
</script>

{#snippet cell(value: unknown, row: Record<string, unknown>, column: DataTableColumn)}
  {#if column.key === 'status'}
    <Badge tone={statusTone(value)} dot>{String(value)}</Badge>
  {:else if column.key === 'mrr'}
    <span class="tabular-number">{currency(value)}</span>
  {:else}
    {String(value ?? '—')}
  {/if}
{/snippet}

{#snippet rowActions(row: Record<string, unknown>)}
  <IconButton label={`${String(row.account)} verwalten`} size="sm" onclick={() => undefined}><Settings size={15} /></IconButton>
{/snippet}

<svelte:head>
  <title>Dashboard Demo · RobinGru Svelte UI</title>
  <meta name="description" content="Vollständiges RobinGru Dashboard mit Filtern, KPIs, Charts, Status und DataTable." />
</svelte:head>

<SectionIntro eyebrow="Vollständige Live-Demo" title="Operatives Dashboard" description="Eine realistische Dashboard-Seite mit Filterleiste, Kennzahlen, kleinen Visualisierungen, Systemstatus und einer normalen paginierten Tabelle. Blau bleibt Orientierung und wird nicht zur Hintergrundtapete.">
  {#snippet actions()}<Button variant="outline" tone="neutral"><Download size={15} /> Export</Button><Button><Plus size={15} /> Projekt</Button>{/snippet}
</SectionIntro>

<div class="docs-showcase docs-dashboard-layout">
  <FilterBar title="Berichtsfilter" activeCount={activeFilterCount} onreset={resetFilters}>
    <div class="docs-showcase-filter"><span>Segment</span><Select bind:value={segment} options={segmentOptions} /></div>
    <DateRangePicker bind:from bind:to {presets} />
  </FilterBar>

  <DashboardSection title="Kernkennzahlen" description="Wert, Veränderung und ein kleiner Verlauf bilden eine gemeinsame Informationshierarchie.">
    <DashboardGrid columns={4}>
      <KpiCard label="Umsatz" value="61.240 €" trend="+12,4 %" direction="up" detail="gegen Vorperiode">
        {#snippet visual()}<Sparkline values={[31, 35, 34, 42, 46, 52, 61]} label="Umsatztrend" />{/snippet}
      </KpiCard>
      <KpiCard label="Aktive Teams" value="428" trend="+18" direction="up" detail="im Zeitraum">
        {#snippet visual()}<Sparkline values={[352, 361, 374, 390, 401, 410, 428]} tone="info" label="Teamtrend" />{/snippet}
      </KpiCard>
      <KpiCard label="Conversion" value="7,8 %" trend="+0,6 pp" direction="up" detail="Signup zu Paid">
        {#snippet visual()}<Sparkline values={[6.2, 6.5, 6.4, 7.1, 7.0, 7.5, 7.8]} tone="success" label="Conversiontrend" />{/snippet}
      </KpiCard>
      <KpiCard label="Fehlerrate" value="0,08 %" trend="−0,04 pp" direction="down" inverseTrend detail="niedriger ist besser">
        {#snippet visual()}<Sparkline values={[0.18, 0.16, 0.15, 0.13, 0.12, 0.09, 0.08]} tone="success" label="Fehlerratentrend" />{/snippet}
      </KpiCard>
    </DashboardGrid>
  </DashboardSection>

  <div class="docs-dashboard-wide">
    <ChartCard title="Monatlicher Umsatz" description="Kompakte Balken ohne zusätzliche Chart-Runtime." value="61.240 €" delta="+12,4 %" direction="up">
      {#snippet chart()}<MiniBarChart data={revenue} label="Umsatz März bis August" height={210} />{/snippet}
      {#snippet footer()}<span>Werte in Tausend Euro · Stand 26. August 2026</span>{/snippet}
    </ChartCard>

    <ChartCard title="Akquisekanäle" description="Verteilung mit zugänglicher Legende." value="4.820" delta="+8,1 %" direction="up">
      {#snippet chart()}
        <div style="display:grid;place-items:center;gap:1rem">
          <DonutChart data={channels} centerValue="4.820" centerLabel="Besuche" size={170} />
          <ChartLegend items={channels} orientation="vertical" />
        </div>
      {/snippet}
    </ChartCard>
  </div>

  <DashboardGrid columns={3}>
    <ProgressRing value={74} label="Monatsziel" detail="74 von 100 Punkten" />
    <StatusSummary title="Systemstatus" items={statusItems} compact />
    <QuickActions items={actions} />
  </DashboardGrid>

  <DashboardSection title="Aktive Konten" description="Die Tabelle bleibt die zentrale Arbeitsfläche und ist nicht bloß eine dekorative Vorschau.">
    <DataTable
      {columns}
      {rows}
      bind:selected
      selectable
      pageSize={5}
      pageSizeOptions={[5, 10, 25]}
      caption="Aktive Kundenkonten"
      maxHeight="25rem"
      {cell}
      {rowActions}
    />
  </DashboardSection>
</div>

<footer class="docs-footer"><div><span>{selected.length} Tabellenzeilen ausgewählt</span><a href={`${base}/data`}>DataTable im Detail ansehen</a></div></footer>
