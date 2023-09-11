/// <reference types="cypress" />

describe("test hello world", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("should display a button with text 'Call Hello World'", () => {
        cy.wait(3000);
        cy.get("#root").should("contain", "Call Hello World");
        cy.get("#root").should("contain", "Address: AU");
        cy.get("#root").should(
            "contain",
            "Op id will be displayed few seconds after the transaction is sent"
        );
    });

    it("should display operation id after click", () => {
        cy.get("#callHelloWorld").click();
        cy.wait(1000);
        cy.contains("Last Op id:", { timeout: 1500 }).should("be.visible");
        cy.contains("Message: Hello World", { timeout: 16000 }).should(
            "be.visible"
        );
    });
});
