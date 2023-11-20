describe('group20-frontend', () => {
  beforeEach(() => cy.visit('/'));

  it('Should display login page', () => {
    cy.url().should('include', 'login');
  });
});
