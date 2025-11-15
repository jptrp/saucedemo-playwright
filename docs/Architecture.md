# Architecture Documentation

## 1. Overview

This document describes the architectural design of the SauceDemo Playwright automation framework. The architecture follows industry best practices including the Page Object Model (POM) pattern, separation of concerns, and maintainable test design.

## 2. Architecture Principles

### 2.1 Core Principles

- **Separation of Concerns**: Test logic separated from page interactions
- **DRY (Don't Repeat Yourself)**: Reusable components and methods
- **Single Responsibility**: Each class has one clear purpose
- **Open/Closed Principle**: Open for extension, closed for modification
- **Maintainability**: Easy to update when application changes
- **Scalability**: Can grow with additional pages and tests

### 2.2 Design Goals

- Minimize code duplication
- Maximize test readability
- Ensure deterministic test execution
- Enable parallel test execution
- Support multiple browsers
- Facilitate CI/CD integration

## 3. High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Test Layer                          │
│  (tests/*.spec.ts - Test scenarios and assertions)      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 Page Object Layer                        │
│      (pages/*.ts - Page-specific interactions)           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │ Login    │  │Inventory │  │  Cart    │  │Checkout  ││
│  │  Page    │  │   Page   │  │  Page    │  │  Page    ││
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘│
│       │             │              │              │      │
│       └─────────────┴──────────────┴──────────────┘      │
│                     │                                     │
│              ┌──────▼──────┐                             │
│              │  BasePage   │                             │
│              │  (Common)   │                             │
│              └─────────────┘                             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Test Data Layer                             │
│  (fixtures/testData.ts - Centralized test data)         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│               Playwright Core                            │
│    (Browser automation, locators, assertions)            │
└─────────────────────────────────────────────────────────┘
```

## 4. Component Architecture

### 4.1 Test Layer

**Location**: `/tests/`

**Responsibility**: Define test scenarios, setup, and assertions

**Structure**:
```
tests/
├── login.spec.ts       - Authentication tests
├── inventory.spec.ts   - Product browsing tests
├── cart.spec.ts        - Shopping cart tests
└── checkout.spec.ts    - Checkout process tests
```

**Key Characteristics**:
- Test suites organized by feature/module
- AAA pattern (Arrange, Act, Assert)
- `beforeEach` hooks for test setup
- Descriptive test names
- Clear assertion messages

**Example Pattern**:
```typescript
test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup common to all tests
  });

  test('Specific scenario description', async ({ page }) => {
    // Arrange: Setup test data and page objects
    // Act: Perform actions
    // Assert: Verify outcomes
  });
});
```

### 4.2 Page Object Layer

**Location**: `/pages/`

**Responsibility**: Encapsulate page-specific elements and interactions

**Structure**:
```
pages/
├── BasePage.ts         - Common functionality
├── LoginPage.ts        - Login page interactions
├── InventoryPage.ts    - Inventory/catalog page
├── CartPage.ts         - Shopping cart page
└── CheckoutPage.ts     - Checkout flow pages
```

**BasePage (Parent Class)**:
```typescript
class BasePage {
  constructor(public page: Page)
  
  // Common navigation methods
  async navigate(path: string)
  async getCurrentUrl(): Promise<string>
  async waitForUrl(pattern: RegExp)
}
```

**Page Object Pattern**:
```typescript
class SpecificPage extends BasePage {
  // Locators (readonly, defined at top)
  readonly element = this.page.locator('selector');
  
  // Public action methods
  async performAction(): Promise<void>
  
  // Public assertion methods
  async assertState(): Promise<void>
  
  // Public getter methods
  async getValue(): Promise<string>
  
  // Private helper methods
  private helperMethod(): Locator
}
```

**Design Rules**:
- All locators are `readonly`
- Methods return `Promise<void>` or specific types
- Private methods for internal helpers
- No test assertions in page objects (except assertion helpers)
- Methods named clearly (verb-based)

### 4.3 Test Data Layer

**Location**: `/fixtures/testData.ts`

**Responsibility**: Centralize all test data

**Structure**:
```typescript
export const users = {
  standard: { username: '...', password: '...' },
  locked: { username: '...', password: '...' },
  // ... more users
};

export const products = {
  backpack: 'Sauce Labs Backpack',
  // ... more products
};

export const customerInfo = {
  valid: { firstName: '...', lastName: '...', postalCode: '...' },
  // ... more customer data
};

export const errorMessages = {
  invalidCredentials: '...',
  // ... more messages
};
```

**Benefits**:
- Single source of truth
- Easy bulk updates
- Type-safe access
- Reusable across all tests
- Version control friendly

### 4.4 Configuration Layer

**Location**: `/playwright.config.ts`

**Responsibility**: Framework configuration

**Key Settings**:
```typescript
{
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : undefined,
  
  use: {
    baseURL: 'https://www.saucedemo.com/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
}
```

## 5. Data Flow

### 5.1 Typical Test Execution Flow

```
1. Test starts
   └─> Reads test data from fixtures
   
2. Test creates page object instances
   └─> Page objects receive Playwright page context
   
3. Test calls page object methods
   └─> Page objects interact with DOM via locators
   └─> Page objects return results
   
4. Test performs assertions
   └─> Uses Playwright's expect API
   
5. Test completes
   └─> Screenshot/video captured if failed
   └─> Results logged to reporters
```

### 5.2 Page Object Interaction Flow

```
Test Method Call
      │
      ▼
Page Object Public Method
      │
      ├──> Uses locators (readonly)
      │
      ├──> Calls Playwright actions
      │    (click, fill, select, etc.)
      │
      ├──> May call private helpers
      │
      └──> Returns result (if applicable)
```

## 6. Locator Strategy

### 6.1 Selector Hierarchy (Priority Order)

1. **Data-test attributes** (Most Stable)
   ```typescript
   this.page.locator('[data-test="checkout"]')
   ```

2. **ID selectors**
   ```typescript
   this.page.locator('#user-name')
   ```

3. **CSS class selectors**
   ```typescript
   this.page.locator('.shopping_cart_link')
   ```

4. **Text content** (Least Stable)
   ```typescript
   this.page.locator('button:has-text("Add to cart")')
   ```

### 6.2 Locator Best Practices

- Use chaining for precision:
  ```typescript
  this.page.locator('.inventory_item', { hasText: 'Backpack' })
             .locator('button:has-text("Add to cart")')
  ```

- Avoid XPath when possible
- Leverage Playwright's auto-waiting
- Use role-based locators for accessibility
- Store complex locators as private methods

## 7. Test Execution Architecture

### 7.1 Parallel Execution

```
Test Suite
    │
    ├──> Worker 1: login.spec.ts
    │
    ├──> Worker 2: inventory.spec.ts
    │
    ├──> Worker 3: cart.spec.ts
    │
    └──> Worker 4: checkout.spec.ts
```

**Configuration**:
- `fullyParallel: true` - All tests run in parallel
- `workers: 4` (local), `2` (CI) - Concurrent execution
- Each worker gets isolated browser context

### 7.2 Retry Mechanism

```
Test Execution
    │
    ├──> Attempt 1 (main run)
    │    └──> Failed? → Retry
    │
    ├──> Attempt 2 (retry 1)
    │    └──> Failed? → Retry
    │
    └──> Attempt 3 (retry 2, CI only)
         └──> Final result recorded
```

## 8. CI/CD Integration Architecture

### 8.1 GitHub Actions Workflow

```
Push/PR Trigger
      │
      ▼
┌──────────────────┐
│  Checkout Code   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Setup Node.js   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Install Deps     │
│ (npm ci)         │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Install Browsers │
│ (with deps)      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Run Tests       │
│  (all browsers)  │
└────────┬─────────┘
         │
         ├──> Success: Upload artifacts
         │
         └──> Failure: Upload artifacts + fail build
```

### 8.2 Artifact Management

**Captured on Failure**:
- Screenshots (PNG)
- Videos (WebM)
- Traces (ZIP)
- HTML report

**Storage**:
- GitHub Actions artifacts (30-day retention)
- Accessible via workflow run page

## 9. Error Handling Architecture

### 9.1 Assertion Strategy

**Page Object Layer**:
- Provides assertion helper methods
- Uses Playwright's `expect` API
- Returns boolean states for conditional logic

**Test Layer**:
- Performs all test assertions
- Uses descriptive messages
- Groups related assertions

### 9.2 Retry and Recovery

```
Action Execution
    │
    ├──> Auto-retry (Playwright built-in)
    │    └──> Waits for element
    │    └──> Retries if not ready
    │
    ├──> Test-level retry (configured)
    │    └──> Re-runs entire test
    │
    └──> Manual recovery (if needed)
         └──> Custom error handling
```

## 10. Scalability Considerations

### 10.1 Adding New Pages

1. Create new page class extending `BasePage`
2. Define locators as readonly properties
3. Implement action methods
4. Implement assertion helpers
5. Document with JSDoc comments

### 10.2 Adding New Tests

1. Create or extend test spec file
2. Import required page objects
3. Import test data from fixtures
4. Follow AAA pattern
5. Use descriptive names

### 10.3 Adding New Test Data

1. Add to appropriate section in `testData.ts`
2. Use clear, descriptive keys
3. Document with comments
4. Export for use in tests

## 11. Performance Optimization

### 11.1 Test Execution Speed

- Parallel execution (multiple workers)
- Efficient selectors (CSS > XPath)
- Reuse browser contexts where possible
- Minimize unnecessary waits

### 11.2 Maintenance Efficiency

- Centralized test data (one place to update)
- Page Object Model (UI changes isolated)
- Clear naming conventions (easy to find)
- Comprehensive documentation (reduce learning curve)

## 12. Quality Assurance

### 12.1 Code Quality Measures

- TypeScript strict mode
- ESLint rules
- Consistent formatting
- Code reviews
- Documentation requirements

### 12.2 Test Quality Measures

- Deterministic tests (no flakiness)
- Independent tests (no dependencies)
- Clear test names
- Comprehensive coverage
- Regular maintenance

## 13. Future Architecture Enhancements

### 13.1 Potential Additions

- **API mocking layer** - For isolated UI testing
- **Custom fixtures** - Playwright test fixtures
- **Helper utilities** - Common test utilities
- **Visual regression** - Screenshot comparison
- **Accessibility testing** - axe-core integration
- **Performance monitoring** - Lighthouse integration

### 13.2 Scalability Path

```
Current State              Future State
     (25 tests)      →      (100+ tests)
         │                       │
         ├─ login              ├─ authentication
         ├─ inventory          ├─ catalog
         ├─ cart               ├─ cart
         └─ checkout           ├─ checkout
                               ├─ user-profile
                               ├─ admin
                               └─ reporting
```

## 14. Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Language | TypeScript | 5.3.3 | Type safety, modern JS |
| Framework | Playwright | 1.44.0 | Browser automation |
| Runtime | Node.js | 20.x | JavaScript execution |
| CI/CD | GitHub Actions | Latest | Automated testing |
| VCS | Git | Latest | Version control |

## 15. Architecture Decisions

### 15.1 Why Page Object Model?

**Pros**:
- Separation of concerns
- Reusability
- Maintainability
- Reduced duplication

**Cons**:
- Initial setup overhead
- More files to manage

**Decision**: Benefits outweigh costs for maintainable framework

### 15.2 Why TypeScript?

**Pros**:
- Type safety
- Better IDE support
- Catch errors at compile time
- Modern language features

**Cons**:
- Compilation step
- Learning curve

**Decision**: Type safety crucial for large codebases

### 15.3 Why Centralized Test Data?

**Pros**:
- Single source of truth
- Easy updates
- Consistent data usage

**Cons**:
- All data in one file

**Decision**: Easier maintenance worth the tradeoff

---

**Document Version**: 1.0  
**Last Updated**: November 2025  
**Maintained By**: QA Engineering Team
