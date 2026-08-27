export type ClassValue = string | number | bigint | boolean | null | undefined | ClassValue[] | Record<string, unknown>;

/** Tiny class combiner. RobinGru uses semantic component classes, so a Tailwind merge dependency is unnecessary. */
export function cn(...values: ClassValue[]): string {
  const flatten = (value: unknown): string[] => {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'bigint') return [String(value)];
    if (Array.isArray(value)) return value.flatMap(flatten);
    if (value && typeof value === 'object') return Object.entries(value).filter(([, enabled]) => enabled).map(([name]) => name);
    return [];
  };
  return values.flatMap(flatten).join(' ');
}
