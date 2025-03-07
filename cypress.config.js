// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    // Environment variables for testing
    apiUrl: 'http://localhost:3000/api',
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  defaultCommandTimeout: 5000,
  chromeWebSecurity: false,
});