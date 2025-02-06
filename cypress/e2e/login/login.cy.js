describe('POST /login', () => {
  let loginData;

  beforeEach(() => {
    cy.fixture("login").then((data) => {
      loginData = data;

      cy.deleteUser(loginData.data.not_admin);
      cy.deleteUser(loginData.data.admin);

      cy.insertUser(loginData.data.not_admin);
      cy.insertUser(loginData.data.admin);
    })
  })

  it('deve autenticar o usuário', () => {
    cy.login(loginData.success.not_admin).should((response) => {
      expect(response.status).to.be.equal(200);
    })
  })

  it('deve autenticar o usuário administrador', () => {
    cy.login(loginData.success.admin).should((response) => {
      expect(response.status).to.be.equal(200);
    })
  })

  it('não deve autenticar com credenciais inválidas', () => {
    cy.login(loginData.fail).should((response) => {
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Email e/ou senha inválidos');
    })
  })

  it('não deve autenticar com dados inválidos', () => {
    for (const data of loginData.invalid) {
      cy.login(data).should((response) => {
        expect(response.status).to.be.equal(400);
      })
    }
  })

});