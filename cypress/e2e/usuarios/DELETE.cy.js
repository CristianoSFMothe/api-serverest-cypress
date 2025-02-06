describe('DELETE /usuarios', () => {
  let userData;
  beforeEach(() => {
    cy.fixture("user").then((data) => {
      userData = data.delete;
    });
  })

  it('deve deletar um usuário com sucesso', () => {
    const user = userData.success;
    cy.deleteUser(user);
    cy.insertUser(user).then((response) => {
      const id = response.body._id;
      cy.deleteUserById(id).should((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body.message).to.be.equal('Registro excluído com sucesso');
      })
    })
  })

  it('não deve excluir quando tenta excluir um ID inexistente', () => {
    const user = userData.fail.not_found;
    cy.deleteUserById('123').should((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body.message).to.be.equal('Nenhum registro excluído');
    })
  })
});