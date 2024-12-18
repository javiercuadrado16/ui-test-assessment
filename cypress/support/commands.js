// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

//Enter user data
Cypress.Commands.add("enterUsername", (username) => {
    cy.get('[id="form"]').find('input[placeholder="username"]').type(username);
});

Cypress.Commands.add("enterPassword", (password) => {
    cy.get('[id="form"]').find('input[placeholder="password"]').type(password);
});

//Actions
Cypress.Commands.add("selectRandom", (selector) => {
    cy.get(selector).then(($elements) => {
        const totalElements = $elements.length;
        const randomIndex = Math.floor(Math.random() * totalElements);
        cy.wrap($elements[randomIndex]).click();
    })
});

Cypress.Commands.add("viewEmployeeData", () => {
    cy.get('button[id=btn]').click();
});

Cypress.Commands.add("deployResponsibleEmployee", () => {
    cy.get('.jqx-tree-grid-collapse-button').click();
});

Cypress.Commands.add("getEmployeeData", () => {
    return cy.get('.jqx-listitem-element').children();
});

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })