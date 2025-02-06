describe('PUT /produtos', () => {
  let productData;

  before(() => {
    cy.fixture("produtos").then((data) => {
      productData = data.edit;
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

  describe('usuário administrador', () => {
    it('Should update a product', () => {
      cy.insertProduct(productData.success.original, Cypress.env('adminToken')).then((response) => {
        const id = response.body._id;
        cy.updateProduct(id, productData.success.updated, Cypress.env('adminToken')).should((response) => {
          expect(response.status).to.be.equal(200);
          expect(response.body).to.have.property('message', 'Registro alterado com sucesso');
        })
      })
    })

    it('deve criar um produto quando tentar atualizar com ID de produto inexistente', () => {
      cy.updateProduct("inexistent_id", productData.not_found.new_product, Cypress.env('adminToken')).should((response) => {
        expect(response.status).to.be.equal(201);
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
      })
    })

    it('não deve criar um produto ao tentar atualizar com um ID de produto inexistente, mas com um nome de produto existente', () => {
      cy.insertProduct(productData.not_found.duplicated, Cypress.env('adminToken'));

      cy.updateProduct("inexistent_id", productData.not_found.duplicated, Cypress.env('adminToken')).should((response) => {
        expect(response.status).to.be.equal(400);
        expect(response.body).to.have.property('message', 'Já existe produto com esse nome');
      })
    })

    it('não deve atualizar um produto com dados inválidos', () => {
      cy.insertProduct(productData.fail.original, Cypress.env('adminToken')).then((response) => {
        const id = response.body._id;

        for (const product of productData.fail.invalid) {
          cy.updateProduct(id, product, Cypress.env('adminToken')).should((response) => {
            expect(response.status).to.be.equal(400);
          })
        }
      });
    })
  })

  it('não deve permitir que usuários não autenticados atualizem um produto', () => {
    cy.insertProduct(productData.success.original, Cypress.env('adminToken')).then((response) => {
      const id = response.body._id;
      cy.updateProduct(id, productData.success.updated).should((response) => {
        expect(response.status).to.be.equal(401);
        expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
      })
    })
  })

  it('não deve permitir que um usuário atualize um produto', () => {
    cy.insertProduct(productData.success.original, Cypress.env('adminToken')).then((response) => {
      const id = response.body._id;
      cy.updateProduct(id, productData.success.updated, Cypress.env('userToken')).should((response) => {
        expect(response.status).to.be.equal(403);
        expect(response.body).to.have.property('message', 'Rota exclusiva para administradores');
      })
    })
  })
});

