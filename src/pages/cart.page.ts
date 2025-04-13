import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly cart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cart = page.locator('#shopping_cart_container');
  }

  private productName(productName: string): Locator {
    return this.page.locator('.inventory_item_name', {hasText: productName});
  }

  async verifyProductIsAddedToCard(productName: string)
  {
    await expect(this.productName(productName)).toBeVisible();
  }
}