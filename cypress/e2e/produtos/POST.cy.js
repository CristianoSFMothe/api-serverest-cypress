describe('POST /produtos', () => {
  let productData;
  before(() => {
    cy.fixture("produtos").then((data) => {
      productData = data.create;

      cy.insertUsers(data.users);
      cy.login(data.login.not_admin).then((response) => {
        Cypress.env('userToken', response.body.authorization);
      })
      cy.login(data.login.admin).then((response) => {
        Cypress.env('adminToken', response.body.authorization);
      })
    })
  })

  describe('Admin user', () => {
    beforeEach(() => {
      cy.clearProductData(Cypress.env('adminToken'));
    })

    it('dever criar produto', () => {
      cy.insertProduct(productData.success, Cypress.env('adminToken')).should((response) => {
        expect(response.status).to.be.equal(201);
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
      })
    })

    it('não deve criar produto com dados inválidos', () => {
      for (const product of productData.invalid) {
        cy.insertProduct(product, Cypress.env('adminToken')).should((response) => {
          expect(response.status).to.be.equal(400);
        })
      }
    })

    it('não deve criar produto duplicado', () => {
      cy.insertProduct(productData.duplicated, Cypress.env('adminToken'));

      cy.insertProduct(productData.duplicated, Cypress.env('adminToken')).should((response) => {
        expect(response.status).to.be.equal(400);
        expect(response.body).to.have.property('message', 'Já existe produto com esse nome');
      })
    })
  })

  it('não deve permitir que usuários não autenticados criem produtos', () => {
    cy.insertProduct(productData.success).should((response) => {
      expect(response.status).to.be.equal(401);
      expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    })
  })
  it('não deve permitir que o usuário crie produto', () => {
    cy.insertProduct(productData.success, Cypress.env('userToken')).should((response) => {
      expect(response.status).to.be.equal(403);
      expect(response.body).to.have.property('message', 'Rota exclusiva para administradores')
    })
  })
})

