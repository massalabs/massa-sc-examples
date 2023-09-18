import * as cypress from "cypress";

describe('autonomousprice test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    it('should show op_id', () => {
        cy.get('#btnSetRdm').click();
        cy.get('#op', {timeout: 10000}).contains('Op id = ');
    });

    it('should show price', () => {
        cy.get('#btnGetPrice').click();
        cy.get('#price', {timeout: 10000}).contains('Current Price: ');
    });
})