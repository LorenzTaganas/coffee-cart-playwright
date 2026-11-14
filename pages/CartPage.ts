import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutModalButton: Locator;
  readonly totalElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutModalButton = page.locator('[data-test="checkout"]');
    this.totalElement = page.locator('.pay-container');
  }

  // Verifies that a specific coffee is listed in the cart
  async verifyItemInCart(coffeeName: string) {
    const itemRow = this.page.locator('li', { hasText: coffeeName });
    await expect(itemRow).toBeVisible();
  }

  // Proceeds from the cart view to the payment checkout modal
  async proceedToCheckout() {
    await this.checkoutModalButton.click();
  }
}