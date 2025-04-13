import { expect, type Locator, type Page } from '@playwright/test';

export class ProductListPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private addToCartButton(productName: string): Locator {
    const addToCartLocator = productName.toLowerCase().replaceAll(' ', '-');
    return this.page.locator(`[id='add-to-cart-${addToCartLocator}']`);
  }

  async addAProductToCart(productName: string)
  {
    await this.addToCartButton(productName).click();
  }
}