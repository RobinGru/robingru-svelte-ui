<script lang="ts">
  import {
    Accessibility, Activity, AlarmClock, Archive, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, AtSign, Bell,
    BookOpen, Bookmark, Calendar, CalendarDays, Camera, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight,
    ChevronsDown, ChevronsLeft, ChevronsRight, ChevronsUp, CircleHelp, CirclePlus, Clipboard, Clock3, Cloud, Code2,
    CircleAlert, CircleX, Copy, CreditCard, Database, Download, Ellipsis, ExternalLink, Eye, EyeOff, File, FileCode2, FileText, Filter,
    Folder, FolderOpen, Globe2, Heart, Home, Image, Inbox, Info, KeyRound, LayoutDashboard, Link, List, LockKeyhole,
    LoaderCircle, LogOut, Mail, MapPin, Menu, MessageCircle, Minus, Moon, MoreHorizontal, MoveRight, Package, Palette, PanelLeft, Pause,
    Pencil, Phone, Play, Plus, Printer, RotateCcw, Save, Search, Send, Settings, Share2, ShieldCheck, ShoppingCart, SquarePen,
    SlidersHorizontal, Sparkles, Star, Sun, Tag, Trash, Trash2, TriangleAlert, Upload, User, UserPlus, UserRound, Users, X, Zap
  } from '@lucide/svelte';
  import { SearchInput } from '$lib';
  import CodePanel from '$docs/components/CodePanel.svelte';
  import SectionIntro from '$docs/components/SectionIntro.svelte';

  let query = $state('');
  const iconImport = `<script lang="ts">\n  import { Search, Settings, UserPlus } from '@lucide/svelte';\n<\/script>\n\n<button class="rg-button" type="button">\n  <Search size={16} aria-hidden="true" />\n  Suchen\n<\/button>\n\n<button class="rg-icon-button" type="button" aria-label="Einstellungen">\n  <Settings size={18} />\n<\/button>`;
  const icons = [
    { name: 'Accessibility', icon: Accessibility }, { name: 'Activity', icon: Activity }, { name: 'AlarmClock', icon: AlarmClock }, { name: 'Archive', icon: Archive }, { name: 'ArrowDown', icon: ArrowDown },
    { name: 'ArrowLeft', icon: ArrowLeft }, { name: 'ArrowRight', icon: ArrowRight }, { name: 'ArrowUp', icon: ArrowUp }, { name: 'AtSign', icon: AtSign }, { name: 'Bell', icon: Bell },
    { name: 'BookOpen', icon: BookOpen }, { name: 'Bookmark', icon: Bookmark }, { name: 'Calendar', icon: Calendar }, { name: 'CalendarDays', icon: CalendarDays }, { name: 'Camera', icon: Camera },
    { name: 'Check', icon: Check }, { name: 'CheckCircle2', icon: CheckCircle2 }, { name: 'ChevronDown', icon: ChevronDown }, { name: 'ChevronLeft', icon: ChevronLeft }, { name: 'ChevronRight', icon: ChevronRight },
    { name: 'ChevronsDown', icon: ChevronsDown }, { name: 'ChevronsLeft', icon: ChevronsLeft }, { name: 'ChevronsRight', icon: ChevronsRight }, { name: 'ChevronsUp', icon: ChevronsUp }, { name: 'CircleHelp', icon: CircleHelp },
    { name: 'CirclePlus', icon: CirclePlus }, { name: 'Clipboard', icon: Clipboard }, { name: 'Clock3', icon: Clock3 }, { name: 'Cloud', icon: Cloud }, { name: 'Code2', icon: Code2 },
    { name: 'CircleAlert', icon: CircleAlert }, { name: 'CircleX', icon: CircleX }, { name: 'Copy', icon: Copy }, { name: 'CreditCard', icon: CreditCard }, { name: 'Database', icon: Database },
    { name: 'Download', icon: Download }, { name: 'Ellipsis', icon: Ellipsis },
    { name: 'ExternalLink', icon: ExternalLink }, { name: 'Eye', icon: Eye }, { name: 'EyeOff', icon: EyeOff }, { name: 'File', icon: File }, { name: 'FileCode2', icon: FileCode2 },
    { name: 'FileText', icon: FileText }, { name: 'Filter', icon: Filter }, { name: 'Folder', icon: Folder }, { name: 'FolderOpen', icon: FolderOpen }, { name: 'Globe2', icon: Globe2 },
    { name: 'Heart', icon: Heart }, { name: 'Home', icon: Home }, { name: 'Image', icon: Image }, { name: 'Inbox', icon: Inbox }, { name: 'Info', icon: Info },
    { name: 'KeyRound', icon: KeyRound }, { name: 'LayoutDashboard', icon: LayoutDashboard }, { name: 'Link', icon: Link }, { name: 'List', icon: List }, { name: 'LockKeyhole', icon: LockKeyhole },
    { name: 'LoaderCircle', icon: LoaderCircle }, { name: 'LogOut', icon: LogOut }, { name: 'Mail', icon: Mail }, { name: 'MapPin', icon: MapPin }, { name: 'Menu', icon: Menu },
    { name: 'MessageCircle', icon: MessageCircle }, { name: 'Minus', icon: Minus },
    { name: 'Moon', icon: Moon }, { name: 'MoreHorizontal', icon: MoreHorizontal }, { name: 'MoveRight', icon: MoveRight }, { name: 'Package', icon: Package }, { name: 'Palette', icon: Palette },
    { name: 'PanelLeft', icon: PanelLeft }, { name: 'Pause', icon: Pause }, { name: 'Pencil', icon: Pencil }, { name: 'Phone', icon: Phone }, { name: 'Play', icon: Play },
    { name: 'Plus', icon: Plus }, { name: 'Printer', icon: Printer }, { name: 'RotateCcw', icon: RotateCcw }, { name: 'Save', icon: Save }, { name: 'Search', icon: Search },
    { name: 'Send', icon: Send }, { name: 'Settings', icon: Settings }, { name: 'Share2', icon: Share2 }, { name: 'ShieldCheck', icon: ShieldCheck }, { name: 'ShoppingCart', icon: ShoppingCart },
    { name: 'SlidersHorizontal', icon: SlidersHorizontal }, { name: 'SquarePen', icon: SquarePen },
    { name: 'Sparkles', icon: Sparkles }, { name: 'Star', icon: Star }, { name: 'Sun', icon: Sun }, { name: 'Tag', icon: Tag }, { name: 'Trash2', icon: Trash2 },
    { name: 'Trash', icon: Trash }, { name: 'TriangleAlert', icon: TriangleAlert }, { name: 'Upload', icon: Upload }, { name: 'User', icon: User }, { name: 'UserPlus', icon: UserPlus }, { name: 'UserRound', icon: UserRound },
    { name: 'Users', icon: Users }, { name: 'X', icon: X }, { name: 'Zap', icon: Zap }
  ];
  const filteredIcons = $derived(icons.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase())));
