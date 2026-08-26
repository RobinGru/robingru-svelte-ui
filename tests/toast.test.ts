import { describe, expect, it, vi } from 'vitest';
import { createToaster } from '../src/lib/toast.js';

describe('createToaster', () => {
  it('pushes and dismisses notifications', () => {
    vi.useFakeTimers();
    const toaster = createToaster();
    let current: unknown[] = [];
    const unsubscribe = toaster.subscribe((items) => (current = items));
    const id = toaster.push({ title: 'Gespeichert', duration: 0 });
    expect(current).toHaveLength(1);
    toaster.dismiss(id);
    expect(current).toHaveLength(0);
    unsubscribe();
    vi.useRealTimers();
  });
});
