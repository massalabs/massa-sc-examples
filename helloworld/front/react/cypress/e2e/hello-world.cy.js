/// <reference types="cypress" />

describe("test hello world", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it.skip("Should display message if massa station is not run", () => {
        // wait for 5sec
        cy.wait(10000);
        cy.get("#root").should(
            "contain",
            "Please install massa station and the wallet plugin of Massa Labs and refresh."
        );
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

    // should display operation id after click
    it("should display operation id after click", () => {
        cy.get("#callHelloWorld").click();
        cy.wait(1000);
        cy.get("#root").should("contain", "Last Op id:");
    });
});
