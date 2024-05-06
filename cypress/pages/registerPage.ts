export type RequiredInputs = 'FirstName' | 'LastName' | 'Email' | 'Password' | 'ConfirmPassword';
export type OptionalInputs = 'CompanyName';


export class RegisterPage {
  path = '/register';
  header = () => cy.contains('.page-title>h1', 'Register');

  genderRadioButton = (gender: 'male' | 'female') => cy.get(`div#gender input#gender-${gender}`);
  input = (inputName: RequiredInputs | OptionalInputs) => cy.get(`input#${inputName}`);
  dateOfBirthSelect = (select: 'day' | 'month' | 'year') => cy.get(`select[name="DateOfBirth${select}"]`);
  newsletterCheckbox = () => cy.get('input#Newsletter');
  registerButton = () => cy.contains('button#register-button', 'Register');
  requiredFieldAsterisk = () => cy.get('span.required');
  inputErrorMessage = (inputName: RequiredInputs | OptionalInputs) => cy.get(`span[data-valmsg-for="${inputName}"]`, {timeout: 2000});
    
  setGender = (gender: 'female' | 'male') => this.genderRadioButton(gender).click();

  setInputValue = (inputName: RequiredInputs | OptionalInputs, value: string) => this.input(inputName).clear().type(value);

  setDateOfBirth = (day: number, month: number, year: number) => {
    this.dateOfBirthSelect('day').select(day.toString());
    this.dateOfBirthSelect('month').select(month.toString());
    this.dateOfBirthSelect('year').select(year.toString());
  };

  setNewsletterCheckbox = (check: boolean) => this.newsletterCheckbox().then(($checkbox) => {
    const isChecked = $checkbox.prop('checked');

    if (check !== isChecked) {
      cy.wrap($checkbox).click();
    }
  });

  setPassword = (password: string, passwordConfirmation: string = password) => {
    this.setInputValue('Password', password);
    this.setInputValue('ConfirmPassword', passwordConfirmation);
  };
};
