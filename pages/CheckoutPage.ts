import { BasePage } from './BasePage';
import { Page, expect } from '@playwright/test';

/**
 * CheckoutPage represents the multi-step checkout process
 * Handles customer information, order review, and order completion
 */
export class CheckoutPage extends BasePage {
  // Step 1: Customer information form elements
  readonly firstName = this.page.locator('#first-name');
  readonly lastName = this.page.locator('#last-name');
  readonly postalCode = this.page.locator('#postal-code');
  readonly continueButton = this.page.locator('[data-test="continue"]');
  readonly cancelButton = this.page.locator('[data-test="cancel"]');
  readonly errorMessage = this.page.locator('[data-test="error"]');

  // Step 2: Order overview elements
  readonly finishButton = this.page.locator('[data-test="finish"]');
  readonly itemTotal = this.page.locator('.summary_subtotal_label');
  readonly tax = this.page.locator('.summary_tax_label');
  readonly total = this.page.locator('.summary_total_label');

  // Step 3: Confirmation elements
  readonly confirmationHeader = this.page.locator('.complete-header');
  readonly confirmationMessage = this.page.locator('.complete-text');
  readonly backHomeButton = this.page.locator('[data-test="back-to-products"]');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Fill in customer information on checkout step one
   * @param firstName - Customer's first name
   * @param lastName - Customer's last name
   * @param postalCode - Customer's postal/zip code
   * @example await checkoutPage.fillCustomerInfo('John', 'Doe', '12345')
   */
  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
  }

  /**
   * Fill only the first name field (for validation testing)
   * @param firstName - Customer's first name
   */
  async fillFirstName(firstName: string): Promise<void> {
    await this.firstName.fill(firstName);
  }

  /**
   * Fill only the last name field (for validation testing)
   * @param lastName - Customer's last name
   */
  async fillLastName(lastName: string): Promise<void> {
    await this.lastName.fill(lastName);
  }

  /**
   * Fill only the postal code field (for validation testing)
   * @param postalCode - Customer's postal/zip code
   */
  async fillPostalCode(postalCode: string): Promise<void> {
    await this.postalCode.fill(postalCode);
  }

  /**
   * Click the continue button on checkout step one
   */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Click the cancel button to return to cart
   */
  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  /**
   * Complete the order by clicking finish button
   */
  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Return to inventory page from order confirmation
   */
  async backToHome(): Promise<void> {
    await this.backHomeButton.click();
  }

  /**
   * Get the error message text displayed on checkout
   * @returns The error message text
   */
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Verify that a specific error message is displayed
   * @param expectedMessage - The expected error message text
   */
  async assertErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  /**
   * Verify that an error message is visible
   */
  async assertErrorVisible(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }

  /**
   * Get the order confirmation header text
   * @returns The confirmation header text
   */
  async getConfirmationHeader(): Promise<string> {
    return await this.confirmationHeader.textContent() || '';
  }

  /**
   * Get the order confirmation message text
   * @returns The confirmation message text
   */
  async getConfirmationMessage(): Promise<string> {
    return await this.confirmationMessage.textContent() || '';
  }

  /**
   * Verify the order confirmation header contains expected text
   * @param expectedText - The expected header text
   */
  async assertConfirmationHeader(expectedText: string): Promise<void> {
    await expect(this.confirmationHeader).toContainText(expectedText);
  }

  /**
   * Verify the order confirmation message contains expected text
   * @param expectedText - The expected message text
   */
  async assertConfirmationMessage(expectedText: string): Promise<void> {
    await expect(this.confirmationMessage).toContainText(expectedText);
  }

  /**
   * Verify user is on the checkout complete page
   */
  async assertOnCompletePage(): Promise<void> {
    await expect(this.confirmationHeader).toBeVisible();
    await expect(this.backHomeButton).toBeVisible();
  }

  /**
   * Get the item subtotal from order overview
   * @returns The subtotal as a string (e.g., "Item total: $29.99")
   */
  async getItemTotal(): Promise<string> {
    return await this.itemTotal.textContent() || '';
  }

  /**
   * Get the tax amount from order overview
   * @returns The tax as a string (e.g., "Tax: $2.40")
   */
  async getTax(): Promise<string> {
    return await this.tax.textContent() || '';
  }

  /**
   * Get the total amount from order overview
   * @returns The total as a string (e.g., "Total: $32.39")
   */
  async getTotal(): Promise<string> {
    return await this.total.textContent() || '';
  }
}
