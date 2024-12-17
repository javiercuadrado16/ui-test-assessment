describe('template spec', () => {
  let user;

  beforeEach(() => {
    cy.fixture('user.json').then(userData => {
      user = userData;
    });
    cy.visit('./ui-test-assessment/employees.html')
  })


  //Login Tests
  it('Complete login form should clear all login fields', () => {
    cy.enterUsername(user.email)
    cy.enterPassword(user.password)
    cy.get('[type=submit]').click()

    //expected result
    cy.get('input[placeholder="username"]').should('be.empty')
    cy.get('input[placeholder="password"]').should('be.empty')
  });
})