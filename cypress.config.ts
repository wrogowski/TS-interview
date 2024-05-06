import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://demo.nopcommerce.com",
    specPattern: ["cypress/specs/**/*.cy.ts"]
  },
});
