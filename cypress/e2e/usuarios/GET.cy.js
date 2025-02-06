describe('GET /usuarios', () => {
  it('deve listar todos os usuários corretamente', () => {
    cy.api({
      url: '/usuarios',
      method: 'GET',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.quantidade).to.equal(response.body.usuarios.length);
    });
  });

  it('deve filtrar usuários pelo nome', () => {
    cy.api({
      url: '/usuarios',
      method: 'GET',
      qs: { nome: 'Cristiano' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(200);

      const { quantidade, usuarios } = response.body;

      expect(quantidade).to.equal(usuarios.length);
      expect(usuarios).to.have.length(1);

      const usuario = usuarios[0];
      expect(usuario).to.have.property('nome', 'Cristiano Ferreira');
      expect(usuario).to.have.property('email', 'crisitano@qa.com.br');
      expect(usuario).to.have.property('password', 'Abc@123');
      expect(usuario).to.have.property('administrador', 'true');
      expect(usuario).to.have.property('_id').that.is.a('string').and.not.be.empty;
    });
  });
});
