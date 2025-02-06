describe('DELETE /produtos', () => {
  let productData;

  before(() => {
    cy.fixture("produtos").then((data) => {
      productData = data.delete;

      cy.insertUsers(data.users);
      cy.login(data.login.not_admin).then((response) => {
        Cypress.env('userToken', response.body.authorization);
      })
      cy.login(data.login.admin).then((response) => {
        Cypress.env('adminToken', response.body.authorization);
      })
    })
  })

  beforeEach(() => {
    cy.clearProductData(Cypress.env('adminToken'));
  })

  describe('Usuário administrador', () => {
    it('deve excluir um produto', () => {
      cy.insertProduct(productData, Cypress.env('adminToken')).then((response) => {
        const id = response.body._id;
        cy.deleteProductById(id, Cypress.env('adminToken')).should((response) => {
          expect(response.status).to.be.equal(200);
          expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
        })
      })
    })

    it('não deve excluir um produto inexistente', () => {
      cy.deleteProductById("inexistent_id", Cypress.env('adminToken')).should((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.property('message', 'Nenhum registro excluído');
      })
    })

    it('não deve excluir um produto vinculado a um carrinho', () => {
      //TO-DO
    })
  })

  it('não deve permitir que usuários não autenticados excluam um produto', () => {
    cy.insertProduct(productData, Cypress.env('adminToken')).then((response) => {
      const id = response.body._id;
      cy.deleteProductById(id).should((response) => {
        expect(response.status).to.be.equal(401);
        expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
      })
    })
  })

  it('não deve permitir que um usuário exclua um produto', () => {
    cy.insertProduct(productData, Cypress.env('adminToken')).then((response) => {
      const id = response.body._id;
      cy.deleteProductById(id, Cypress.env('userToken')).should((response) => {
        expect(response.status).to.be.equal(403);
        expect(response.body).to.have.property('message', 'Rota exclusiva para administradores');
      })
    })
  })

})