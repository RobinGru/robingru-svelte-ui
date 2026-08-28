import { expect, test, type Page } from '@playwright/test';

test.setTimeout(60_000);

function desktopOnly(testInfo: { project: { name: string } }) {
  test.skip(testInfo.project.name !== 'desktop', 'Desktop interaction contract.');
}

async function gotoPreview(page: Page, route: string) {
  await page.goto(route, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(200);
}

test.beforeEach(async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    localStorage.setItem('rg-docs-theme', 'light');
    localStorage.setItem('rg-docs-density', 'comfortable');
  });
});

test('selection and editing components support their primary keyboard flows', async ({ page }, testInfo) => {
  desktopOnly(testInfo);
  await gotoPreview(page, '/components/combobox');
  const combo = page.locator('.rg-combobox input').first();
  await combo.click();
  await combo.press('ArrowDown');
  await combo.press('Enter');
  await expect(combo).not.toHaveValue('');

  await gotoPreview(page, '/components/calendar');
  const selectedDate = page.locator('.rg-calendar [role="gridcell"][aria-selected="true"]').first();
  await selectedDate.press('ArrowRight');
  await page.locator('.rg-calendar [role="gridcell"]:focus').press('Enter');
  await expect(page.locator('.rg-calendar [role="gridcell"][aria-selected="true"]').first()).toBeFocused();
  const monthEnd = page.getByRole('gridcell', { name: /31\. August 2026/ }).first();
  await monthEnd.focus();
  await monthEnd.press('PageDown');
  await expect(page.locator('.rg-calendar [role="gridcell"]:focus')).toHaveAttribute('aria-label', /30\. September 2026/);

  await gotoPreview(page, '/components/inline-edit');
  await page.locator('.rg-inline-edit-value').first().click();
  const edit = page.locator('.rg-inline-edit input').first();
  await edit.fill('Neuer Workspace');
  await edit.press('Enter');
  await expect(page.locator('.rg-inline-edit-value').first()).toContainText('Neuer Workspace');

  await gotoPreview(page, '/components/mention-input');
  const mention = page.locator('.rg-mention textarea').first();
  await mention.fill('Bitte mit @ma');
  await mention.press('ArrowDown');
  await mention.press('Enter');
  await expect(mention).toHaveValue(/@mara/);
});

test('catalog suggestion lists escape their preview container', async ({ page }, testInfo) => {
  desktopOnly(testInfo);
  await page.setViewportSize({ width: 805, height: 700 });
  await gotoPreview(page, '/components');

  const cases = [
    { name: 'Combobox', trigger: '.rg-combobox input', menu: '.rg-combobox-menu' },
    { name: 'MultiSelect', trigger: '.rg-multiselect-control', menu: '.rg-multiselect-menu' },
    { name: 'MentionInput', trigger: '.rg-mention textarea', menu: '.rg-mention-menu' }
  ];

  for (const item of cases) {
    const card = page.locator('.docs-component-card').filter({ has: page.getByRole('heading', { name: item.name, exact: true }) });
    const trigger = card.locator(item.trigger);
    await trigger.click();
    if (item.name === 'MentionInput') await trigger.fill('Bitte mit @');

    const preview = card.locator('.docs-component-preview');
    const menu = page.locator(item.menu).last();
    await expect(menu).toBeVisible();
    expect(await menu.evaluate((element) => !element.closest('.docs-component-preview'))).toBe(true);
    const dimensions = await preview.evaluate((element) => ({ clientHeight: element.clientHeight, scrollHeight: element.scrollHeight }));
    expect(dimensions.scrollHeight).toBe(dimensions.clientHeight);
    await page.keyboard.press('Escape');
  }
});

test('hover card previews open on hover and keyboard focus without clipping', async ({ page }, testInfo) => {
  desktopOnly(testInfo);
  await gotoPreview(page, '/components/hover-card');
  const trigger = page.getByRole('link', { name: '@mara-klein' }).first();
  const card = page.locator('.rg-hover-card');

  await trigger.hover();
  await expect(card).toBeVisible();
  expect(await card.evaluate((element) => !element.closest('.docs-component-preview'))).toBe(true);
  await expect(card).toContainText('Produktdesignerin');

  await trigger.focus();
  await page.keyboard.press('Escape');
  await expect(card).toHaveCount(0);
});

test('multi-select keeps multiple choices in its bound preview state', async ({ page }, testInfo) => {
  desktopOnly(testInfo);
  await gotoPreview(page, '/components/multi-select');
  await page.locator('.rg-multiselect-control').first().click();
  const accessibility = page.locator('.rg-multiselect-option').filter({ hasText: 'Accessibility' }).first();
  await accessibility.click();
  await expect(page.locator('.rg-multiselect-chip').filter({ hasText: 'Accessibility' }).first()).toBeVisible();
  const remove = page.getByRole('button', { name: 'Design-System entfernen' }).first();
  const removeBox = await remove.boundingBox();
  expect(removeBox?.width).toBeGreaterThanOrEqual(24);
  expect(removeBox?.height).toBeGreaterThanOrEqual(24);
});

