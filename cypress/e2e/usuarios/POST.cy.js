describe('POST /usuarios', () => {

  let userData

  beforeEach(() => {
    cy.fixture("user").then((data) => {
      userData = data.create
    })
  })

  it('deve cadastrar usuário administrador com sucesso', () => {
    const user = userData.success.admin

    cy.insertUser(user).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.be.equal('Cadastro realizado com sucesso');
    })
  })
})