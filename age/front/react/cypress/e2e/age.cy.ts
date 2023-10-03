describe("template spec", () => {
  let age: number;
  let name: string;

  before(() => {
    age = generateRandomNumber(1, 99);
    name = "alice";
  });

  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("show your address", () =>
    cy.get("#address", { timeout: 3000 }).should("be.visible"));

  it("show your age", () => cy.get("#age").should("be.visible"));

  it("show your name", () => cy.get("#name").should("be.visible"));

  it("set age of alice", () => {
    cy.get("#name").type(name).should("have.value", name);
    cy.get("#age")
      .type(age.toString())
      .should("have.value", `0${age.toString()}`);
    cy.get("#btnChangeAge").click();
    cy.get("#lastOpId").contains("Last Op id: ");
  });

  it(
    "get age of alice",
    {
      retries: 10,
    },
    () => {
      cy.wait(2000);
      cy.get("#name").type(name);
      cy.get("#age").type(age.toString());
      cy.get("#btnGetAge").click();
      cy.get("#result").contains(`Age of ${name} is ${age.toString()}`);
    }
  );
});

const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
