# Teste de API ServeRest com Cypress

## Configuração

1. Inicialização do projeto `Node`

```bash
npm init -y
```

2. Instalação do `Cypress`

```bash
npm install cypress@13.6.6 -D
```

### Configuração do setup do Cypress

Executando o projeto pela a primeira vez

```bash
npx cypress open
```

- Selecionar a opção de `E2E Testing`, no qual é o objetivo de testes testes desse projeto.

![image](https://github.com/user-attachments/assets/dfd3ce08-60e2-4ce1-a9b0-c2b52846d467)

- No próximo passo de configuração será exibo a estrutura inicial que será criada

![image](https://github.com/user-attachments/assets/b911808a-3804-4c7c-8420-6e11e6bd3673)

- Selecionar o navegador, o Cypress irá exibir os navegadores instalado na maquina, nesse caso vamos seguir com `Electron`, que é nativo do próprio Cypress

![image](https://github.com/user-attachments/assets/f49a7ce7-9583-4e1f-993e-0f3a8dc1b84d)

- Será exibido a opção de criação inicial do projeto
  - `Scaffold example spec`: o Cypress irá criar uma estrutura inicial próprio para testes.
  - `Create new spec`: iremos criar nossa própria estrutura de testes

![image](https://github.com/user-attachments/assets/c303ac30-dece-45aa-992e-a1897f58aa90)

- Nesse passo definir com será o nome do `spec` que será criado

![image](https://github.com/user-attachments/assets/3b878a5c-6aa4-4ea9-999b-c96327a13804)

- Será exibido um pequeno overview do que estará sendo criado

![image](https://github.com/user-attachments/assets/500c5a8c-8cb8-4212-9564-a3ba6e119eab)

- Execução do cenário demostrativo do Cypress, o que simbolizar que as configurações foram criadas com sucesso

![image](https://github.com/user-attachments/assets/200db8ab-672a-49eb-af02-6a42c2392a02)

### Execução do ServeRest localmente

Como sugerido pelo próprios criadores do **ServeRest**, para testes de **API** e **Performance** será necessário fazer uma instalação local da aplicação

```bash
npx serverest@latest
```

## Testes Exploratórios

Para testa **API** temos algumas ferramentas que podem ser utilizadas

- **Postman**: A mais conhecida no mercado, criada originalmente como um plugin do browser **Chrome**

- **Katalon Studio**: É uma ferramenta para automação de teste que fornece um ambiente comum para criar e executar testes funcionais de:

  - UI
  - API
  - Web

- **JMeter**: É uma ferramenta _open-source_ e largamente utilizada para testes de **APIs** funcionais, embora tenha sido criada, inicialmente para **testes de carga** (load test)

- **Swagger:** Principalmente voltado para a documentação da API, no qual temos ela estruturada no projeto da **ServeRest**

- **Insomnia**: É uma ferramenta para testar API muito semelhante ao _Postman_, _open-source_ que facilita a interação e a depuração de testes de API.

> No qual nesse projeto será utilizado o **Insomnia**

> Pode-se utilizado também a documentação que tem do **Swagger**

![image](https://github.com/user-attachments/assets/927a50d0-730e-46ef-89b4-a11e1c7b5106)

---

1. Criação de usuário via API

Para criar um usuário via API com o **Insomnia** podemos executar uma requisição `POST - http://localhost:3000/usuarios` para a API, que está sendo executado localmente.

- JSON para requisição

```json
{
  "nome": "Cristiano Ferreira",
  "email": "crisitano@qa.com.br",
  "password": "Abc@123",
  "administrador": "true"
}
```

- Utilizando o **cURL** da requisição

```curl
curl --request POST \
  --url http://localhost:3000/usuarios \
  --header 'Content-Type: application/json' \
  --data '{
  "nome": "Cristiano Ferreira",
  "email": "crisitano@qa.com.br",
  "password": "Abc@123",
  "administrador": "true"
}'
```

> **OBSERVAÇÃO:** temos que ter em mente as regras de negócio da API, e uma das regras de negócio importante e que não é permitido cadastrar usuários com o mesmo **e-mail**, tento assim uma unicidade no e-mail

2. Listar usuários

Para listagem dos usuários executar a requisição `GET - http://localhost:3000/usuarios`

- **cURL** da requisição

```curl
curl --request GET \
  --url http://localhost:3000/usuarios \
```

3. Lista usuário por ID

Para listar um usuário por ID, por exemplo o que foi criado anteriormente podemos executar uma requisição para a API `GET - http://localhost:3000/usuarios/${id_usuario}`

- **cURL** da execução

```curl
curl --request GET \
  --url http://localhost:3000/usuarios/pApmXy9OK7w9RnR5 \

```

4. Editar um usuário

Para realizar uma requisição para edição de dados de um usuário, podemos executar uma requisição para API no endpoint `PUT - http://localhost:3000/usuarios/${id_usuario}`

- JSON da requisição

```json
{
  "nome": "Cristiano Ferreira",
  "email": "crisitano@qa.com.br",
  "password": "Abc@123",
  "administrador": "true"
}
```

- cURL da requisição

```curl
curl --request PUT \
  --url http://localhost:3000/usuarios/pApmXy9OK7w9RnR5 \
  --header 'Content-Type: application/json' \
  --data '{
  "nome": "Cristiano Mothe",
  "email": "crisitano@qa.com.br",
  "password": "Abc@123",
  "administrador": "true"
}'
```

5. Deleta um usuário

Para deletar um usuário, podemos executar uma requisição para API no endpoint `DELETE - http://localhost:3000/usuarios/${id_usuario}`

- cURL da execução

```curl
curl --request DELETE \
  --url http://localhost:3000/usuarios/pApmXy9OK7w9RnR5 \
```

## Automação para criação de usuários

### Usuários

1. Cadastrar usuários

```javascript
describe("POST /usuarios", () => {
  const user = {
    nome: "Cristiano Ferreira",
    email: "crisitano@qa.com.br",
    password: "Abc@123",
    administrador: "true",
  };

  it("deve cadastrar usuário com sucesso", () => {
    cy.request({
      url: "/usuarios",
      method: "POST",
      body: user,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.be.equal(
        "Cadastro realizado com sucesso",
      );
    });
  });
});
```

![image](https://github.com/user-attachments/assets/492a3ac9-fa2f-4387-958f-8dbe8805898e)

> Para melhorar a visualização podemos instalar o plugin `cypress-plugin-api`

2. Instalar o Plugin Cypress API

```bash
npm i cypress-plugin-api
```

3. Editar o arquivo `cypress > support > e2e.js`

```bash
import './commands'
import 'cypress-plugin-api'
```

3. Alteração no código para utilizar o `cypress-plugin-api` no lugar do `request`

```bash
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
```

![image](https://github.com/user-attachments/assets/fa768a3e-76da-47b3-83c1-545594d91bd0)
