import { BasePage } from './BasePage';
import { Page, expect, Locator } from '@playwright/test';

/**
 * CartPage represents the shopping cart page
 * Handles cart item management, verification, and checkout navigation
 */
export class CartPage extends BasePage {
  // Main cart elements
  readonly checkoutButton = this.page.locator('[data-test="checkout"]');
  readonly continueShoppingButton = this.page.locator('[data-test="continue-shopping"]');
  readonly cartItems = this.page.locator('.cart_item');
  readonly cartBadge = this.page.locator('.shopping_cart_badge');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Get the cart item element for a specific product
   * @param itemName - The name of the product
   * @returns Locator for the cart item
   */
  private getCartItem(itemName: string): Locator {
    return this.page.locator('.cart_item', { hasText: itemName });
  }

  /**
   * Get the remove button for a specific product in cart
   * @param itemName - The name of the product
   * @returns Locator for the remove button
   */
  private getRemoveButton(itemName: string): Locator {
    return this.getCartItem(itemName).locator('button:has-text("Remove")');
  }

  /**
   * Get the quantity element for a specific product in cart
   * @param itemName - The name of the product
   * @returns Locator for the quantity display
   */
  private getItemQuantity(itemName: string): Locator {
    return this.getCartItem(itemName).locator('.cart_quantity');
  }

  /**
   * Proceed to checkout process
   */
  async beginCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /**
   * Remove a specific item from the cart
   * @param itemName - The name of the product to remove
   * @example await cartPage.removeItem('Sauce Labs Backpack')
   */
  async removeItem(itemName: string): Promise<void> {
    await this.getRemoveButton(itemName).click();
  }

  /**
   * Continue shopping (return to inventory page)
   */
  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  /**
   * Get the total number of items in the cart
   * @returns The count of cart items
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Get the current cart badge count
   * @returns The number displayed in cart badge, or 0 if not visible
   */
  async getCartBadgeCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return parseInt(text || '0', 10);
    }
    return 0;
  }

  /**
   * Verify that a specific item is present in the cart
   * @param itemName - The name of the product
   */
  async assertItemInCart(itemName: string): Promise<void> {
    await expect(this.getCartItem(itemName)).toBeVisible();
  }

  /**
   * Verify that a specific item is NOT in the cart
   * @param itemName - The name of the product
   */
  async assertItemNotInCart(itemName: string): Promise<void> {
    await expect(this.getCartItem(itemName)).not.toBeVisible();
  }

  /**
   * Verify the total number of items in cart
   * @param expectedCount - The expected number of items
   */
  async assertCartItemCount(expectedCount: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  /**
   * Verify the cart badge shows a specific count
   * @param expectedCount - The expected number in badge
   */
  async assertCartBadgeCount(expectedCount: number): Promise<void> {
    if (expectedCount === 0) {
      await expect(this.cartBadge).not.toBeVisible();
    } else {
      await expect(this.cartBadge).toHaveText(expectedCount.toString());
    }
  }

  /**
   * Check if the cart is empty
   * @returns True if cart has no items, false otherwise
   */
  async isCartEmpty(): Promise<boolean> {
    const count = await this.getCartItemCount();
    return count === 0;
  }

  /**
   * Get list of all item names currently in the cart
   * @returns Array of product names
   */
  async getCartItemNames(): Promise<string[]> {
    const items = await this.cartItems.all();
    const names: string[] = [];
    for (const item of items) {
      const name = await item.locator('.inventory_item_name').textContent();
      if (name) names.push(name);
    }
    return names;
  }
}
