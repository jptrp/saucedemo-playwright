/**
 * Centralized test data for SauceDemo application
 * Contains reusable credentials, user information, and product data
 */

/**
 * Valid user credentials for SauceDemo
 */
export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  performance: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
};

/**
 * Sample customer information for checkout
 */
export const customerInfo = {
  valid: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  },
  international: {
    firstName: 'Jane',
    lastName: 'Smith',
    postalCode: 'SW1A 1AA',
  },
};

/**
 * Product names available in inventory
 * Using exact text as it appears on the site
 */
export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  redTShirt: 'Test.allTheThings() T-Shirt (Red)',
};

/**
 * Expected error messages
 */
export const errorMessages = {
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  lockedUser: 'Epic sadface: Sorry, this user has been locked out.',
  missingUsername: 'Epic sadface: Username is required',
  missingPassword: 'Epic sadface: Password is required',
  missingFirstName: 'Error: First Name is required',
  missingLastName: 'Error: Last Name is required',
  missingPostalCode: 'Error: Postal Code is required',
};

/**
 * Expected confirmation messages
 */
export const confirmationMessages = {
  orderComplete: 'Thank you for your order!',
  orderDispatched: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
};
