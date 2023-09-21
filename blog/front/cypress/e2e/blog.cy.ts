

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('create blog post', () => {
    cy.get("#publishButton").click();
    cy.get("#inputTitle", { timeout: 2000 }).type("Title X");
    cy.get("#inputAuthor").type("John Doe");
    cy.get("#inputTag").type("movie");
    cy.get("#inputContent").type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce scelerisque");
    cy.get("#submitButton").click();
    cy.get("#refreshButton", { timeout: 10000 }).should('be.visible');
  });

  it('load blog post', () => {
    // wait for account and client to be created
    cy.wait(4000);
    cy.get("#refreshButton").click();
    cy.contains('.post-preview', 'Title X', { timeout: 10000 }).click();
    cy.get("#selectedAuthor").should('contain', 'John Doe');
    cy.get("#selectedTag").should('contain', 'movie');
    cy.get("#selectedContent").should('contain', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce scelerisque');
  });
});
