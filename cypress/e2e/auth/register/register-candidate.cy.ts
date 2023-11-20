import registerCandidatePage from 'cypress/e2e/page-object/auth/register-candidate.page';
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
  });

  // it('Should create candidate', () => {
  //   cy.fixture('example').then((data) => {
  //     console.log(
  //       '🚀 ~ file: register-candidate.cy.ts:11 ~ cy.fixture ~ data:',
  //       data
  //     );
  //   });
  // });
});
