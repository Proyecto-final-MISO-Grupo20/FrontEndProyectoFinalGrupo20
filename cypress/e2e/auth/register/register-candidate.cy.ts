import { registerCandidate } from '../../utils/interfaces/register-candidate.interface';
import registerCandidatePage from '../../page-object/auth/register-candidate.page';
import registerUserPage from '../../page-object/auth/register-user.page';
import registerPage from '../../page-object/auth/register.page';

describe('Candidate Register', () => {
  beforeEach(() => {
    registerPage.open();
    registerPage.goToCandidateRegister();
  });

  describe('Personal Information Validation', () => {
    it('Should show name required validation', () => {
      registerCandidatePage.nameInput.click();

      registerCandidatePage.nameInput.blur();

      registerCandidatePage.nameInputRequiredError.should('be.visible');
    });

    it('Should show name min length validation', () => {
      registerCandidatePage.nameInput.click();

      registerCandidatePage.nameInput.type('12');

      registerCandidatePage.nameInput.blur();

      registerCandidatePage.nameInputMinLengthError.should('be.visible');
    });

    it('Should show min age validation', () => {
      registerCandidatePage.selectTodayDate();

      registerCandidatePage.birthdayInputAgeError.should('be.visible');
    });

    it('Should show age required validation', () => {
      registerCandidatePage.birthdayInput.click();

      registerCandidatePage.nameInput.click();

      registerCandidatePage.birthdayInputAgeRequiredError.should('be.visible');
    });

    it('Should show residence city required validation', () => {
      registerCandidatePage.residenceCityInput.click();

      registerCandidatePage.residenceCityInput.blur();

      registerCandidatePage.residenceCityRequiredError.should('be.visible');
    });

    it('Should show phone required validation', () => {
      registerCandidatePage.phoneInput.click();

      registerCandidatePage.phoneInput.blur();

      registerCandidatePage.phoneRequiredError.should('be.visible');
    });

    it('Should show document required validation', () => {
      registerCandidatePage.documentInput.click();

      registerCandidatePage.documentInput.blur();

      registerCandidatePage.documentRequiredError.should('be.visible');
    });
  });

  describe('User Account Validation', () => {
    beforeEach(() => {
      cy.fixture('auth/register-candidate').then((data: registerCandidate) => {
        registerCandidatePage.completeFirsStep(data);
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

  it('Should create candidate account successfully', () => {
    cy.fixture('auth/register-candidate').then((data: registerCandidate) => {
      registerCandidatePage.completeFirsStep(data);
      registerUserPage.completeUserRegister(data);

      cy.url().should('include', 'login');
    });
  });
});
