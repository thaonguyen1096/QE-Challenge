import { expect, type Locator, type Page } from '@playwright/test';

export class CommonPage {
  private readonly page: Page;
  private readonly cart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cart = page.locator('#shopping_cart_container');
  }

  async clickCart()
  { 
    await this.cart.click();
  }

  async verifyCartDisplay()
  {
    await expect(this.cart).toBeVisible();
  }
}
