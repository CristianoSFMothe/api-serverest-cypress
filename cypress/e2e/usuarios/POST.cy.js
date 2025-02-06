describe('POST /usuarios', () => {

  let userData

  beforeEach(() => {
    cy.fixture("user").then((data) => {
      userData = data.create
    })
  })

  it('deve cadastrar usuário administrador com sucesso', () => {
    const user = userData.success.admin;
    cy.deleteUser(user);

    cy.insertUser(user).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message)
        .to.be
        .equal('Cadastro realizado com sucesso');
    });
  })

  it('deve criar com sucesso um usuário não administrador', () => {
    const user = userData.success.not_admin;
    cy.deleteUser(user);

    cy.insertUser(user).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message)
        .to.be
        .equal('Cadastro realizado com sucesso');
    });
  })

  it('não deve criar com sucesso com email existente', () => {
    const user = userData.duplicated;
    cy.deleteUser(user);

    cy.insertUser(user).then(() => {
      cy.insertUser(user).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body)
          .to.have
          .property('message', 'Este email já está sendo usado');
      })
    });
  })

  it('não deve criar um usuário com dados inválidos', () => {
    const users = userData.invalid;

    for (const user of users) {
      cy.insertUser(user).should((response) => {
        expect(response.status).to.equal(400);
      })
    }
  });
})