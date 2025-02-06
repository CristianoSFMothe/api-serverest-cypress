import qs from 'qs';
describe('GET /produtos', () => {
  let productData;
  before(() => {
    cy.fixture("produtos").then((data) => {
      productData = data.list;
      cy.insertUsers(data.users);

      cy.login(data.login.admin).then((response) => {
        Cypress.env('adminToken', response.body.authorization);
      })
    })

    cy.clearCartData();
  })

  beforeEach(() => {
    cy.clearProductData(Cypress.env('adminToken'));
  })

  it('deve listar produtos', () => {
    const DEFAULT_PRODUCTS_COUNT = 2;

    cy.insertProducts(productData, Cypress.env('adminToken'));

    cy.listProducts().should((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('quantidade', productData.length + DEFAULT_PRODUCTS_COUNT);
      expect(response.body.produtos.length).to.be.equal(productData.length + DEFAULT_PRODUCTS_COUNT);
    })
  })

  it('deve listar produtos filtrados por parâmetros', () => {
    cy.insertProducts(productData, Cypress.env('adminToken'));

    const product = productData[0];
    const filterParams = qs.stringify(product);

    cy.listProducts(filterParams).should((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('quantidade', 1);
      expect(response.body.produtos.length).to.be.equal(1);
      expect(response.body.produtos[0]).to.include(product);
    })
  })

  it('deve encontrar o produto por ID', () => {
    cy.insertProduct(productData[0], Cypress.env('adminToken')).then((response) => {
      const id = response.body._id;
      cy.listProductById(id).should((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).include(productData[0]);
      })
    });
  })
})
