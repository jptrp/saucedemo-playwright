import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users, products } from '../fixtures/testData';

/**
 * Shopping Cart Test Suite
 * Tests cart operations including adding/removing items and cart validation
 */

test.describe('Shopping Cart Functionality', () => {
  // Before each test, log in as standard user
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('Add multiple items to cart from inventory', async ({ page }) => {
    // Arrange: Initialize pages
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Act: Add multiple items to cart
    await inventoryPage.addItem(products.backpack);
    await inventoryPage.addItem(products.bikeLight);
    await inventoryPage.addItem(products.boltTShirt);

    // Assert: Cart badge should show correct count
    await inventoryPage.assertCartCount(3);

    // Act: Navigate to cart
    await inventoryPage.goToCart();

    // Assert: All items should be in cart
    await cartPage.assertItemInCart(products.backpack);
    await cartPage.assertItemInCart(products.bikeLight);
    await cartPage.assertItemInCart(products.boltTShirt);
    await cartPage.assertCartItemCount(3);
  });

  test('Remove item from cart', async ({ page }) => {
    // Arrange: Initialize pages and add items
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addItem(products.backpack);
    await inventoryPage.addItem(products.bikeLight);
    await inventoryPage.goToCart();

    // Assert: Both items should be in cart
    await cartPage.assertCartItemCount(2);
    await cartPage.assertCartBadgeCount(2);

    // Act: Remove one item
    await cartPage.removeItem(products.backpack);

    // Assert: Only one item remains
    await cartPage.assertCartItemCount(1);
    await cartPage.assertCartBadgeCount(1);
    await cartPage.assertItemNotInCart(products.backpack);
    await cartPage.assertItemInCart(products.bikeLight);
  });

  test('Remove all items from cart', async ({ page }) => {
    // Arrange: Initialize pages and add items
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addItem(products.backpack);
    await inventoryPage.addItem(products.bikeLight);
    await inventoryPage.goToCart();

    // Assert: Items should be in cart
    await cartPage.assertCartItemCount(2);

    // Act: Remove all items
    await cartPage.removeItem(products.backpack);
    await cartPage.removeItem(products.bikeLight);

    // Assert: Cart should be empty
    await cartPage.assertCartItemCount(0);
    await cartPage.assertCartBadgeCount(0);
    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBeTruthy();
  });

  test('Cart badge count updates correctly when removing items', async ({ page }) => {
    // Arrange: Initialize pages and add items
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addItem(products.backpack);
    await inventoryPage.addItem(products.bikeLight);
    await inventoryPage.addItem(products.onesie);

    // Assert: Badge shows 3
    await inventoryPage.assertCartCount(3);

    // Act: Navigate to cart and remove one item
    await inventoryPage.goToCart();
    await cartPage.removeItem(products.bikeLight);

    // Assert: Badge shows 2
    await cartPage.assertCartBadgeCount(2);

    // Act: Remove another item
    await cartPage.removeItem(products.onesie);

    // Assert: Badge shows 1
    await cartPage.assertCartBadgeCount(1);
  });

  test('Cart contents match selected items from inventory', async ({ page }) => {
    // Arrange: Initialize pages
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    const selectedItems = [products.backpack, products.fleeceJacket, products.redTShirt];

    // Act: Add specific items to cart
    for (const item of selectedItems) {
      await inventoryPage.addItem(item);
    }

    // Act: Navigate to cart
    await inventoryPage.goToCart();

    // Assert: Verify cart contains exactly the selected items
    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems.sort()).toEqual(selectedItems.sort());
  });

  test('Continue shopping button returns to inventory', async ({ page }) => {
    // Arrange: Initialize pages and navigate to cart
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addItem(products.backpack);
    await inventoryPage.goToCart();

    // Act: Click continue shopping
    await cartPage.continueShopping();

    // Assert: Should be back on inventory page
    await expect(page).toHaveURL(/inventory/);
  });

  test('Empty cart displays correctly', async ({ page }) => {
    // Arrange: Initialize pages
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Act: Navigate to cart without adding items
    await inventoryPage.goToCart();

    // Assert: Cart should be empty
    await cartPage.assertCartItemCount(0);
    await cartPage.assertCartBadgeCount(0);
    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBeTruthy();
  });

  test('Cart persists items when navigating back and forth', async ({ page }) => {
    // Arrange: Initialize pages
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Act: Add items and navigate to cart
    await inventoryPage.addItem(products.backpack);
    await inventoryPage.addItem(products.bikeLight);
    await inventoryPage.goToCart();

    // Assert: Items are in cart
    await cartPage.assertCartItemCount(2);

    // Act: Go back to inventory
    await cartPage.continueShopping();

    // Assert: Cart badge still shows 2
    await inventoryPage.assertCartCount(2);

    // Act: Navigate back to cart
    await inventoryPage.goToCart();

    // Assert: Items still in cart
    await cartPage.assertCartItemCount(2);
    await cartPage.assertItemInCart(products.backpack);
    await cartPage.assertItemInCart(products.bikeLight);
  });
});
