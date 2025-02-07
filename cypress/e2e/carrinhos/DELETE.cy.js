describe('DELETE /carrinhos', () => {
  let cartData;
  before(() => {
    cy.clearCartData();
    cy.fixture("cart").then((data) => {
      cartData = data.delete;

      cy.insertUser(data.admin);
      cy.login({
        'email': data.admin.email,
        'password': data.admin.password
      }).then((response) => {
        const adminToken = response.body.authorization;
        cy.insertProducts(cartData.cancel.data.products, adminToken);
        cy.insertProducts(cartData.finish.data.products, adminToken);
      })
    })
  })

  it('deve cancelar um carrinho e devolver os produtos ao estoque', () => {
    const cart = cartData.cancel.data.cart;
    cy.insertUser(cart.user);
    cy.login({
      "email": cart.user.email,
      "password": cart.user.password
    }).then((response) => {
      const token = response.body.authorization;
      cy.createCartWithItems(cart.items, token).then(({ produtos }) => {

        const productQuantityInCart = produtos[0].quantidade;
        cy.listProductById(produtos[0].idProduto).then((response) => {
          const productStockQuantity = response.body.quantidade;

          cy.cancelCart(token).then((response) => {
            cy.listProductById(produtos[0].idProduto).should((respProduct) => {
              expect(respProduct.body.quantidade).to.be.equal(productStockQuantity + productQuantityInCart);
              expect(response.status).to.be.equal(200);
              expect(response.body)
                .to.have.
                property('message', 'Registro excluído com sucesso. Estoque dos produtos reabastecido');
            })
          })
        })
      });
    })

  })

  it('não deve cancelar se o usuário não tiver um carrinho', () => {
    const cart = cartData.cancel.data.cart;
    cy.insertUser(cart.user);
    cy.login({
      "email": cart.user.email,
      "password": cart.user.password
    }).then((response) => {
      const token = response.body.authorization;
      cy.cancelCart(token).should((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body)
          .to.have
          .property('message', 'Não foi encontrado carrinho para esse usuário');
      });
    });
  })

  it('deve finalizar a compra de um carrinho', () => {
    const cart = cartData.finish.data.cart;
    cy.insertUser(cart.user);
    cy.login({
      "email": cart.user.email,
      "password": cart.user.password
    }).then((response) => {
      const token = response.body.authorization;
      cy.createCartWithItems(cart.items, token).then(({ produtos }) => {

        const productQuantityInCart = produtos[0].quantidade;
        cy.listProductById(produtos[0].idProduto).then((response) => {
          const productStockQuantity = response.body.quantidade;

          cy.finishCart(token).then((response) => {
            cy.listProductById(produtos[0].idProduto).should((respProduct) => {
              expect(respProduct.body.quantidade).to.be.equal(productStockQuantity);
              expect(response.status).to.be.equal(200);
              expect(response.body)
                .to.have
                .property('message', 'Registro excluído com sucesso');
            })
          })
        })
      });
    })
  })

  it('não deve finalizar a compra se o usuário não tiver um carrinho', () => {
    const cart = cartData.cancel.data.cart;
    cy.insertUser(cart.user);
    cy.login({
      "email": cart.user.email,
      "password": cart.user.password
    }).then((response) => {
      const token = response.body.authorization;
      cy.finishCart(token).should((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body)
          .to.have
          .property('message', 'Não foi encontrado carrinho para esse usuário');
      });
    });
  })
  it('não deve cancelar um carrinho sem token de autorizaçãoShould not cancel a cart without authorization token', () => {
    cy.cancelCart().should((response) => {
      expect(response.status).to.be.equal(401);
      expect(response.body)
        .to.have
        .property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
    });
  })

  it('não deve terminar um carrinho sem token de autorização', () => {
    cy.finishCart().should((response) => {
      expect(response.status).to.be.equal(401);
      expect(response.body)
        .to.have
        .property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
    });
  })
})