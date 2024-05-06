import { LoginPage } from "../../pages/loginPage";
import { HomePage } from "../../pages/homePage";
import { TopNavbar } from "../../pages/common_components/topNavbar"
import { createRegularUser } from "../../support/commands/registerPageCommands";
import { regularUser } from "../../fixtures/users";

const loginPage = new LoginPage();
const homePage = new HomePage();
const navbar = new TopNavbar();

describe('Login page features', () => {
  before(() => {
    createRegularUser();
    navbar.navigateTo('logOut')
  });

  beforeEach(function () {
    cy.visit(loginPage.path);
  });

  it('should allow user to login with valid credentials', () => {
    loginPage.logIn(regularUser.email, regularUser.password);
    cy.location('pathname').should('eq', homePage.path);
  });

  ['Email', 'Password'].forEach(input =>
    it(`should not allow to login using incorrect ${input}`, () => {
      loginPage.logIn(input === 'Password' ? regularUser.email : 'wrong@mail.com', input === 'Email' ? regularUser.password : 'incorrect');
      loginPage.failedLoginErrorMessage().should('be.visible');
      cy.location('pathname').should('eq', loginPage.path);
    })
  );
});
