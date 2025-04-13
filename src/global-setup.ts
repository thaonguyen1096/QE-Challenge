// global-setup.ts
import { FullConfig, chromium, firefox, webkit } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { LoginPage } from './pages/login.page';

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.ENV || 'test'}`),
});

// Map Playwright browser names to their launchers
const browserLaunchers: Record<string, any> = {
  chromium,
  firefox,
  webkit
};

async function globalSetup(config: FullConfig) {
  const projects = config.projects;

  for (const project of projects) {
    const browserName = project.name;

    if (!browserLaunchers[browserName]) {
      console.log(`ℹ️ Skipping session setup for non-browser project: ${browserName}`);
      continue;
    }

    const browser = await browserLaunchers[browserName].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(process.env.BASE_URL!);
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
    const storageFile = `auth.${browserName}.json`;
    await context.storageState({ path: storageFile });
    await browser.close();
    console.log(`✅ Logged in on ${browserName} → ${storageFile}`);
  }
}

export default globalSetup;
