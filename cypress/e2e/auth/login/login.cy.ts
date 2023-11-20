import { faker } from '@faker-js/faker';
import loginPage from '../../page-object/auth/login.page';
import { Login } from '../../utils/interfaces/login.interface';

describe('Login', () => {
  beforeEach(() => {
    loginPage.open();
  });

  it('Should show incorrect credentials message', () => {
    const username = faker.internet.userName();
    const password = faker.internet.password();

    loginPage.login({ username, password });

    loginPage.loginError.should('be.visible');
  });

  it('Should authenticate successfully', () => {
    cy.fixture('auth/login').then((credentials: Login) => {
      loginPage.login(credentials);
    });

    cy.url().should('include', 'home');
  });
});
