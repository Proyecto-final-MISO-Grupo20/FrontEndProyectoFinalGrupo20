import registerPage from '../../page-object/auth/register.page';

describe('Candidate Register', () => {
  beforeEach(() => {
    registerPage.open();
    registerPage.goToCandidateRegister();
  });

  it('Should create candidate', () => {
    cy.fixture('example').then((data) => {
      console.log(
        '🚀 ~ file: register-candidate.cy.ts:11 ~ cy.fixture ~ data:',
        data
      );
    });
  });
});
