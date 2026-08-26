import { writable, type Readable } from 'svelte/store';
import type { Tone } from './types.js';

export type ToastAction = { label: string; callback: () => void };
export type ToastInput = {
  title: string;
  description?: string;
  tone?: Tone;
  duration?: number;
  action?: ToastAction;
};
export type ToastItem = ToastInput & { id: string; tone: Tone };
export type Toaster = Readable<ToastItem[]> & {
  push: (input: ToastInput) => string;
  dismiss: (id: string) => void;
  clear: () => void;
};

export function createToaster(): Toaster {
  const state = writable<ToastItem[]>([]);
  const timers = new Map<string, ReturnType<typeof setTimeout>>();

  function dismiss(id: string) {
    const timer = timers.get(id);
    if (timer) clearTimeout(timer);
    timers.delete(id);
    state.update((items) => items.filter((item) => item.id !== id));
  }

  function push(input: ToastInput) {
    const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
    const item: ToastItem = { ...input, id, tone: input.tone ?? 'neutral' };
    state.update((items) => [...items.slice(-4), item]);
    const duration = input.duration ?? 4500;
    if (duration > 0) timers.set(id, setTimeout(() => dismiss(id), duration));
    return id;
  }

  function clear() {
    for (const timer of timers.values()) clearTimeout(timer);
    timers.clear();
    state.set([]);
  }

  return { subscribe: state.subscribe, push, dismiss, clear };
}

export const toast = createToaster();
