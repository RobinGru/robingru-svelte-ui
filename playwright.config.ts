import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  workers: 1,
  timeout: 30_000,
  reporter: 'list',
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{testFilePath}/{arg}{ext}',
  use: {
    baseURL: 'http://127.0.0.1:4174',
    navigationTimeout: 15_000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },
  webServer: {
    command: 'bun run dev -- --host 127.0.0.1 --port 4174 --strictPort',
    url: 'http://127.0.0.1:4174',
    reuseExistingServer: !process.env.CI
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 }, colorScheme: 'light' } },
    { name: 'compact', use: { viewport: { width: 1440, height: 1000 }, colorScheme: 'light' } },
    { name: 'dark', use: { viewport: { width: 1440, height: 1000 }, colorScheme: 'dark' } },
    { name: 'mobile', use: { ...devices['iPhone 13'], browserName: 'chromium' } }
  ]
});
