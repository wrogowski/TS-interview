export class RegisterResultPage {
  path = '/registerresult/1';

  header = () => cy.contains('.page-title>h1', 'Register');
  resultMessage = () => cy.contains('div.result', 'Your registration completed');
  continueButton = () => cy.contains('a.register-continue-button', 'Continue');
};
