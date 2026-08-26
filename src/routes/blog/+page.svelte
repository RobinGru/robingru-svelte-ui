<script lang="ts">
  import { base } from '$app/paths';
  import {
    Article,
    ArticleHeader,
    ArticleMeta,
    ArticleNavigation,
    AuthorCard,
    Badge,
    Blockquote,
    Breadcrumbs,
    Button,
    CodeBlock,
    Figure,
    NewsletterCard,
    PostCard,
    PostGrid,
    Prose,
    RelatedPosts,
    ShareButtons,
    TableOfContents,
    TagList,
    toast,
    type PostSummary
  } from '$lib';
  import SectionIntro from '$docs/components/SectionIntro.svelte';

  let newsletterEmail = $state('');

  const posts: PostSummary[] = [
    {
      title: 'Ein Svelte-UI-Kit muss Inhalt und Anwendung zusammenhalten',
      href: '#article',
      excerpt: 'Arbeitsoberflächen, Daten und Editorial Content teilen Tokens – nicht identische Cards für alles.',
      eyebrow: 'Design-System',
      date: '26. August 2026',
      dateTime: '2026-08-26',
      author: 'Robin Gru',
      minutes: 7,
      tags: ['SvelteKit', 'Design-System'],
      featured: true
    },
    {
      title: 'Dichte ohne Enge: Tabellen für echte Arbeitsabläufe',
      href: `${base}/data`,
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
      href: `${base}/dashboard`,
      excerpt: 'KPIs, Trends und kleine Diagramme werden als zusammenhängende Informationshierarchie gestaltet.',
      eyebrow: 'Dashboard',
      date: '18. August 2026',
      dateTime: '2026-08-18',
      author: 'Editorial Team',
      minutes: 5,
      tags: ['KPI', 'Charts']
    }
  ];

  const relatedPosts = posts.slice(1);
  const tocItems = [
    { label: 'Eine gemeinsame Sprache', href: '#common-language', level: 2 as const, active: true },
    { label: 'Dashboard und Editorial', href: '#dashboard-editorial', level: 2 as const },
    { label: 'Weniger Abhängigkeiten', href: '#fewer-dependencies', level: 2 as const },
    { label: 'Praktische Konsequenz', href: '#practical-result', level: 2 as const }
  ];
  const exampleCode = `<script lang="ts">\n  import { Article, Prose, TableOfContents } from '@robingru/svelte-ui';\n<\/script>\n\n<Article>\n  {#snippet aside()}<TableOfContents {items} />{/snippet}\n  <Prose>Dein Inhalt bleibt der Mittelpunkt.</Prose>\n</Article>`;

  function subscribe(email: string) {
    toast.push({ title: 'Newsletter-Demo gespeichert', description: `${email} wurde nur lokal verarbeitet.`, tone: 'success' });
    newsletterEmail = '';
  }
</script>

<svelte:head>
  <title>Blog & Editorial Demo · RobinGru Svelte UI</title>
  <meta name="description" content="Vollständige Blog- und Artikeldemo mit Prose, Inhaltsverzeichnis, Code, Autor und verwandten Beiträgen." />
</svelte:head>

<SectionIntro eyebrow="Editorial Showcase" title="Ein Blog, der nicht wie ein Dashboard verkleidet ist." description="Typografie, Metadaten und Navigation geben dem Inhalt Ruhe. Farben, Radien, Fokuszustände und Abstände bleiben dabei systematisch abgestimmt." />

