describe('PUT /usuarios', () => {
  let userData

  beforeEach(() => {
    cy.fixture("user").then((data) => {
      userData = data.edit
    })
  })

  it('deve atualizar dados do usuário com sucesso', () => {
    const user = userData.success.edition;
    const updatedUser = userData.success.edition;
    cy.deleteUser(user);

    cy.insertUser(user).then((response) => {
      const id = response.body._id;
      cy.updateUser(id, updatedUser).should((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body.message).to.be.equal('Registro alterado com sucesso');
      })
    })
  })

  it('deve inserir o usuário quando tentar atualizar um ID de usuário inexistente', () => {
    const user = userData.not_found.new_user;
    cy.deleteUser(user);

    cy.updateUser("123", user).should((response) => {
      expect(response.status).to.be.equal(201);
      expect(response.body.message).to.be.equal('Cadastro realizado com sucesso');
    })
  })

  it('não deve inserir usuário quando tenta atualizar um ID de usuário inexistente mas com email cadastrado', () => {
    const user = userData.not_found.duplicated;
    cy.deleteUser(user);
    cy.insertUser(user).then((response) => {
      cy.updateUser("123", user).should((response) => {
        expect(response.status).to.be.equal(400);
        expect(response.body.message).to.be.equal('Este email já está sendo usado');
      })
    })
  });

  it('não deve atualizar com dados inválidos', () => {
    const invalidData = userData.fail.invalid;
    cy.deleteUser(userData.fail.original);
    let id;
    cy.insertUser(userData.fail.original).then((response) => {
      id = response.body._id;
    });

    for (const data of invalidData) {
      cy.updateUser(id, data).should((response) => {
        expect(response.status).to.be.equal(400);
      })
    }
  })
});