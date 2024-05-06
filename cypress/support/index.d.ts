/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      /**
       * Converts the provided string to camelCase expression.
       * @example cy.toCamelCase('hello world').should('eq', 'helloWorld')
       */
      toCamelCase(phrase: string): Chainable<string>

      /**
       * Converts the provided string to natural human reading sentce like expression.
       * @example cy.convertToNaturalString('HelloWorld').should('eq', 'Hello world')
       */
      convertToNaturalString(phrase: string): Chainable<string>

      /**
       * Allows to type empty string, like mulitple spaces, which is forbidden by cy.type() command
       * @example cy.forceType('    ')
       */
      forceType(phrase: string): Chainable<JQuery<HTMLElement>>
    }
  }
