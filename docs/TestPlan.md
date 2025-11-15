# Test Plan

## 1. Test Plan Identifier

**Project**: SauceDemo UI Automation Framework  
**Version**: 1.0  
**Date**: November 2025  
**Author**: QA Engineering Team

## 2. Introduction

This test plan defines the testing approach for automated UI testing of the SauceDemo e-commerce application. The plan outlines test objectives, scope, resources, schedule, and deliverables for the Playwright + TypeScript automation framework.

## 3. Test Items

The following features of the SauceDemo application are under test:

- **Authentication Module**: Login/logout functionality
- **Product Catalog**: Inventory browsing and product display
- **Shopping Cart**: Add/remove items, cart management
- **Checkout Process**: Multi-step order placement
- **User Session**: State management across pages

## 4. Features to be Tested

### 4.1 Authentication
- Valid user login
- Invalid credentials handling
- Locked user scenarios
- Error message validation
- Session persistence

### 4.2 Inventory Management
- Product listing display
- Add to cart functionality
- Remove from inventory
- Cart badge counter updates
- Product detail navigation

### 4.3 Shopping Cart
- View cart contents
- Remove items from cart
- Update cart quantities
- Cart persistence during navigation
- Continue shopping functionality
- Empty cart state

### 4.4 Checkout Process
- Customer information form
- Form field validation
- Required field enforcement
- Order review screen
- Price calculation display
- Order confirmation
- Return to home functionality

### 4.5 Navigation
- Page routing
- Back button behavior
- Navigation state consistency
- URL validation

## 5. Features Not to be Tested

- Backend API endpoints (tested separately)
- Database integrity (out of scope)
- Server-side logic
- Payment processing (mocked in SauceDemo)
- Email notifications
- Admin functionality
- User registration (not available in demo)
- Password reset flows
- Mobile native applications

## 6. Testing Approach

### 6.1 Automation Strategy

**Framework**: Playwright with TypeScript

**Pattern**: Page Object Model (POM)

**Test Organization**:
```
tests/
├── login.spec.ts       (3 tests)
├── inventory.spec.ts   (3 tests)
├── cart.spec.ts        (8 tests)
└── checkout.spec.ts    (11 tests)
```

### 6.2 Test Design Techniques

- **Positive Testing**: Happy path scenarios with valid inputs
- **Negative Testing**: Error handling with invalid inputs
- **Boundary Testing**: Edge cases and limits
- **End-to-End Testing**: Complete user workflows

### 6.3 Test Data Strategy

**Source**: Centralized fixtures (`fixtures/testData.ts`)

**Test Users**:
- Standard user (normal flow)
- Locked user (access denied)
- Problem user (error scenarios)
- Performance user (timing tests)

**Test Products**: 6 inventory items with known names and prices

**Customer Data**: Valid and international format examples

## 7. Test Deliverables

### 7.1 Before Testing
- ✅ Test strategy document
- ✅ Test plan document
- ✅ Architecture documentation
- ✅ Test environment setup
- ✅ Page Object Model implementation

### 7.2 During Testing
- ✅ Test scripts and code
- ✅ Test execution logs
- ✅ Defect reports (as needed)
- ✅ Progress reports

### 7.3 After Testing
- ✅ Test summary report
- ✅ HTML test report with screenshots
- ✅ Code coverage analysis
- ✅ Lessons learned documentation

## 8. Test Environment

### 8.1 Application Under Test
**URL**: https://www.saucedemo.com/  
**Environment Type**: Public demo application  
**Data State**: Consistent, reset automatically

### 8.2 Testing Tools

| Tool | Version | Purpose |
|------|---------|---------|
| Playwright | 1.44.0 | Test automation framework |
| TypeScript | 5.3.3 | Programming language |
| Node.js | 20.x | Runtime environment |
| VS Code | Latest | Development IDE |
| GitHub Actions | N/A | CI/CD automation |

### 8.3 Browser Coverage

- **Chromium** (Chrome, Edge) - Primary
- **Firefox** - Secondary
- **WebKit** (Safari) - Secondary

### 8.4 Operating Systems

- macOS (development)
- Ubuntu Linux (CI/CD)
- Windows (optional)

## 9. Test Schedule

### Phase 1: Framework Development (Completed)
- ✅ POM implementation
- ✅ Test data fixtures
- ✅ Configuration setup
- ✅ CI/CD pipeline

### Phase 2: Initial Test Coverage (Completed)
- ✅ Login tests (3 tests)
- ✅ Inventory tests (3 tests)
- ✅ Cart tests (8 tests)
- ✅ Checkout tests (11 tests)

### Phase 3: Ongoing Maintenance
- 🔄 Regular test execution
- 🔄 Framework updates
- 🔄 New test scenarios
- 🔄 Bug fixes and improvements

## 10. Entry and Exit Criteria

### 10.1 Entry Criteria
- ✅ Test environment is accessible
- ✅ Playwright and dependencies installed
- ✅ Page Object Model implemented
- ✅ Test data configured
- ✅ Browser drivers available

