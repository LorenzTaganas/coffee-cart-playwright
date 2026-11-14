import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly checkoutModalButton: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly promotionCheckbox: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutModalButton = page.locator('[data-test="checkout"]');
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.promotionCheckbox = page.locator('#promotion');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.successMessage = page.locator('.success, snackbar, .snackbar'); 
  }

  async fillPaymentDetails(name: string, email: string, wantPromotion: boolean = false) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    
    if (wantPromotion && (await this.promotionCheckbox.isVisible())) {
      await this.promotionCheckbox.check();
    }
  }

  async submitOrder() {
    await this.submitButton.click();
  }

  async verifyOrderSuccess() {
    await expect(this.page.getByText(/thanks for your purchase|success/i)).toBeVisible({ timeout: 10000 });
  }
}