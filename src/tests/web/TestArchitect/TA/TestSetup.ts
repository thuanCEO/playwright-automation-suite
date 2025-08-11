import { Browser, Page } from '@playwright/test';
import { TestArchitectPage } from 'src/pages/TestArchitect/ArchitectPages';
import { LoginPage } from 'src/pages/TestArchitect/LoginPage';

export async function RegisterAccountTA(browser: Browser): Promise<Page> {
  const context = await browser.newContext();
  const page = await context.newPage();
  const testArchitectPage = new TestArchitectPage(page);
  const loginPage = new LoginPage(page);

  await testArchitectPage.gotoAndClickLogin();
  await loginPage.registerWithEmail();

  return page;
}