### 10.2 Exit Criteria
- ✅ All planned tests executed
- ✅ 95%+ test pass rate achieved
- ✅ Critical bugs resolved or documented
- ✅ Test reports generated
- ✅ Code reviewed and approved

## 11. Suspension Criteria

Testing will be suspended if:
- Test environment becomes unavailable
- Critical blocker bugs prevent test execution
- Major framework issues discovered
- Dependency conflicts arise

## 12. Test Cases

### 12.1 Login Test Cases (3 total)

| ID | Test Case | Priority | Status |
|----|-----------|----------|--------|
| TC-001 | Valid user can log in successfully | Critical | ✅ Pass |
| TC-002 | Invalid credentials show error message | High | ✅ Pass |
| TC-003 | Locked user cannot log in | High | ✅ Pass |

### 12.2 Inventory Test Cases (3 total)

| ID | Test Case | Priority | Status |
|----|-----------|----------|--------|
| TC-004 | Add item to cart and navigate to cart page | Critical | ✅ Pass |
| TC-005 | Cart badge updates when item is added | High | ✅ Pass |
| TC-006 | Item button changes to "Remove" after adding | Medium | ✅ Pass |

### 12.3 Cart Test Cases (8 total)

| ID | Test Case | Priority | Status |
|----|-----------|----------|--------|
| TC-007 | Add multiple items to cart from inventory | Critical | ✅ Pass |
| TC-008 | Remove item from cart | Critical | ✅ Pass |
| TC-009 | Remove all items from cart | High | ✅ Pass |
| TC-010 | Cart badge updates correctly when removing items | High | ✅ Pass |
| TC-011 | Cart contents match selected items from inventory | Critical | ✅ Pass |
| TC-012 | Continue shopping button returns to inventory | Medium | ✅ Pass |
| TC-013 | Empty cart displays correctly | Medium | ✅ Pass |
| TC-014 | Cart persists items when navigating back and forth | High | ✅ Pass |

### 12.4 Checkout Test Cases (11 total)

| ID | Test Case | Priority | Status |
|----|-----------|----------|--------|
| TC-015 | Complete purchase with valid customer information | Critical | ✅ Pass |
| TC-016 | Checkout displays error when first name is missing | High | ✅ Pass |
| TC-017 | Checkout displays error when last name is missing | High | ✅ Pass |
| TC-018 | Checkout displays error when postal code is missing | High | ✅ Pass |
| TC-019 | Checkout displays error when all fields are empty | High | ✅ Pass |
| TC-020 | Cancel button returns to cart from checkout step one | Medium | ✅ Pass |
| TC-021 | Order overview displays item and pricing information | High | ✅ Pass |
| TC-022 | Complete end-to-end purchase flow with multiple items | Critical | ✅ Pass |
| TC-023 | Return to home page after completing order | Medium | ✅ Pass |
| TC-024 | Checkout with international postal code format | Medium | ✅ Pass |
| TC-025 | Checkout confirmation displays complete order message | High | ✅ Pass |

## 13. Resources

### 13.1 Human Resources

**Required Skills**:
- Playwright/TypeScript experience
- Page Object Model understanding
- CI/CD knowledge
- Git version control

**Roles**:
- Test Automation Engineer (Developer)
- QA Lead (Reviewer)
- DevOps Engineer (CI/CD setup)

### 13.2 System Resources

- Development machine with 8GB+ RAM
- GitHub repository access
- CI/CD runner allocation
- Browser installation capacity

## 14. Risks and Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Test environment downtime | High | Implement retry logic, monitor uptime |
| Browser compatibility issues | Medium | Regular browser updates, version testing |
| Flaky tests | Medium | Explicit waits, retry mechanism, test isolation |
| Framework version conflicts | Low | Lock dependency versions, regular updates |
| Team knowledge gaps | Low | Documentation, code reviews, training |

## 15. Approvals

| Role | Name | Signature | Date |
|------|------|-----------|------|
| QA Lead | ___________ | ___________ | ___________ |
| Development Lead | ___________ | ___________ | ___________ |
| Project Manager | ___________ | ___________ | ___________ |

## 16. Test Metrics

### 16.1 Coverage Metrics
- **Total Test Cases**: 25
- **Pass Rate Target**: 95%+
- **Current Pass Rate**: 100% (25/25)

### 16.2 Execution Metrics
- **Average Execution Time**: ~7-8 minutes (full suite, all browsers)
- **Parallel Workers**: 4 (local), 2 (CI)
- **Retry Count**: 1 (local), 2 (CI)

### 16.3 Quality Metrics
- **Defects Found**: Tracked per sprint
- **Test Stability**: >95% (non-flaky)
- **Code Coverage**: N/A (E2E tests)

## 17. Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Nov 2025 | QA Team | Initial test plan creation |

---

**Document Status**: Approved  
**Next Review Date**: February 2026  
**Distribution**: QA Team, Development Team, Management
