# Bynomi App Testing

This directory contains the testing framework and test files for the Bynomi application. The testing framework includes unit tests, integration tests, and end-to-end tests to ensure the application functions correctly.

## Testing Structure

- `/tests/unit/` - Unit tests for individual components and utilities
- `/tests/integration/` - Integration tests for API endpoints and authentication flows
- `/tests/e2e/` - End-to-end tests for complete user journeys
- `/tests/mocks/` - Mock data and utilities for testing

## Testing Tools

- **Jest** - JavaScript testing framework for unit and integration tests
- **React Testing Library** - Testing utilities for React components
- **Cypress** - End-to-end testing framework for browser-based tests
- **MSW (Mock Service Worker)** - API mocking for integration tests

## Running Tests

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run end-to-end tests
npm run test:e2e

# Run tests with coverage
npm run test:coverage
```

## Test Coverage Goals

- **Unit Tests**: 80% coverage of utility functions and components
- **Integration Tests**: 70% coverage of API endpoints and data flows
- **End-to-End Tests**: Coverage of all critical user journeys

## Writing Tests

### Unit Test Guidelines

- Test one functionality per test case
- Use descriptive test names
- Mock external dependencies
- Focus on testing behavior, not implementation details

### Integration Test Guidelines

- Test API endpoints with various inputs
- Verify database interactions
- Test authentication flows
- Validate error handling

### End-to-End Test Guidelines

- Test complete user journeys
- Cover critical paths (registration, checkout, etc.)
- Test responsive design
- Validate form submissions and navigation