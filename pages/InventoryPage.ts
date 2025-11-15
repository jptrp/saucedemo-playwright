import { BasePage } from './BasePage';
import { Page, expect } from '@playwright/test';

/**
 * InventoryPage represents the product inventory/catalog page
 * Handles product selection, cart operations, and inventory navigation
 */
export class InventoryPage extends BasePage {
  // Locators for cart and inventory elements
  readonly cartIcon = this.page.locator('.shopping_cart_link');
  readonly cartBadge = this.page.locator('.shopping_cart_badge');
  readonly inventoryContainer = this.page.locator('.inventory_container');
  readonly inventoryItems = this.page.locator('.inventory_item');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Get the "Add to cart" button for a specific product
   * @param itemName - The name of the product
   * @returns Locator for the add to cart button
   */
  private addToCartButton(itemName: string) {
    return this.page
      .locator('.inventory_item', { hasText: itemName })
      .locator('button:has-text("Add to cart")');
  }

  /**
   * Get the "Remove" button for a specific product
   * @param itemName - The name of the product
   * @returns Locator for the remove button
   */
  private removeButton(itemName: string) {
    return this.page
      .locator('.inventory_item', { hasText: itemName })
      .locator('button:has-text("Remove")');
  }

  /**
   * Add a specific item to the shopping cart
   * @param itemName - The name of the product to add
   * @example await inventoryPage.addItem('Sauce Labs Backpack')
   */
  async addItem(itemName: string): Promise<void> {
    await this.addToCartButton(itemName).click();
  }

  /**
   * Remove a specific item from the shopping cart
   * @param itemName - The name of the product to remove
   * @example await inventoryPage.removeItem('Sauce Labs Backpack')
   */
  async removeItem(itemName: string): Promise<void> {
    await this.removeButton(itemName).click();
  }

  /**
   * Navigate to the shopping cart page
   */
  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }

  /**
   * Get the current cart item count from the badge
   * @returns The number of items in cart, or 0 if badge not visible
   */
  async getCartCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return parseInt(text || '0', 10);
    }
    return 0;
  }

  /**
   * Verify the cart badge shows a specific count
   * @param expectedCount - The expected number of items in cart
   */
  async assertCartCount(expectedCount: number): Promise<void> {
    if (expectedCount === 0) {
      await expect(this.cartBadge).not.toBeVisible();
    } else {
      await expect(this.cartBadge).toHaveText(expectedCount.toString());
    }
  }

  /**
   * Check if an item is currently in the cart (button shows "Remove")
   * @param itemName - The name of the product
   * @returns True if item is in cart, false otherwise
   */
  async isItemInCart(itemName: string): Promise<boolean> {
    return await this.removeButton(itemName).isVisible();
  }

  /**
   * Verify that an item can be added to cart (button shows "Add to cart")
   * @param itemName - The name of the product
   */
  async assertItemCanBeAdded(itemName: string): Promise<void> {
    await expect(this.addToCartButton(itemName)).toBeVisible();
  }

  /**
   * Get the total number of products displayed on the inventory page
   * @returns The count of inventory items
   */
  async getInventoryItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }
}
