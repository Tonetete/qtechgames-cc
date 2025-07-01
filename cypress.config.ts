import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
