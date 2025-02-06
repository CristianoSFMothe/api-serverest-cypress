Cypress.Commands.add('insertUser', (user) => {
  cy.api({
    url: '/usuarios',
    method: 'POST',
    body: user,
    failOnStatusCode: false
  }).then((response) => response)
});

Cypress.Commands.add('listAllUsers', () => {
  cy.api({
    url: '/usuarios',
    method: 'GET',
    failOnStatusCode: false
  }).then((response) => response);
});

Cypress.Commands.add('listUserByName', (userName) => {
  cy.api({
    url: '/usuarios',
    method: 'GET',
    qs: { nome: userName },
    failOnStatusCode: false
  }).then((response) => response);
});