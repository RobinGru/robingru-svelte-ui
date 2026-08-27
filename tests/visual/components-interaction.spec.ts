import { expect, test, type Page } from '@playwright/test';

test.setTimeout(60_000);

async function gotoPreview(page: Page, route: string) {
  await page.goto(route, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(200);
}

test.beforeEach(async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Interaction contracts run once in Chromium desktop.');
  await page.addInitScript(() => {
    localStorage.setItem('rg-docs-theme', 'light');
    localStorage.setItem('rg-docs-density', 'comfortable');
  });
});

test('selection and editing components support their primary keyboard flows', async ({ page }) => {
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

test('multi-select keeps multiple choices in its bound preview state', async ({ page }) => {
  await gotoPreview(page, '/components/multi-select');
  await page.locator('.rg-multiselect-control').first().click();
  const accessibility = page.locator('.rg-multiselect-option').filter({ hasText: 'Accessibility' }).first();
  await accessibility.click();
  await expect(page.locator('.rg-multiselect-chip').filter({ hasText: 'Accessibility' }).first()).toBeVisible();
});

test('tree, file and workspace components expose keyboard-operable structure', async ({ page }) => {
  await gotoPreview(page, '/components/tree-view');
  const selectedTreeItem = page.locator('.rg-tree [role="treeitem"][aria-selected="true"]').first();
  await selectedTreeItem.press('ArrowDown');
  await expect(page.locator('.rg-tree [role="treeitem"]:focus')).toBeVisible();
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

test('split actions and structured data components render and move state', async ({ page }) => {
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
  await card.getByRole('button', { name: /nach rechts verschieben/ }).click();
  await expect(page.getByRole('group', { name: 'In Arbeit' }).first()).toContainText('Combobox dokumentieren');
});
