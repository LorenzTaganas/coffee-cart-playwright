import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly promoBanner: Locator;
  readonly promoAcceptButton: Locator;
  readonly promoSkipButton: Locator;
  readonly checkoutButton: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.promoBanner = page.locator('.promo');
    this.promoAcceptButton = page.getByRole('button', { name: 'Yes, of course!' });
    this.promoSkipButton = page.getByRole('button', { name: "Nah, I'll skip." });
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartLink = page.getByRole('link', { name: /cart \(\d+\)/i });
  }

  async goto() {
    await this.page.goto('/');
  }

  // Clicks the coffee cup graphic by its accessible name (e.g., "Cappuccino")
  async addCoffeeToCart(coffeeName: string) {
    await this.page.locator(`[data-test="${coffeeName}"]`).click();
  }

  // Handles the promo popup conditionally if it appears on every 3rd item
  async handlePromoIfVisible(acceptPromo: boolean = true) {
    if (await this.promoBanner.isVisible()) {
      if (acceptPromo) {
        await this.promoAcceptButton.click();
      } else {
        await this.promoSkipButton.click();
      }
    }
  }

  // Bonus Feature A: Double-click coffee title to translate to Chinese
  async doubleClickCoffeeTitle(coffeeName: string) {
    await this.page.locator('h4', { hasText: coffeeName }).dblclick();
  }

  // Bonus Feature B: Right-click coffee cup to open add-to-cart dialog
  async rightClickCoffeeAndConfirm(coffeeName: string) {
    await this.page.locator(`[data-test="${coffeeName}"]`).click({ button: 'right' });
    await this.page.getByRole('button', { name: 'Yes' }).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async openCheckoutModal() {
    await this.checkoutButton.click();
  }
}