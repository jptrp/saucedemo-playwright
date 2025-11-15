import { BasePage } from './BasePage';
import { expect, Page } from '@playwright/test';

/**
 * LoginPage represents the login page of SauceDemo application
 * Handles authentication actions and error message validation
 */
export class LoginPage extends BasePage {
  // Locators using data-test attributes for stability
  readonly usernameField = this.page.locator('#user-name');
  readonly passwordField = this.page.locator('#password');
  readonly loginButton = this.page.locator('#login-button');
  readonly errorMessage = this.page.locator('[data-test="error"]');
  readonly errorButton = this.page.locator('.error-button');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Perform login with provided credentials
   * @param username - Username for authentication
   * @param password - Password for authentication
   * @example await loginPage.login('standard_user', 'secret_sauce')
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  /**
   * Assert that an error message is visible on the page
   * Used for validating failed login attempts
   */
  async assertLoginError(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }

  /**
   * Get the error message text displayed on the login page
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
   * Check if user is on the login page
   * @returns True if on login page, false otherwise
   */
  async isOnLoginPage(): Promise<boolean> {
    return await this.loginButton.isVisible();
  }
}