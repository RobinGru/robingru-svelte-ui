import type { Snippet } from 'svelte';

export type Size = 'xs' | 'sm' | 'md' | 'lg';
export type Tone = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
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