</script>

<svelte:head>
  <title>Icons · RobinGru Svelte UI</title>
  <meta name="description" content="Lucide-Icons für RobinGru Svelte UI: häufige Icons, Imports und Regeln für zugängliche Icon-Aktionen." />
</svelte:head>

<SectionIntro eyebrow="System" title="Icons" description="RobinGru verwendet Lucide als einheitlichen, leichtgewichtigen Icon-Satz. Die Bibliothek gestaltet Größe, Farbe und Interaktionsflächen; das Icon selbst importierst du explizit." />

<section class="docs-icon-intro" aria-labelledby="icon-import-title">
  <div>
    <h2 id="icon-import-title">Lucide für Svelte</h2>
    <p>Icons stammen aus <code>@lucide/svelte</code>, nicht aus einer zweiten RobinGru-Icon-API. Für eigene Icons das Paket direkt als Projektabhängigkeit ergänzen und nur tatsächlich verwendete Icons importieren. <a class="rg-link" href="https://lucide.dev/icons/" target="_blank" rel="noreferrer">Alle Lucide-Icons ansehen <ExternalLink size={14} aria-hidden="true" /></a></p>
  </div>
  <CodePanel code="bun add @lucide/svelte" language="shell" filename="Terminal" />
</section>

<div class="docs-icon-code-grid">
  <CodePanel title="Icon verwenden" code={iconImport} language="svelte" filename="src/routes/+page.svelte" />
  <aside class="docs-icon-rules" aria-label="Icon-Regeln">
    <h2>Klare Regeln</h2>
    <ul>
      <li><strong>16 px</strong><span>in Buttons und kompakten Controls</span></li>
      <li><strong>18 px</strong><span>in Navigation und IconButtons</span></li>
      <li><strong>Label</strong><span>für reine Icon-Aktionen immer über <code>aria-label</code></span></li>
      <li><strong>Dekorativ</strong><span>mit <code>aria-hidden="true"</code>, wenn Text die Bedeutung trägt</span></li>
    </ul>
  </aside>
</div>

<section class="docs-icon-gallery-section" aria-labelledby="common-icons-title">
  <div class="docs-section-heading">
    <div><h2 id="common-icons-title">100 häufige Icons</h2><p>Eine kuratierte Auswahl für Navigation, Status, Daten, Dateien, Personen und Aktionen.</p></div>
    <span class="docs-icon-count">{filteredIcons.length} von {icons.length}</span>
  </div>
  <SearchInput bind:value={query} label="Icons durchsuchen" placeholder="Zum Beispiel: Search, User, Arrow …" clearable />
  <div class="docs-icon-grid" aria-live="polite">
    {#each filteredIcons as { name, icon: Icon }}
      <article class="docs-icon-card">
        <Icon size={21} aria-hidden="true" />
        <code>{name}</code>
      </article>
    {:else}
      <p class="docs-icon-empty">Keine Icons für „{query}“ gefunden.</p>
    {/each}
  </div>
</section>
