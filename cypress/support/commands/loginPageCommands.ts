import { LoginPage } from "../../pages/loginPage";
import { regularUser } from "../../fixtures/users";

const loginPage = new LoginPage();

export const loginWithRegularUserCredentials = () => {
  cy.intercept('POST', '/login*').as('loginRequest');
  loginPage.logIn(regularUser.email, regularUser.password);

  cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
};
