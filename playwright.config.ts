import { defineConfig } from '@playwright/test';
import { TimeOut } from '@constants/TimeOut';
import { BrowserEnum, BrowserChannelEnum, BrowserNameEnum } from '@enums/BrowserEnum';
import path from 'path';

export default defineConfig({
  timeout: TimeOut.XLONG,
  retries: 0,
  workers: 1,
  expect: {
    timeout: TimeOut.DEFAULT,
  },
  reporter: [
    ['html', { open: 'always' }],
    ['allure-playwright', { outputFolder: './src/reports/allure-results' }]
  ],
  outputDir: './src/reports/test-artifacts',
  name: BrowserNameEnum.CHROMIUM,
  projects: [
    {
      name: 'web',
      testDir: './src/tests/web',
      use: {
        headless: true,
        ignoreHTTPSErrors: true,
        browserName: BrowserEnum.CHROMIUM as const,
        channel: BrowserChannelEnum.CHROME as const,
        screenshot: 'only-on-failure' as const,
        video: 'retain-on-failure' as const,
        trace: 'on-first-retry' as const,
      },
    },
    {
      name: 'api',
      testDir: './src/tests/api',
      use: {},
    }
  ],
});
