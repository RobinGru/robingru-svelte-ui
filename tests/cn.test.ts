import { describe, expect, it } from 'vitest';
import { cn } from '../src/lib/internal/cn.js';

describe('cn', () => {
  it('joins only truthy classes without adding merge semantics', () => {
    expect(cn('rg-button', false, undefined, 'custom')).toBe('rg-button custom');
  });
});
