
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

//Assert
Cypress.Commands.add("checkIfPageIsLoaded", () => {
    cy.get('[id=button]').should('exist');
  });