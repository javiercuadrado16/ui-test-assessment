describe('verify employees table functionality', () => {
  let employee;

  beforeEach(() => {
    cy.fixture('employeeInfo.json').then(employeeLocation => {
      employee = employeeLocation;
    });
    cy.visit('./ui-test-assessment/employees.html')
  })

  it('Select a random employee and show its complete data', () => {
    cy.selectRandom('.jqx-tree-grid-checkbox')
    cy.viewEmployeeData()

    //expected result
    cy.get('.jqx-listitem-element').children().should('have.length', 1)
  });

  it('Selecting a certain employee and show its complete data should be correct', () => {
    cy.get('.jqx-tree-grid-checkbox').eq(3).click()
    cy.viewEmployeeData()

    //validate result
    cy.get('.jqx-listitem-element').children().should('have.length', 1)
    cy.get('.jqx-listitem-element').children().invoke('text').then((text) => {
      expect(text).equals('Margaret is from Redmond');
    });
  });
})