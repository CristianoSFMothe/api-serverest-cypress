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
  }).then((response) => {
    return response
  });
});

Cypress.Commands.add('listUserByName', (userName) => {
  cy.api({
    url: '/usuarios',
    method: 'GET',
    qs: { nome: userName },
    failOnStatusCode: false
  }).then((response) => {
    return response
  });
});

Cypress.Commands.add('deleteUser', (user) => {
  cy.api({
    url: `/usuarios?email=${user.email}`,
    method: 'GET',
    failOnStatusCode: false
  }).then((response) => {
    if (response.status == 200 && response.body.quantidade == 1) {
      const id = response.body.usuarios[0]._id;
      cy.api({
        url: `/usuarios/${id}`,
        method: 'DELETE',
        failOnStatusCode: false
      }).then((response) => response);
    }
  });
})

Cypress.Commands.add('deleteUserById', (id) => {
  cy.api({
    url: `/usuarios/${id}`,
    method: 'DELETE',
    failOnStatusCode: false
  }).then((response) => {
    return response
  })
});