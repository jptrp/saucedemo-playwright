import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users, products, customerInfo, errorMessages, confirmationMessages } from '../fixtures/testData';

/**
 * Checkout Process Test Suite
 * Tests the complete checkout flow including validation, order review, and confirmation
 */

test.describe('Checkout Process', () => {
  // Before each test, log in and add item to cart
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Login and add item to cart
    await loginPage.navigate();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.addItem(products.backpack);
    await inventoryPage.goToCart();
    await cartPage.beginCheckout();
  });

  test('Complete purchase with valid customer information', async ({ page }) => {
    // Arrange: Initialize checkout page
    const checkoutPage = new CheckoutPage(page);

    // Act: Fill customer info and complete order
    await checkoutPage.fillCustomerInfo(
      customerInfo.valid.firstName,
      customerInfo.valid.lastName,
      customerInfo.valid.postalCode
    );
    await checkoutPage.finishOrder();

    // Assert: Verify order confirmation
    await checkoutPage.assertOnCompletePage();
    await checkoutPage.assertConfirmationHeader(confirmationMessages.orderComplete);
  });

  test('Checkout displays error when first name is missing', async ({ page }) => {
    // Arrange: Initialize checkout page
    const checkoutPage = new CheckoutPage(page);

    // Act: Fill only last name and postal code
    await checkoutPage.fillLastName(customerInfo.valid.lastName);
    await checkoutPage.fillPostalCode(customerInfo.valid.postalCode);
    await checkoutPage.clickContinue();

    // Assert: Verify error message
    await checkoutPage.assertErrorVisible();
    await checkoutPage.assertErrorMessage(errorMessages.missingFirstName);
  });

  test('Checkout displays error when last name is missing', async ({ page }) => {
    // Arrange: Initialize checkout page
    const checkoutPage = new CheckoutPage(page);

    // Act: Fill only first name and postal code
    await checkoutPage.fillFirstName(customerInfo.valid.firstName);
    await checkoutPage.fillPostalCode(customerInfo.valid.postalCode);
    await checkoutPage.clickContinue();

    // Assert: Verify error message
    await checkoutPage.assertErrorVisible();
    await checkoutPage.assertErrorMessage(errorMessages.missingLastName);
  });

  test('Checkout displays error when postal code is missing', async ({ page }) => {
    // Arrange: Initialize checkout page
    const checkoutPage = new CheckoutPage(page);

    // Act: Fill only first and last name
    await checkoutPage.fillFirstName(customerInfo.valid.firstName);
    await checkoutPage.fillLastName(customerInfo.valid.lastName);
    await checkoutPage.clickContinue();

    // Assert: Verify error message
    await checkoutPage.assertErrorVisible();
    await checkoutPage.assertErrorMessage(errorMessages.missingPostalCode);
  });

  test('Checkout displays error when all fields are empty', async ({ page }) => {
    // Arrange: Initialize checkout page
    const checkoutPage = new CheckoutPage(page);

    // Act: Click continue without filling any fields
    await checkoutPage.clickContinue();

    // Assert: Verify first name error appears (first required field)
    await checkoutPage.assertErrorVisible();
    await checkoutPage.assertErrorMessage(errorMessages.missingFirstName);
  });

  test('Cancel button returns to cart from checkout step one', async ({ page }) => {
    // Arrange: Initialize checkout page
    const checkoutPage = new CheckoutPage(page);

    // Act: Click cancel button
    await checkoutPage.clickCancel();

    // Assert: Should be back on cart page
    await expect(page).toHaveURL(/cart/);
  });

  test('Order overview displays item and pricing information', async ({ page }) => {
    // Arrange: Initialize checkout page
    const checkoutPage = new CheckoutPage(page);

    // Act: Fill customer info to reach overview page
    await checkoutPage.fillCustomerInfo(
      customerInfo.valid.firstName,
      customerInfo.valid.lastName,
      customerInfo.valid.postalCode
    );

    // Assert: Verify pricing elements are visible
    const itemTotal = await checkoutPage.getItemTotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();

    expect(itemTotal).toContain('Item total');
    expect(tax).toContain('Tax');
    expect(total).toContain('Total');
  });

  test('Complete end-to-end purchase flow with multiple items', async ({ page }) => {
    // Arrange: Add more items before starting checkout
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Navigate back to inventory to add more items
    await page.goBack();
    await page.goBack();
    await inventoryPage.addItem(products.bikeLight);
    await inventoryPage.addItem(products.onesie);

    // Assert: Cart shows 3 items
    await inventoryPage.assertCartCount(3);

    // Act: Navigate to cart and checkout
    await inventoryPage.goToCart();
    await cartPage.assertCartItemCount(3);
    await cartPage.beginCheckout();

    // Act: Complete checkout
    await checkoutPage.fillCustomerInfo(
      customerInfo.valid.firstName,
      customerInfo.valid.lastName,
      customerInfo.valid.postalCode
    );
    await checkoutPage.finishOrder();

    // Assert: Verify successful completion
    await checkoutPage.assertOnCompletePage();
    await checkoutPage.assertConfirmationHeader(confirmationMessages.orderComplete);
  });

  test('Return to home page after completing order', async ({ page }) => {
    // Arrange: Initialize checkout page
    const checkoutPage = new CheckoutPage(page);

    // Act: Complete order
    await checkoutPage.fillCustomerInfo(
      customerInfo.valid.firstName,
      customerInfo.valid.lastName,
      customerInfo.valid.postalCode
    );
    await checkoutPage.finishOrder();

    // Assert: Verify on confirmation page
    await checkoutPage.assertOnCompletePage();

    // Act: Click back to home button
    await checkoutPage.backToHome();

    // Assert: Should be back on inventory page
    await expect(page).toHaveURL(/inventory/);

    // Assert: Cart should be empty after completing order
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.assertCartCount(0);
  });

  test('Checkout with international postal code format', async ({ page }) => {
    // Arrange: Initialize checkout page
    const checkoutPage = new CheckoutPage(page);

    // Act: Fill customer info with international postal code
    await checkoutPage.fillCustomerInfo(
      customerInfo.international.firstName,
      customerInfo.international.lastName,
      customerInfo.international.postalCode
    );
    await checkoutPage.finishOrder();

    // Assert: Verify order completion (international format accepted)
    await checkoutPage.assertOnCompletePage();
    await checkoutPage.assertConfirmationHeader(confirmationMessages.orderComplete);
  });

  test('Checkout confirmation displays complete order message', async ({ page }) => {
    // Arrange: Initialize checkout page
    const checkoutPage = new CheckoutPage(page);

    // Act: Complete order
    await checkoutPage.fillCustomerInfo(
      customerInfo.valid.firstName,
      customerInfo.valid.lastName,
      customerInfo.valid.postalCode
    );
    await checkoutPage.finishOrder();

    // Assert: Verify both header and confirmation message
    const header = await checkoutPage.getConfirmationHeader();
    const message = await checkoutPage.getConfirmationMessage();

    expect(header).toContain(confirmationMessages.orderComplete);
    expect(message).toBeTruthy();
    expect(message.length).toBeGreaterThan(0);
  });
});
