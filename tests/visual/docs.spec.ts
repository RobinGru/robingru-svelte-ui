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

for (const route of ['/blog', '/data']) {
  test(`${route} remains visually stable`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot(`${route.slice(1)}.png`, {
      animations: 'disabled',
      caret: 'hide'
    });
  });
}
