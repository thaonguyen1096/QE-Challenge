import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { CommonPage } from '../src/pages/common.page';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, `.env.${process.env.ENV || 'prod'}`) });
test.use({ storageState: undefined }); // Fresh session

test.beforeEach(async ({ page }) => {  
  await page.goto('/');
});

test('Login successfully with valid username and password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
  await new CommonPage(page).verifyCartDisplay();
});

test('Fail to login with invalid username and password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("gdsga", "gsdga");
  await loginPage.verifyLoginUnsuccessfully();
});