<div class="docs-blog-index">
  <section>
    <div class="docs-section-heading"><div><h2>Aktuelle Beiträge</h2><p>Featured Story und normale Beitragskarten verwenden dieselbe redaktionelle Hierarchie.</p></div><Badge tone="primary">17 Content-Komponenten</Badge></div>
    <PostGrid minItemWidth="18rem">
      {#each posts as post}
        {#if post.featured}
          <PostCard {...post}>
            {#snippet media()}
              <div class="docs-post-visual" aria-hidden="true">
                <div class="docs-post-visual-copy"><span>Editorial</span><strong>Inhalt<br />und Produkt</strong><i></i></div>
                <div class="docs-post-visual-ui"><b></b><b></b><b></b><div><span></span><span></span><span></span></div></div>
              </div>
            {/snippet}
          </PostCard>
        {:else}
          <PostCard {...post} />
        {/if}
      {/each}
    </PostGrid>
  </section>

  <section id="article" class="docs-article-demo">
    <Article size="lg">
      {#snippet aside()}<TableOfContents items={tocItems} />{/snippet}

      <ArticleHeader
        eyebrow="Design-System"
        title="Ein Svelte-UI-Kit muss Inhalt und Anwendung zusammenhalten"
        description="Arbeitsoberflächen, Daten und Editorial Content teilen Tokens – nicht identische Karten für alles."
      >
        {#snippet breadcrumbs()}<Breadcrumbs items={[{ label: 'Blog', href: `${base}/blog` }, { label: 'Design-System', current: true }]} />{/snippet}
        {#snippet meta()}
          <ArticleMeta author="Robin Gru" published="26. August 2026" publishedDatetime="2026-08-26" minutes={7} category="SvelteKit" />
        {/snippet}
        <TagList tags={[{ label: 'Svelte 5', tone: 'primary' }, 'Design-System', { label: 'Accessibility', tone: 'info' }]} />
      </ArticleHeader>

      <Prose>
        <p>Ein gutes Design-System macht nicht jede Oberfläche gleich. Es sorgt dafür, dass sich Buttons, Formulare, Tabellen und redaktionelle Seiten <strong>verwandt</strong> anfühlen, während jeder Bereich seine eigene Aufgabe ernst nimmt.</p>

        <h2 id="common-language">Eine gemeinsame Sprache</h2>
        <p>Robin Blue markiert Fokus, Auswahl und wichtige Aktionen. Flächen bleiben überwiegend neutral, damit Kennzahlen, Tabelleninhalte und Texte nicht um Aufmerksamkeit konkurrieren.</p>

        <Blockquote source="Designprinzip" tone="primary">
          <p>Farbe soll Bedeutung tragen. Sie darf nicht die fehlende Informationshierarchie ersetzen.</p>
        </Blockquote>

        <h2 id="dashboard-editorial">Dashboard und Editorial</h2>
        <p>Im Dashboard zählt Vergleichbarkeit. Im Artikel zählen Rhythmus und Lesefluss. Beide verwenden dennoch dieselben Radien, Fokuszustände, Abstände und semantischen Farben.</p>

        <Figure caption="Dieselben Tokens können operative und redaktionelle Oberflächen verbinden, ohne sie gleichzumachen." credit="Design-System" aspect="16 / 7">
          {#snippet media()}
            <div class="docs-editorial-bridge">
              <div class="docs-bridge-story">
                <span>Editorial</span>
                <strong>Eine gemeinsame Sprache</strong>
                <p>Typografie und Rhythmus geben dem Inhalt Raum.</p>
                <small>7 Min. Lesezeit · Design-System</small>
              </div>
              <div class="docs-bridge-dashboard" aria-label="Beispielhafte Dashboard-Kennzahlen">
                <div><span>Aktive Projekte</span><strong>24</strong><small>+3 diese Woche</small></div>
                <div><span>Bearbeitet</span><strong>84 %</strong><small>im Zielbereich</small></div>
                <div><span>Offene Punkte</span><strong>12</strong><small>priorisiert</small></div>
              </div>
            </div>
          {/snippet}
        </Figure>

        <CodeBlock code={exampleCode} language="svelte" filename="+page.svelte" lineNumbers highlightLines={[2, 6]} />

        <h2 id="fewer-dependencies">Weniger Abhängigkeiten</h2>
        <p>Komplexes Fokusmanagement kommt aus Bits UI. Das optionale Skeleton-Stylesheet integriert Tailwind und Skeleton. Daneben gibt es keine zweite Toast-, Tabellen- oder Komponentenbibliothek.</p>

        <table>
          <thead><tr><th>Bereich</th><th>Priorität</th><th>Bausteine</th></tr></thead>
          <tbody>
            <tr><td>Blog</td><td>Lesefluss</td><td>Article, Prose, TOC, CodeBlock</td></tr>
            <tr><td>Dashboard</td><td>Vergleich</td><td>KpiCard, ChartCard, StatusSummary</td></tr>
            <tr><td>Backoffice</td><td>Bearbeitung</td><td>DataTable, FilterBar, Dialog</td></tr>
          </tbody>
        </table>

        <h2 id="practical-result">Praktische Konsequenz</h2>
        <p>Eine Produktseite kann eine Tabelle, einen erklärenden Artikel und eine Einstellungsoberfläche enthalten, ohne drei voneinander unabhängige Designsprachen zu benötigen.</p>
      </Prose>

      <ShareButtons url="https://example.com/design-system" title="Design-System" />

      <AuthorCard name="Robin Gru" role="Maintainer des Design-Systems" bio="Entwickelt ein ruhiges, Svelte-natives Komponenten-System für produktive Anwendungen und redaktionelle Inhalte.">
        {#snippet actions()}<Button size="sm" variant="outline" tone="neutral">Profil öffnen</Button>{/snippet}
      </AuthorCard>

      <NewsletterCard bind:email={newsletterEmail} title="Release-Notizen statt Marketing-Dauerfeuer" description="Neue Komponenten, Migrationshinweise und relevante Designentscheidungen." privacyText="Demo: Es werden keine Daten übertragen." onsubmit={subscribe} />

      <ArticleNavigation previous={{ title: 'Datentabellen mit klaren Zuständen', href: `${base}/data` }} next={{ title: 'Dashboard-Komponenten sinnvoll kombinieren', href: `${base}/dashboard` }} />
    </Article>
  </section>

  <RelatedPosts posts={relatedPosts} title="Weitere Muster" description="Blog-Karten verwenden dieselben Tokens, aber eine eigenständige Editorial-Hierarchie." />
</div>

<footer class="docs-footer"><div><span>Editorial Content bleibt semantisches HTML.</span><a href={`${base}/tokens`}>Typografie- und Farb-Tokens ansehen</a></div></footer>
