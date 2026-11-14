import { test, expect } from '../fixtures/test-fixtures';

test.describe('Coffee Cart E2E Core Workflow', () => {

  test('Should successfully add product, handle promo, checkout, and submit payment', async ({ homePage, cartPage, checkoutPage }) => {
    // 1. Add products to cart
    await homePage.addCoffeeToCart('Cappuccino');
    await homePage.addCoffeeToCart('Espresso');
    await homePage.addCoffeeToCart('Mocha');

    // 2. Handle Promo Popup on the 3rd item
    await homePage.handlePromoIfVisible(true);

    // 3. Open checkout modal
    await homePage.openCheckoutModal();

    // 4. Submit Payment Details
    await checkoutPage.fillPaymentDetails('Lorenz Taganas', 'lorenz.taganas@example.com', true);
    await checkoutPage.submitOrder();

    // 5. Verify Success
    await checkoutPage.verifyOrderSuccess();
  });

});