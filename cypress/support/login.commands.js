Cypress.Commands.add('login', (user) => {
  cy.api({
    url: '/login',
    method: 'POST',
    body: user,
    failOnStatusCode: false
  }).then((response) => {
    return response
  })
});