test('activity feed presents structured team updates', async ({ page }, testInfo) => {
  desktopOnly(testInfo);
  await gotoPreview(page, '/components/activity-feed');
  const feed = page.getByRole('list', { name: 'Aktivitäten' }).first();
  await expect(feed).toContainText('Mara Klein');
  await expect(feed).toContainText('Release-Übersicht');
  await expect(feed.getByLabel('Kategorien')).toContainText('Dokumentation');
  await expect(feed.getByLabel('Ungelesen')).toHaveCount(1);
});

test('tree, file and workspace components expose keyboard-operable structure', async ({ page }, testInfo) => {
  desktopOnly(testInfo);
  await gotoPreview(page, '/components/tree-view');
  const selectedTreeItem = page.locator('.rg-tree [role="treeitem"][aria-selected="true"]').first();
  await selectedTreeItem.press('ArrowDown');
  await expect(page.locator('.rg-tree [role="treeitem"]:focus')).toBeVisible();
  await expect(page.locator('.rg-tree [role="treeitem"]:focus')).toHaveAttribute('tabindex', '0');
  await page.locator('.rg-tree-check').first().click();
  await expect(page.locator('.rg-tree-check').first()).toHaveAttribute('aria-checked', 'true');

  await gotoPreview(page, '/components/file-tree');
  const file = page.getByRole('treeitem', { name: /Button\.svelte/ }).first();
  await file.click();
  await expect(file).toHaveAttribute('aria-selected', 'true');

  await gotoPreview(page, '/components/resizable-panels');
  const handle = page.getByRole('slider', { name: 'Bereiche skalieren' }).first();
  const before = Number(await handle.getAttribute('aria-valuenow'));
  await handle.press('ArrowRight');
  await expect(handle).toHaveAttribute('aria-valuenow', String(before + 2));

  await gotoPreview(page, '/components/transfer-list');
  await page.getByRole('listbox', { name: 'Verfügbare Bereiche' }).first().selectOption('projects');
  await page.getByRole('button', { name: 'Auswahl hinzufügen' }).first().click();
  await expect(page.getByRole('listbox', { name: 'Zugewiesen' }).first().locator('option[value="projects"]')).toHaveCount(1);
});

test('split actions and structured data components render and move state', async ({ page }, testInfo) => {
  desktopOnly(testInfo);
  await gotoPreview(page, '/components/split-button');
  await page.getByRole('button', { name: 'Weitere Aktionen' }).first().press('Enter');
  await expect(page.getByRole('menuitem', { name: 'Vorschau öffnen' }).first()).toBeVisible();

  await gotoPreview(page, '/components/comparison-table');
  await expect(page.getByRole('table', { name: 'Funktionsvergleich' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Enthalten' }).first()).toBeVisible();

  await gotoPreview(page, '/components/audit-log');
  await expect(page.getByRole('list', { name: 'Änderungsprotokoll' }).first()).toContainText('Mara Klein');
  await page.getByText('Details anzeigen').first().click();
  await expect(page.getByText('Von „In Prüfung“ zu „Freigegeben“.').first()).toBeVisible();

  await gotoPreview(page, '/components/kanban-board');
  const card = page.locator('.rg-kanban-card').filter({ hasText: 'Combobox dokumentieren' }).first();
  expect(await card.evaluate((element) => element.tagName)).toBe('LI');
  await card.getByRole('button', { name: /nach rechts verschieben/ }).click();
  await expect(page.getByRole('group', { name: 'In Arbeit' }).first()).toContainText('Combobox dokumentieren');
});

test('resizable panels use their visible vertical axis on mobile', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile responsive interaction contract.');
  await gotoPreview(page, '/components/resizable-panels');
  const handle = page.getByRole('slider', { name: 'Bereiche skalieren' }).first();
  await expect(handle).toHaveAttribute('aria-orientation', 'vertical');
  const before = Number(await handle.getAttribute('aria-valuenow'));
  await handle.press('ArrowDown');
  await expect(handle).toHaveAttribute('aria-valuenow', String(before + 2));
  await handle.press('ArrowRight');
  await expect(handle).toHaveAttribute('aria-valuenow', String(before + 2));

  const box = await handle.boundingBox();
  const panels = await page.locator('.rg-panels').first().boundingBox();
  expect(box).not.toBeNull();
  expect(panels).not.toBeNull();
  if (box && panels) {
    const pointer = { pointerId: 1, clientX: box.x + box.width / 2, clientY: box.y + box.height / 2 };
    await handle.dispatchEvent('pointerdown', pointer);
    await page.evaluate(({ pointerId, clientX, clientY }) => window.dispatchEvent(new PointerEvent('pointermove', { pointerId, clientX, clientY, buttons: 1 })), {
      pointerId: pointer.pointerId,
      clientX: pointer.clientX,
      clientY: panels.y + panels.height * 0.7
    });
    await page.evaluate(({ pointerId, clientX, clientY }) => window.dispatchEvent(new PointerEvent('pointerup', { pointerId, clientX, clientY })), pointer);
    expect(Number(await handle.getAttribute('aria-valuenow'))).toBeGreaterThan(before + 2);
  }
});
