<script lang="ts">
  import { base } from '$app/paths';
  import { Archive, CircleHelp, Download, MoreHorizontal, RotateCcw, UserRound } from '@lucide/svelte';
  import {
    Avatar,
    Badge,
    Button,
    Callout,
    Card,
    CardContent,
    CardHeader,
    DashboardGrid,
    DataTable,
    Drawer,
    IconButton,
    KpiCard,
    type DataTableColumn,
    type DataTableRowId
  } from '$lib';
  import SectionIntro from '$docs/components/SectionIntro.svelte';

  type ProjectRow = {
    id: number;
    project: string;
    owner: string;
    initials: string;
    status: 'Aktiv' | 'Prüfung' | 'Pausiert';
    plan: 'Solo' | 'Team' | 'Business';
    members: number;
    usage: number;
    mrr: number;
    updated: string;
  };

  const projectNames = [
    'Atlas', 'Bergamot', 'Cobalt', 'Dockyard', 'Evergreen', 'Fjord', 'Ginkgo', 'Harbor',
    'Iris', 'Juniper', 'Kiesel', 'Lumen', 'Mistral', 'Northstar', 'Orbit', 'Pine',
    'Quartz', 'Riviera', 'Saffron', 'Tundra', 'Umbra', 'Vela', 'Willow', 'Yarrow'
  ];
  const owners = [
    ['Mara Klein', 'MK'], ['Jonas Weber', 'JW'], ['Aylin Demir', 'AD'], ['Noah Stein', 'NS'],
    ['Lea Hoffmann', 'LH'], ['Robin Graf', 'RG'], ['Mika Lorenz', 'ML'], ['Sina Becker', 'SB']
  ] as const;
  const statuses: ProjectRow['status'][] = ['Aktiv', 'Aktiv', 'Aktiv', 'Prüfung', 'Pausiert'];
  const plans: ProjectRow['plan'][] = ['Solo', 'Team', 'Team', 'Business'];

  const rows: Record<string, unknown>[] = Array.from({ length: 48 }, (_, index) => {
    const [owner, initials] = owners[index % owners.length];
    return {
      id: index + 1,
      project: `${projectNames[index % projectNames.length]} ${Math.floor(index / projectNames.length) + 1}`,
      owner,
      initials,
      status: statuses[index % statuses.length],
      plan: plans[index % plans.length],
      members: 2 + ((index * 7) % 31),
      usage: 18 + ((index * 13) % 81),
      mrr: 90 + ((index * 137) % 1850),
      updated: `${String(26 - (index % 12)).padStart(2, '0')}.08.2026`
    } satisfies ProjectRow;
  });

  const columns: DataTableColumn[] = [
    { key: 'project', label: 'Projekt', sortable: true, minWidth: '13rem' },
    { key: 'owner', label: 'Verantwortlich', sortable: true, minWidth: '12rem' },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: '8rem',
      filterLabel: 'Status',
      filterOptions: [
        { value: 'Aktiv', label: 'Aktiv' },
        { value: 'Prüfung', label: 'Prüfung' },
        { value: 'Pausiert', label: 'Pausiert' }
      ]
    },
    {
      key: 'plan',
      label: 'Plan',
      sortable: true,
      width: '8rem',
      filterLabel: 'Plan',
      filterOptions: [
        { value: 'Solo', label: 'Solo' },
        { value: 'Team', label: 'Team' },
        { value: 'Business', label: 'Business' }
      ]
    },
    { key: 'members', label: 'Mitglieder', sortable: true, searchable: false, align: 'end', width: '7.5rem' },
    { key: 'usage', label: 'Nutzung', sortable: true, searchable: false, align: 'end', width: '9rem' },
    { key: 'mrr', label: 'MRR', sortable: true, searchable: false, align: 'end', width: '8rem' },
    { key: 'updated', label: 'Aktualisiert', sortable: true, width: '9rem', hidden: true }
  ];

  let selected = $state<DataTableRowId[]>([]);
  let detailsOpen = $state(false);
  let activeRow = $state<Record<string, unknown> | null>(null);
  let loading = $state(false);
  let pageSize = $state(10);

  function currency(value: unknown) {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency', currency: 'EUR', maximumFractionDigits: 0
    }).format(Number(value));
  }

  function statusTone(value: unknown) {
    if (value === 'Aktiv') return 'success' as const;
    if (value === 'Prüfung') return 'warning' as const;
    return 'neutral' as const;
  }

  function openDetails(row: Record<string, unknown>) {
    activeRow = row;
    detailsOpen = true;
  }

  function simulateReload() {
    loading = true;
    window.setTimeout(() => loading = false, 850);
  }
</script>

