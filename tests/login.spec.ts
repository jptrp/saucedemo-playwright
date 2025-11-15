import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users, errorMessages } from '../fixtures/testData';

/**
 * Login Test Suite
 * Tests authentication functionality including valid/invalid credentials
 */

test.describe('Login Functionality', () => {
  test('Valid user can log in successfully', async ({ page }) => {
    // Arrange: Initialize login page
    const loginPage = new LoginPage(page);

    // Act: Navigate and perform login
    await loginPage.navigate();
    await loginPage.login(users.standard.username, users.standard.password);

    // Assert: Verify successful navigation to inventory page
    await expect(page).toHaveURL(/inventory/);
  });

  test('Invalid credentials show error message', async ({ page }) => {
    // Arrange: Initialize login page
    const loginPage = new LoginPage(page);

    // Act: Navigate and attempt login with invalid credentials
    await loginPage.navigate();
    await loginPage.login(users.invalid.username, users.invalid.password);

    // Assert: Verify error message is displayed
    await loginPage.assertLoginError();
    await loginPage.assertErrorMessage(errorMessages.invalidCredentials);
  });

  test('Locked user cannot log in', async ({ page }) => {
    // Arrange: Initialize login page
    const loginPage = new LoginPage(page);

    // Act: Navigate and attempt login with locked user
    await loginPage.navigate();
    await loginPage.login(users.locked.username, users.locked.password);

    // Assert: Verify locked user error message
    await loginPage.assertLoginError();
    await loginPage.assertErrorMessage(errorMessages.lockedUser);
  });
});
