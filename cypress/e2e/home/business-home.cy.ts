import loginPage from '../page-object/auth/login.page';
import businessHomePage from '../page-object/home/business-home.page';
import { Login } from '../utils/interfaces/login.interface';

describe('Business Home', () => {
  beforeEach(() => {
    loginPage.open();

    cy.fixture('auth/login-business').then((credentials: Login) => {
      loginPage.login(credentials);
    });
  });

  it('Should show candidates list', () => {
    businessHomePage.candidatesHeader.should('be.visible');
    businessHomePage.candidatesDataView.should('be.visible');
  });

  it('Should filter candidates list', () => {
    const candidateName = 'Rafael';

    businessHomePage.candidatesHeader.should('be.visible');
    businessHomePage.candidatesDataView.should('be.visible');

    businessHomePage.candidatesDataView.each(($element) => {
      cy.wrap($element).contains(candidateName).should('exist');
    });

    businessHomePage.candidatesFilterInput.type(candidateName);
  });
});