{#snippet cell(value: unknown, row: Record<string, unknown>, column: DataTableColumn)}
  {#if column.key === 'project'}
    <div class="docs-table-primary"><strong>{String(value)}</strong><small>#{String(row.id).padStart(4, '0')}</small></div>
  {:else if column.key === 'owner'}
    <div class="docs-table-person"><Avatar size="sm" initials={String(row.initials)} /><span>{String(value)}</span></div>
  {:else if column.key === 'status'}
    <Badge tone={statusTone(value)} dot>{String(value)}</Badge>
  {:else if column.key === 'usage'}
    <div class="docs-usage-cell"><span><i style={`--usage:${Number(value)}%`}></i></span><strong>{Number(value)} %</strong></div>
  {:else if column.key === 'mrr'}
    <span class="tabular-number">{currency(value)}</span>
  {:else}
    {String(value ?? '—')}
  {/if}
{/snippet}

{#snippet rowActions(row: Record<string, unknown>)}
  <IconButton label={`${String(row.project)} öffnen`} size="sm" variant="ghost" onclick={() => openDetails(row)}>
    <MoreHorizontal size={16} />
  </IconButton>
{/snippet}

<svelte:head>
  <title>DataTable Demo · RobinGru Svelte UI</title>
  <meta name="description" content="Interaktive RobinGru DataTable mit Suche, Filtern, Sortierung, Auswahl, Spalten und Pagination." />
</svelte:head>

<SectionIntro
  eyebrow="Live-Demo"
  title="DataTable für reale Arbeitsabläufe"
  description="48 Datensätze, mehrere Filter, Sortierung, Spaltenauswahl, Zeilenselektion, Sticky Header und Detailansicht. Bewusst ohne Virtualisierung: Für diese Größenordnung ist eine normale paginierte Tabelle klarer und leichter wartbar."
>
  {#snippet actions()}
    <Button variant="outline" tone="neutral" onclick={simulateReload}><RotateCcw size={15} /> Neu laden</Button>
    <Button disabled={!selected.length}><Archive size={15} /> {selected.length || ''} archivieren</Button>
  {/snippet}
</SectionIntro>

<div class="docs-showcase docs-data-layout">
  <DashboardGrid columns={4}>
    <KpiCard label="Projekte" value="48" detail="im aktuellen Workspace" />
    <KpiCard label="Aktiv" value="29" trend="+4" direction="up" detail="seit Monatsbeginn" />
    <KpiCard label="In Prüfung" value="9" detail="benötigen Aufmerksamkeit" />
    <KpiCard label="MRR" value="46.820 €" trend="+8,3 %" direction="up" detail="gegen Vorperiode" />
  </DashboardGrid>

  <Callout title="Warum keine VirtualTable?" tone="info">
    Pagination, ein begrenzter sichtbarer Tabellenbereich und optional serverseitig geladene Seiten reichen für typische Admin- und Dashboard-Daten aus. RobinGru hält deshalb nur eine verständliche Tabellen-API vor.
  </Callout>

  <div class="docs-data-toolbar">
    <div>
      <strong>Projektportfolio</strong>
      <span>{selected.length ? `${selected.length} Zeilen ausgewählt` : 'Auswahl über die erste Spalte'}</span>
    </div>
    <div>
      <Button size="sm" variant="ghost" tone="neutral"><Download size={15} /> CSV</Button>
      <Button size="sm" variant="outline" tone="neutral"><UserRound size={15} /> Zuweisen</Button>
    </div>
  </div>

  <DataTable
    {columns}
    {rows}
    bind:selected
    bind:pageSize
    selectable
    striped
    stickyHeader
    showColumnPicker
    pageSizeOptions={[10, 25, 50]}
    maxHeight="34rem"
    caption="Projektportfolio"
    searchPlaceholder="Projekt oder Verantwortliche suchen …"
    {loading}
    {cell}
    {rowActions}
    onrowclick={openDetails}
  />

  <div class="docs-data-note">
    <CircleHelp size={18} aria-hidden="true" />
    <span>Die ausgeblendete Spalte „Aktualisiert“ lässt sich über den Spalten-Picker einblenden. Suche, Status- und Planfilter können gemeinsam verwendet werden.</span>
  </div>
</div>

<Drawer bind:open={detailsOpen} title={activeRow ? String(activeRow.project) : 'Projekt'} description="Detailansicht aus derselben Tabellenzeile">
  {#if activeRow}
    <div class="docs-drawer-summary">
      <Avatar initials={String(activeRow.initials)} size="lg" />
      <div><strong>{String(activeRow.owner)}</strong><span>Verantwortliche Person</span></div>
    </div>
    <Card>
      <CardHeader title="Projektstatus" description="Aktuelle operative Werte" />
      <CardContent>
        <dl class="docs-detail-list">
          <div><dt>Status</dt><dd><Badge tone={statusTone(activeRow.status)} dot>{String(activeRow.status)}</Badge></dd></div>
          <div><dt>Plan</dt><dd>{String(activeRow.plan)}</dd></div>
          <div><dt>Mitglieder</dt><dd>{String(activeRow.members)}</dd></div>
          <div><dt>Nutzung</dt><dd>{String(activeRow.usage)} %</dd></div>
          <div><dt>MRR</dt><dd>{currency(activeRow.mrr)}</dd></div>
          <div><dt>Aktualisiert</dt><dd>{String(activeRow.updated)}</dd></div>
        </dl>
      </CardContent>
    </Card>
  {/if}
  {#snippet footer()}<Button variant="outline" tone="neutral" onclick={() => detailsOpen = false}>Schließen</Button><Button>Projekt öffnen</Button>{/snippet}
</Drawer>

<footer class="docs-footer"><div><span>Normale Datenmengen, eine klare API.</span><a href={`${base}/components/data-table`}>DataTable-Komponente öffnen</a></div></footer>
