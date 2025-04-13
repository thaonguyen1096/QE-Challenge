import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('div.error h3');
  }

  async goto() {
    await this.page.goto('/');
  }

  async inputUsername(username:string) {
    await this.username.fill(username);
  }

  async inputPassword(password:string) {
    await this.password.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(username:string, password:string) {
    await this.inputUsername(username);
    await this.inputPassword(password);
    await this.clickLoginButton();
  }

  async verifyLoginUnsuccessfully()
  {
    expect(await this.errorMessage.textContent()).toBe("Epic sadface: Username and password do not match any user in this service");
  }
}