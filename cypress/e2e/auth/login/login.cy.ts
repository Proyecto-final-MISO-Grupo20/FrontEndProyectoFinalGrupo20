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

  it('Should authenticate successfully with candidate', () => {
    cy.fixture('auth/login-candidate').then((credentials: Login) => {
      loginPage.login(credentials);
    });

    cy.url().should('include', 'home');
  });

  it('Should authenticate successfully with business', () => {
    cy.fixture('auth/login-business').then((credentials: Login) => {
      loginPage.login(credentials);
    });

    cy.url().should('include', 'home');
  });
});
