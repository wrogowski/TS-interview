import {faker} from '@faker-js/faker';

export const createRegularUser = () => cy.request(
  'POST',
  '/register',
  {
    FirstName: faker.person.firstName,
    LastName: faker.person.lastName,
    Email: faker.internet.email,
    Password: 'Test123',
    ConfirmPassword: 'Test123',
    AuthenticationToken: 'AuthByAPIdoesNotWork:('
  }
)