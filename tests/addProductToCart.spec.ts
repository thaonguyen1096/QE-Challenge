import { test, expect } from '@playwright/test';
import { ProductListPage } from '../src/pages/productList.page';
import { CommonPage } from '../src/pages/common.page';
import { CartPage } from '../src/pages/cart.page';
import { readCSV } from '../src/utils/readCSVFile';
import path from 'path';

test('Add product(s) to cart successfully', async ({ page }) => {
  await page.goto('/inventory.html');
  let productNames:Object[] = [];
  const filePath = path.resolve(__dirname, '../data/products.csv');
  productNames = await readCSV(filePath);

  const productListPage = await new ProductListPage(page);
  
  for(const product of productNames){
    await productListPage.addAProductToCart(product['product_name']);
  };

  const commonPage = new CommonPage(page);
  await commonPage.clickCart();

  const cartPage = new CartPage(page);
  for(const product of productNames){
    await cartPage.verifyProductIsAddedToCard(product['product_name']);
  };
});



