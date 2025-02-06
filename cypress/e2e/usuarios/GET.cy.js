describe('GET /usuarios', () => {
  let userData

  beforeEach(() => {
    cy.fixture("user").then((data) => {
      userData = data.create
    })
  })

  it('deve listar todos os usuários cadastrados', () => {
    cy.listAllUsers().then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.quantidade).to.equal(response.body.usuarios.length);
    });
  });

  it('deve filtrar usuários pelo nome', () => {
    const user = userData.success.admin;

    cy.listUserByName(user.nome).then((userId) => {
      if (userId) {
        cy.deleteUserById(userId);
      }
    });

    cy.insertUser(user).then(() => {

      cy.listUserByName(user.nome).then((response) => {
        expect(response.status).to.equal(200);

        const { quantidade, usuarios } = response.body;

        expect(usuarios).to.be.an('array');
        expect(quantidade).to.equal(usuarios.length);
        expect(usuarios).to.have.length(1);

        const usuario = usuarios[0];

        expect(usuario).to.have.property('nome', user.nome);
        expect(usuario).to.have.property('email', user.email);
        expect(usuario).to.have.property('password', user.password);
        expect(usuario).to.have.property('administrador', user.administrador);
        expect(usuario).to.have.property('_id').that.is.a('string').and.not.be.empty;
      });

      cy.listUserByName(user.nome).then((userId) => {
        cy.deleteUserById(userId);
      });
    });
  });

});
