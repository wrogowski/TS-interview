import { faker } from '@faker-js/faker';
import { RegisterPage, RequiredInputs } from "../../pages/registerPage";
import { checkValidationErrorForEmptyInput, fillRequiredFields } from "../../support/commands/registerPageCommands";

const registerPage = new RegisterPage();
const requiredInputs: RequiredInputs[] = ['FirstName', 'LastName', 'Email', 'Password', 'ConfirmPassword']

describe('Inputs validation on the user registration page', () => {
  beforeEach(() => {
    cy.visit(registerPage.path);
    registerPage.registerButton().click();
  });

  it('should not allow to register user without filling reqiured fields', () => {
    registerPage.registerButton().click().then(() => {
      cy.location('pathname').should('eq', registerPage.path);
    });
  });

  it('Required fields should be marked with an asterisk', () => {
    registerPage.requiredFieldAsterisk().each((asterisk, index, astersisksCollection) => {
      expect(astersisksCollection.length).eq(requiredInputs.length);
      expect(asterisk).to.have.text('*');
      expect(asterisk.siblings('span')).to.have.attr('data-valmsg-for', requiredInputs[index]);
    });
  });

  requiredInputs.forEach(input => {
    it(`should display validation errors for empty ${input} input`, () => {
      checkValidationErrorForEmptyInput(input);
    });
  });


  it('should not allow to provid invalid email address', () => {
    ['asd@as',
      'test@test.1com',
      'test@test',
      'a@a.a'
    ].forEach(email =>
      registerPage.setInputValue('Email', `${email}{enter}`).then(() =>
        registerPage.inputErrorMessage('Email').should('be.visible').and('have.text', 'Wrong email')
      )
    );

    ['test',
      'test@test@test.test',
      'test@loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong.test',
      'test@test.loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong'
    ].forEach(email =>
      registerPage.setInputValue('Email', `${email}{enter}`).then(() =>
        registerPage.inputErrorMessage('Email').should('be.visible').and('have.text', 'Please enter a valid email address.')
      )
    );
  });

  context('password input validations', () => {
    beforeEach(() => {
      fillRequiredFields();
    });

    it('should be at least 6 characters long', () => {
      registerPage.setPassword('12345');
      registerPage.registerButton().click();
      registerPage.inputErrorMessage('Password')
        .should('be.visible')
        .and('have.text', '<p>Password must meet the following rules: </p><ul><li>must have at least 6 characters and not greater than 64 characters</li></ul>');
    });

    it('input should be maximum 64 characters long', () => {
      registerPage.setPassword(faker.internet.password({ length: 65 }));
      registerPage.registerButton().click();
      registerPage.inputErrorMessage('Password')
        .should('be.visible')
        .and('have.text', '<p>Password must meet the following rules: </p><ul><li>must have at least 6 characters and not greater than 64 characters</li></ul>');
    });

    it('confirmation has to match the password', () => {
      [{ password: '123456', passwordConfirmation: '123456 ' },
      { password: 'xxxxxx', passwordConfirmation: 'Xxxxxx' },
      { password: 'Test 123', passwordConfirmation: 'Test  123' },
      { password: 'Test 123', passwordConfirmation: 'Test\u00a0123' }].forEach(({ password, passwordConfirmation }) => {
        registerPage.setPassword(password, passwordConfirmation);
        registerPage.registerButton().click();
        registerPage.inputErrorMessage('ConfirmPassword')
          .should('be.visible')
          .and('have.text', 'The password and confirmation password do not match.');
      });
    });

    it('none of inputs can be blank or filled with whitespaces', () => {
      [
        { password: '123456', passwordConfirmation: ' ' },
        { password: '123456', passwordConfirmation: '      ' },
        { password: '      ', passwordConfirmation: '123456' },
        { password: ' ', passwordConfirmation: '123456' }
      ].forEach(({ password, passwordConfirmation }) => {
        registerPage.input('Password').forceType(password);
        registerPage.input('ConfirmPassword').forceType(passwordConfirmation);
        registerPage.registerButton().click();
        registerPage.inputErrorMessage('ConfirmPassword')
          .should('be.visible')
          .and('have.text', 'The password and confirmation password do not match.');
      });
    });
  });
});
