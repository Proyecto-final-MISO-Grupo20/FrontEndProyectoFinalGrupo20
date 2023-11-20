import { faker } from '@faker-js/faker';
import { registerBusiness } from '../../utils/interfaces/register-business.interface';
import registerBusinessPage from '../../page-object/auth/register-business.page';
import registerPage from '../../page-object/auth/register.page';
import registerUserPage from '../../page-object/auth/register-user.page';

describe('Business Register', () => {
  beforeEach(() => {
    registerPage.open();
    registerPage.goToBusinessRegister();
  });

  describe('Business Information Validation', () => {
    it('Should show name required validation', () => {
      registerBusinessPage.nameInput.click();

      registerBusinessPage.nameInput.blur();

      registerBusinessPage.nameInputRequiredError.should('be.visible');
    });

    it('Should show name min length validation', () => {
      registerBusinessPage.nameInput.type('12');

      registerBusinessPage.nameInput.blur();

      registerBusinessPage.nameInputMinLengthError.should('be.visible');
    });

    it('Should show document required validation', () => {
      registerBusinessPage.documentInput.click();

      registerBusinessPage.documentInput.blur();

      registerBusinessPage.documentRequiredError.should('be.visible');
    });

    it('Should show address required validation', () => {
      registerBusinessPage.addressInput.click();

      registerBusinessPage.addressInput.blur();

      registerBusinessPage.addressRequiredError.should('be.visible');
    });
  });

  describe('User Account Validation', () => {
    beforeEach(() => {
      cy.fixture('auth/register-business').then((data: registerBusiness) => {
        data.address = faker.location.streetAddress();
        registerBusinessPage.completeFirstStep(data);
      });
    });

    it('Should show username required validation', () => {
      registerUserPage.usernameInput.click();
      registerUserPage.usernameInput.blur();

      registerUserPage.usernameRequiredError.should('be.visible');
    });

    it('Should show username min length validation', () => {
      registerUserPage.usernameInput.type('12');

      registerUserPage.usernameInput.blur();

      registerUserPage.usernameMinLengthError.should('be.visible');
    });

    it('Should show email required validation', () => {
      registerUserPage.emailInput.click();
      registerUserPage.emailInput.blur();

      registerUserPage.emailRequiredError.should('be.visible');
    });

    it('Should show email invalid validation', () => {
      registerUserPage.emailInput.type('invalid@invalid');

      registerUserPage.emailInvalidError.should('be.visible');
    });

    it('Should show password required validation', () => {
      registerUserPage.passwordInput.click();
      registerUserPage.passwordInput.blur();

      registerUserPage.passwordRequiredError.should('be.visible');
    });

    it('Should show password min length validation', () => {
      registerUserPage.passwordInput.type('123');

      registerUserPage.passwordMinLengthError.should('be.visible');
    });

    it('Should show password mismatch validation', () => {
      registerUserPage.passwordInput.type('12345678');
      registerUserPage.passwordConfirmInput.type('123');

      registerUserPage.passwordMisMatchError.should('be.visible');
    });
  });

  describe('Create Business', () => {
    const username = faker.internet.userName();

    it('Should create candidate account successfully', () => {
      cy.fixture('auth/register-business').then((data: registerBusiness) => {
        data.username = username;
        data.address = faker.location.streetAddress();

        registerBusinessPage.completeFirstStep(data);
        registerUserPage.completeUserRegister(data);

        cy.url().should('include', 'login');
      });
    });

    it('Should show create candidate account username alrady exists validation', () => {
      cy.fixture('auth/register-business').then((data: registerBusiness) => {
        data.username = username;
        data.address = faker.location.streetAddress();

        registerBusinessPage.completeFirstStep(data);
        registerUserPage.completeUserRegister(data);

        registerUserPage.registerUserError.should('be.visible');
      });
    });
  });
});
