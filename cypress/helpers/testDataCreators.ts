import { faker } from '@faker-js/faker'

const generateRegularUserData = {
  regularUser: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
};

export const saveRegularUserDataToUsersFixture = () => {
  const usersFixturePath = 'cypress/fixtures/users.json';
  
  // for some reason this doesn't work. Cypress gets boot loop when I'm trying to use writeFile() method
  return cy.wrap(generateRegularUserData).then(userData => {
    cy.writeFile(usersFixturePath, userData);
  });
};
