import { expect, test } from '@playwright/test';

type VisualState = { theme: 'light' | 'dark'; density: 'comfortable' | 'compact' };

function stateFor(project: string): VisualState {
  if (project === 'compact') return { theme: 'light', density: 'compact' };
  if (project === 'dark') return { theme: 'dark', density: 'comfortable' };
  return { theme: 'light', density: 'comfortable' };
}

test.beforeEach(async ({ page }, testInfo) => {
  const state = stateFor(testInfo.project.name);
  await page.addInitScript((next: VisualState) => {
    localStorage.setItem('rg-docs-theme', next.theme);
    localStorage.setItem('rg-docs-density', next.density);
  }, state);
});

for (const route of ['/blog', '/data', '/components']) {
  test(`${route} remains visually stable`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot(`${route.slice(1)}.png`, {
      animations: 'disabled',
      caret: 'hide'
    });
  });
}

test('component catalog toolbar stays below the app header while scrolling', async ({ page }, testInfo) => {
  await page.goto('/components', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(200);
  await page.evaluate(() => window.scrollTo(0, 1_400));
  await page.waitForTimeout(100);

  const toolbar = await page.locator('.docs-catalog-toolbar').boundingBox();

  if (testInfo.project.name === 'mobile') {
    expect(toolbar).not.toBeNull();
    expect(toolbar!.y).toBeLessThan(0);
    return;
  }

  const topbar = await page.locator('.docs-topbar').boundingBox();
  expect(toolbar).not.toBeNull();
  expect(topbar).not.toBeNull();
  expect(toolbar!.y).toBeGreaterThanOrEqual(topbar!.y + topbar!.height);
  expect(toolbar!.y).toBeLessThanOrEqual(topbar!.y + topbar!.height + 2);
});
