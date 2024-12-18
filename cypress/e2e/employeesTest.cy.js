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
    cy.getEmployeeData().should('have.length', 1)
  });

  it('Selecting a certain employee and show its complete data should be correct', () => {
    cy.get('.jqx-tree-grid-checkbox').eq(3).click()
    cy.viewEmployeeData()

    //validate result
    cy.getEmployeeData().should('have.length', 1)
    cy.getEmployeeData().invoke('text').then((text) => {
      expect(text).equals('Margaret is from Redmond');
    });
  });

  it('Selecting all the employees and show its complete data should be correct', () => {
    cy.get('.jqx-tree-grid-checkbox').click({ multiple: true })
    cy.viewEmployeeData()

    //validate result
    cy.getEmployeeData().should('have.length', 6)
    Object.values(employee).forEach(([key, value], index) => {
      if (index < 6) {
        const expectedLocation = key.location;
        cy.getEmployeeData().eq(index).invoke('text').should('equal', expectedLocation);
      }
    });
  });

  it('Deploy employee responsible for other employees shows such employees', () => {
    cy.get('tr[role=row]').should('have.length', 6)
    cy.deployResponsibleEmployee()

    //validate result
    cy.get('tr[role=row]').should('have.length', 9)
    Object.values(employee).forEach(([key, value], index) => {
      if (index > 5) {
        const expectedName = key.name;
        cy.get('.jqx-tree-grid-title').eq(index - 1).invoke('text').should('equal', expectedName);
      }
    });
  });

  it('Select a employee with incomplete info shows an error when the info shows', () => {
    cy.deployResponsibleEmployee()
    cy.get('.jqx-tree-grid-checkbox').eq(7).click()
    cy.viewEmployeeData()

    //validate result
    cy.getEmployeeData().invoke('text').should('not.contain', 'Anne is from London');
    cy.getEmployeeData().invoke('text').should('equal', 'Anne is from null');
  });
})
