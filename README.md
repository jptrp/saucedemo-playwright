# 🧪 SauceDemo UI Automation — Playwright + TypeScript

A modern, maintainable UI automation framework built using Playwright, TypeScript, and the Page Object Model (POM) pattern.
This project is designed to demonstrate clean automation structure, readable test design, and CI/CD integration — all aligned with real-world QA Engineer workflows.

---

## 🚀 Tech Stack

- Playwright (TypeScript)
- Page Object Model (POM)
- GitHub Actions (Continuous Integration)
- Node.js
- HTML Reporter
- Cross-browser testing (Chromium, Firefox, WebKit)

---

## 📁 Project Structure

```text
saucedemo-playwright/
├── tests/                 # Test specs
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
│
├── pages/                 # Page Object Model classes
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── fixtures/              # Test data
│   └── testData.ts
│
├── playwright.config.ts   # Global Playwright settings
├── package.json
│
└── .github/workflows/     # CI pipeline
    └── playwright.yml
```

---

## 🧪 Features & Tests Included

### ✔️ Login tests

- Valid login
- Invalid login (error validation)

### ✔️ Inventory tests

- Add item to cart
- Navigate from inventory → cart

### ✔️ Cart & Checkout tests

- Start checkout
- Fill user information
- Complete the purchase
- Validate confirmation screen

### ✔️ Page Object Model (POM)

- LoginPage
- InventoryPage
- CartPage
- CheckoutPage
- BasePage (shared functionality)

### ✔️ CI Integration

- GitHub Actions workflow triggers on push and pull requests
- Ensures all tests run headless in CI

---

## ▶️ Running Tests Locally

Install dependencies:

```bash
npm install
```

Run all Playwright tests:

```bash
npx playwright test
```

View the HTML test report:

```bash
npx playwright show-report
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.ts
```

---

## 🤖 Continuous Integration (CI)

GitHub Actions workflow automatically runs:

- `npm ci`
- Install Playwright browsers
- All test specs
- Generate report artifacts

On:

- Push to main
- Pull requests

Workflow file: `.github/workflows/playwright.yml`
