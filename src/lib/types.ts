import type { Snippet } from 'svelte';

export type Size = 'xs' | 'sm' | 'md' | 'lg';
export type Tone = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'cyan' | 'green' | 'amber' | 'red';
export type Variant = 'solid' | 'soft' | 'outline' | 'ghost';
export type Orientation = 'horizontal' | 'vertical';
export type Align = 'start' | 'center' | 'end';
export type TrendDirection = 'up' | 'down' | 'flat';
export type DateRange = { from: string; to: string };
export type DateRangePreset = DateRange & { label: string };
export type TableDensity = 'comfortable' | 'compact';
export type DataTableRowId = string | number;
export type SharePlatform = 'copy' | 'email' | 'linkedin' | 'bluesky';

export type CommonProps = {
  class?: string;
  children?: Snippet;
};

export type Option = {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
};

export type MentionOption = {
  value: string;
  label: string;
  description?: string;
  avatar?: string;
  initials?: string;
  disabled?: boolean;
};

export type TreeNode = {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
  children?: TreeNode[];
};

export type FileTreeNode = Omit<TreeNode, 'children'> & {
  kind: 'file' | 'folder';
  children?: FileTreeNode[];
  modified?: string;
};

export type SplitButtonItem = {
  label: string;
  icon?: Snippet;
  shortcut?: string;
  disabled?: boolean;
  separatorBefore?: boolean;
  tone?: 'neutral' | 'danger';
  action?: () => void;
};

export type ComparisonColumn = {
  id: string;
  label: string;
  description?: string;
  badge?: string;
  highlighted?: boolean;
};

export type ComparisonFeature = {
  label: string;
  description?: string;
  values: Record<string, string | number | boolean | null | undefined>;
};

export type AuditLogEntry = {
  id: string;
  actor: string;
  action: string;
  target?: string;
  time: string;
  datetime?: string;
  detail?: string;
  tone?: Tone;
  avatar?: string;
  initials?: string;
};

export type ActivityFeedItem = {
  id?: string;
  name: string;
  action?: string;
  target?: string;
  detail?: string;
  time: string;
  datetime?: string;
  avatar?: string;
  initials?: string;
  tone?: Tone;
  unread?: boolean;
  tags?: Array<string | ContentTag>;
};

export type KanbanCard = {
  id: string;
  title: string;
  description?: string;
  meta?: string;
  tags?: string[];
  assignee?: string;
};

export type KanbanColumn = {
  id: string;
  title: string;
  tone?: Tone;
  limit?: number;
  cards: KanbanCard[];
};

export type ContentTag = {
  label: string;
  href?: string;
  tone?: Tone;
};

export type ArticleNavItem = {
  title: string;
  href: string;
};

export type TocItem = {
  label: string;
  href: string;
  level?: 2 | 3 | 4;
  active?: boolean;
};

export type PostSummary = {
  title: string;
  href: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
  date?: string;
  dateTime?: string;
  author?: string;
  minutes?: number;
  tags?: string[];
  orientation?: 'vertical' | 'horizontal';
  featured?: boolean;
  loading?: 'lazy' | 'eager';
};

export type ChartDatum = {
  label: string;
  value: number;
  tone?: Tone;
  color?: string;
};

export type LegendItem = {
  label: string;
  value?: string | number;
  tone?: Tone;
  color?: string;
};

export type StatusSummaryItem = {
  label: string;
  value: string | number;
  detail?: string;
  tone?: Tone;
};

export type QuickAction = {
  label: string;
  description?: string;
  href?: string;
  icon?: Snippet;
  disabled?: boolean;
  onselect?: () => void;
};

export type DataTableFilterOption = {
  value: string;
  label: string;
};

export type DataTableColumn = {
  key: string;
  label: string;
  sortable?: boolean;
  searchable?: boolean;
  align?: Align;
  width?: string;
  minWidth?: string;
  hidden?: boolean;
  filterLabel?: string;
  filterOptions?: DataTableFilterOption[];
  format?: (value: unknown, row: Record<string, unknown>) => string | number;
};

export type DataTableSort = {
  key: string;
  direction: 'asc' | 'desc';
};
