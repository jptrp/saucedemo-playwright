import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users, products } from '../fixtures/testData';

/**
 * Inventory Test Suite
 * Tests product catalog and inventory interactions
 */

test.describe('Inventory Page Functionality', () => {
  // Before each test, log in as standard user
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('Add item to cart and navigate to cart page', async ({ page }) => {
    // Arrange: Initialize inventory page
    const inventoryPage = new InventoryPage(page);

    // Act: Add item to cart and navigate to cart
    await inventoryPage.addItem(products.backpack);
    await inventoryPage.goToCart();

    // Assert: Verify navigation to cart page
    await expect(page).toHaveURL(/cart/);
  });

  test('Cart badge updates when item is added', async ({ page }) => {
    // Arrange: Initialize inventory page
    const inventoryPage = new InventoryPage(page);

    // Assert: Cart should start empty
    await inventoryPage.assertCartCount(0);

    // Act: Add first item
    await inventoryPage.addItem(products.backpack);

    // Assert: Cart badge should show 1
    await inventoryPage.assertCartCount(1);

    // Act: Add second item
    await inventoryPage.addItem(products.bikeLight);

    // Assert: Cart badge should show 2
    await inventoryPage.assertCartCount(2);
  });

  test('Item button changes to "Remove" after adding to cart', async ({ page }) => {
    // Arrange: Initialize inventory page
    const inventoryPage = new InventoryPage(page);

    // Assert: Item should not be in cart initially
    await inventoryPage.assertItemCanBeAdded(products.backpack);

    // Act: Add item to cart
    await inventoryPage.addItem(products.backpack);

    // Assert: Item should now be in cart (Remove button visible)
    const isInCart = await inventoryPage.isItemInCart(products.backpack);
    expect(isInCart).toBeTruthy();
  });
});
