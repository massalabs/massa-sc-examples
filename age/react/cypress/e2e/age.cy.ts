describe('template spec', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it('show your address', () => cy.get('#address').should('be.visible'));

  it('show your age', () => cy.get('#age').should('be.visible'));

  it('show your name', () => cy.get('#name').should('be.visible'));

  it('age of alice', () => {
    cy.get('#name').type('alice').should('have.value', 'alice');
    cy.get('#age').type('8').should('have.value', '08');

    cy.get('#btnChangeAge').click();
    cy.get('#lastOpId', { timeout: 30000 }).should('be.visible');

    cy.get('#btnGetAge').click();
    cy.get('#result', { timeout: 20000 }).should('have.text', 'Age of alice is 8');
  });
})