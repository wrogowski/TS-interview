export class LoginPage {
  path = '/login';
  header = () => cy.contains('.page-title', 'Welcome, Please Sign In!');

  welcomeHeader = () => cy.contains('.page-title>h1', 'Welcome, Please Sign In!');
  emailInput = () => cy.get('input#Email');
  passwordInput = () => cy.get('input#Password');
  rememberMeCheckbox = () => cy.get('input#RememberMe');
  forgotPasswordLink = () => cy.contains('a[href="/passwordrecovery"]');
  loginButton = () => cy.contains('button.login-button', 'Log in');
  registerButton = () => cy.contains('button.register-button', 'Register');
  failedLoginErrorMessage = () => cy.contains('div.validation-summary-errors', 'Login was unsuccessful. Please correct the errors and try again.');

  logIn = (email: string, password: string) => {
    this.emailInput().forceType(email);
    this.passwordInput().forceType(password);
    this.loginButton().click();
  };
}
