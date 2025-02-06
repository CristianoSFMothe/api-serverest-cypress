describe('POST /carrinhos', () => {
  let cartData;

  before(() => {
    cy.fixture('cart').then((data) => {
      cartData = data.create;

      cy.insertUser(data.admin);
      cy.login({ 'email': data.admin.email, 'password': data.admin.password })
        .then((response) => {
          Cypress.env('adminToken', response.body.authorization);
        })
    })
  })

  it('deveria criar um carrinho', () => {
    const user = cartData.success.data.user;
    cy.insertUser(user);
    cy.login({ 'email': user.email, 'password': user.password }).then((response) => {
      const userToken = response.body.authorization;
      cy.cancelCart(userToken);
      cy.insertProducts(cartData.success.data.products, Cypress.env('adminToken'));

      cy.createCartWithItems(cartData.success.items, userToken).should(({ response }) => {
        expect(response.status).to.be.equal(201);
        expect(response.body)
          .to.have
          .property('message', 'Cadastro realizado com sucesso');
      });
    })
  })

  it('não deveria criar mais de um carrinho', () => {
    const user = cartData.duplicated_cart.data.user;
    cy.insertUser(user);
    cy.login({ 'email': user.email, 'password': user.password }).then((response) => {
      const userToken = response.body.authorization;
      cy.cancelCart(userToken);
      cy.insertProducts(cartData.duplicated_cart.data.products, Cypress.env('adminToken'));

      cy.createCartWithItems(cartData.duplicated_cart.items, userToken).then(() => {
        cy.createCartWithItems(cartData.duplicated_cart.items, userToken).should(({ response }) => {
          expect(response.status).to.be.equal(400);
          expect(response.body)
            .to.have
            .property('message', 'Não é permitido ter mais de 1 carrinho');
        });
      })
    })
  })

  it('não deve criar carrinho com produto duplicado', () => {
    const user = cartData.duplicated_product.data.user;
    cy.insertUser(user);
    cy.login({ 'email': user.email, 'password': user.password }).then((response) => {
      const userToken = response.body.authorization;
      cy.cancelCart(userToken);
      cy.insertProducts(cartData.duplicated_product.data.products, Cypress.env('adminToken'));

      cy.createCartWithItems(cartData.duplicated_product.items, userToken).should(({ response }) => {
        expect(response.status).to.be.equal(400);
        expect(response.body)
          .to.have
          .property('message', 'Não é permitido possuir produto duplicado');
      });
    })
  })
  it('não deveria criar um carrinho com um produto inexistente', () => {
    const user = cartData.inexistent_product.data.user;
    cy.insertUser(user);
    cy.login({ 'email': user.email, 'password': user.password }).then((response) => {
      const userToken = response.body.authorization;
      cy.cancelCart(userToken);

      cy.log(cartData.inexistent_product.items)
      cy.createCart(cartData.inexistent_product.cart, userToken).should((response) => {
        expect(response.status).to.be.equal(400);
        expect(response.body)
          .to.have
          .property('message', 'Produto não encontrado');
      });
    })
  })

  it('não deve criar um carrinho com quantidade insuficiente de produto', () => {
    const user = cartData.insufficient_product.data.user;
    cy.insertUser(user);
    cy.login({ 'email': user.email, 'password': user.password }).then((response) => {
      const userToken = response.body.authorization;
      cy.cancelCart(userToken);
      cy.insertProducts(cartData.insufficient_product.data.products, Cypress.env('adminToken'));

      cy.createCartWithItems(cartData.insufficient_product.items, userToken).should(({ response }) => {
        expect(response.status).to.be.equal(400);
        expect(response.body)
          .to.have
          .property('message', 'Produto não possui quantidade suficiente');
      });
    })
  })

  it('não deve criar um carrinho com dados inválidos', () => {
    const user = cartData.fail.data.user;
    cy.insertUser(user);
    cy.login({ 'email': user.email, 'password': user.password }).then((response) => {
      const userToken = response.body.authorization;
      cy.cancelCart(userToken);

      cy.createCart(cartData.fail.invalid, userToken).should((response) => {
        expect(response.status).to.be.equal(400);
        expect(response.body)
          .to.have
          .property('produtos[0].idProduto', 'produtos[0].idProduto não pode ficar em branco');
        expect(response.body)
          .to.have
          .property('produtos[0].quantidade', 'produtos[0].quantidade deve ser um número');
        expect(response.body)
          .to.have
          .property('produtos', 'produtos não contém 1 valor obrigatório');

      });
    })
  })
})
