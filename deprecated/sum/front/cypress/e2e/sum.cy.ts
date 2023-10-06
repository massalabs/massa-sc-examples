describe('sum test', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it('should sum 2 numbers', () => {
    cy.get('#number1').type('2');
    cy.get('#number2').type('3');
    cy.get('#calculateSumBtn').click();
    cy.get('#result', { timeout: 30000 }).should('have.text', 'Result: 5');
  });
})