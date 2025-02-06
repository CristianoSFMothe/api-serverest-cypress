describe('POST /usuarios', () => {

  const user = {
    nome: "Cristiano Ferreira",
    email: "crisitano@qa.com.br",
    password: "Abc@123",
    administrador: "true"
  }

  it('deve cadastrar usuário com sucesso', () => {
    cy.api({
      url: '/usuarios',
      method: 'POST',
      body: user,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.be.equal('Cadastro realizado com sucesso');
    })
  })
})