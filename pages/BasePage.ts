import { Page } from '@playwright/test';

/**
 * BasePage class provides common functionality shared across all page objects
 * This includes navigation, common waits, and shared utility methods
 */
export class BasePage {
  constructor(public page: Page) {}

  /**
   * Navigate to a specific path relative to the baseURL
   * @param path - The path to navigate to (defaults to home page)
   * @example await basePage.navigate('/inventory.html')
   */
  async navigate(path: string = '') {
    await this.page.goto(path);
  }

  /**
   * Get the current URL of the page
   * @returns The current page URL as a string
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wait for the page to navigate to a URL matching a pattern
   * @param urlPattern - RegExp or string pattern to match against URL
   * @example await basePage.waitForUrl(/inventory/)
   */
  async waitForUrl(urlPattern: RegExp | string): Promise<void> {
    await this.page.waitForURL(urlPattern);
  }
}
