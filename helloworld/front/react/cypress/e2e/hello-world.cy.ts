/// <reference types="cypress" />

import { messages } from "../../src/messages";

context("App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("renders the account address if an account is found", () => {
    cy.get("div").contains("Address: AU");
  });

  it("renders the operation ID after a transaction is sent", () => {
    cy.get("#set").click();
    cy.get("#last-opId", { timeout: 2000 }).contains("Last Op id: O");
  });

  it('renders the message after the "Get Message" button is clicked', () => {
    cy.get("#get").click();
    cy.get("#message", {
      timeout: 5000,
    })
      .invoke("text")
      .then((text) => {
        expectContainMessage(text);
      });
  });
});

const expectContainMessage = (text: string) => {
  const elementContainsMessage = messages.some((message) =>
    text.includes(message.message)
  );
  expect(elementContainsMessage).to.be.true;
};
