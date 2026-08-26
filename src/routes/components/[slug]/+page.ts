import { error } from '@sveltejs/kit';
import { componentCatalog, getComponentBySlug } from '$docs/catalog.js';

export const prerender = true;

export function entries() {
  return componentCatalog.map((item) => ({ slug: item.slug }));
}

export function load({ params }: { params: { slug: string } }) {
  const item = getComponentBySlug(params.slug);
  if (!item) error(404, 'Komponente nicht gefunden');
  return { item };
}
