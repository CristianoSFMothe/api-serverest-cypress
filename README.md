# 🚀 **Projeto de Testes Automatizados com Cypress**

Bem-vindo ao repositório de testes automatizados utilizando **Cypress**! Este projeto tem como objetivo validar a API **ServeRest** através de testes automatizados, garantindo a confiabilidade e a integridade das respostas.

---

## 📋 **Índice**

- 🎯 [Objetivo](#-objetivo)
- 🛠️ [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- ⚙️ [Instalação](#️-instalação)
- ▶️ [Como Executar os Testes](#️-como-executar-os-testes)
- 📁 [Estrutura do Projeto](#-estrutura-do-projeto)
- 🧪 [Principais Testes Implementados](#-principais-testes-implementados)
- 📌 [Melhores Práticas Utilizadas](#-melhores-práticas-utilizadas)
- 🤝 [Contribuição](#-contribuição)
- 📄 [Licença](#-licença)
- 📞 [Contato](#-contato)

---

## 🎯 **Objetivo**

Este projeto tem como finalidade a automação de testes para validar os endpoints da API **ServeRest**.  
Os testes garantem que as operações de CRUD (Create, Read, Update, Delete) funcionam corretamente, além de validar regras de negócio.

---

## 🛠️ **Tecnologias Utilizadas**

As principais tecnologias utilizadas neste projeto são:

- ✅ **[Cypress](https://www.cypress.io/)** – Framework de testes End-to-End (E2E).
- ✅ **[JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)** – Linguagem de programação utilizada.
- ✅ **[NPMm](https://www.npmjs.com/)** – Gerenciador de pacotes.
- ✅ **[ServeRest](https://serverest.dev/)** – API simulada para testes.  
  dos testes.

---

## ⚙️ **Instalação**

Para instalar as dependências do projeto, siga os passos abaixo:

```sh
# Clone o repositório
git clone https://github.com/CristianoSFMothe/api-serverst-cypress

# Acesse a pasta do projeto
cd seu-repositorio

# Instale as dependências
yarn install
```

---

## ▶️ **Como Executar os Testes**

Para rodar os testes, utilize um dos comandos abaixo:

✅ **Executar em modo Headless (sem interface gráfica):**

```sh
yarn test
```

✅ **Executar no Cypress Test Runner (modo interativo):**

```sh
npx cypress open
```

✅ **Executar testes específicos:**

```sh
npx cypress run --spec "cypress/e2e/usuarios.spec.js"
```

---

## 📁 **Estrutura do Projeto**

A estrutura do projeto segue a seguinte organização:

```
📂 cypress/
 ├── 📂 e2e/                     # Testes automatizados
 │   ├── 📂 carrinhos/
 │   ├   ├── DELETE.spec.js
 │   ├   ├── GET.spec.js
 │   ├   ├── POST.spec.js
 │   ├── 📂 login/
 │   ├   ├── login.spec.js
 │   ├── 📂 produtos/
 │   ├   ├── DELETE.spec.js
 │   ├   ├── GET.spec.js
 │   ├   ├── POST.spec.js
 │   ├   ├── PUT.spec.js
 │   ├── login.spec.js
 │   ├── login.spec.js
 │
 ├── 📂 fixtures/               # Arquivos JSON com dados fictícios
 │   ├── cart.json
 │   ├── login.json
 │   ├── produtos.json
 │   ├── usuarios.json
 │
 ├── 📂 support/                # Comandos customizados e configurações
 │   ├── carts.commands.js
 │   ├── e2e.js
 │   ├── login.commands.js
 │   ├── product.commands.js
 │   ├── user.commands.js
 │
 ├── cypress.config.js          # Arquivo de configuração do Cypress
 ├── package.json               # Dependências e scripts do projeto
 ├── README.md                  # Documentação do projeto
```

---

## 🧪 **Principais Testes Implementados**

✔️ **Usuários:**

- Criar um novo usuário
- Listar usuários cadastrados
- Filtrar usuários por nome
- Atualizar dados do usuário
- Deletar usuário

✔️ **Produtos:**

- Criar um novo produto
- Listar produtos disponíveis
- Atualizar informações de um produto
- Deletar produto

✔️ **Login:**

- Autenticação de usuários
- Acesso com credenciais inválidas
- Validação de token de autorização

---

## 📌 **Melhores Práticas Utilizadas**

✔️ **Uso de Fixtures:** Dados fictícios armazenados em arquivos JSON para tornar os testes mais dinâmicos.  
✔️ **Custom Commands:** Comandos personalizados no Cypress para evitar repetição de código.  
✔️ **Separação de responsabilidades:** Organização dos testes seguindo boas práticas de estruturação.  
✔️ **Validação de Status Code:** Todos os testes garantem que a API responde com os status corretos.

---

## 🤝 **Contribuição**

Contribuições são sempre bem-vindas! Para contribuir:

1. **Faça um fork** do projeto
2. Crie uma **branch** com sua feature (`git checkout -b minha-feature`)
3. **Commit** suas mudanças (`git commit -m 'Adicionando minha feature'`)
4. Faça um **push** para a branch (`git push origin minha-feature`)
5. Abra um **Pull Request**

---

## 📄 **Licença**

Este projeto está sob a licença **MIT**. Para mais detalhes, consulte o arquivo **LICENSE**.

---

## 📞 **Contato**

Se tiver dúvidas ou sugestões, entre em contato:

📧 **Portfolio:** [Portfolio Cristiano](https://portfolio-qa-cristiano.vercel.app/)  
🐙 **GitHub:** [github.com/CristianoSFMothe](https://github.com/CristianoSFMothe)  
💼 **LinkedIn:** [linkedin.com/in/cristiano-da-silva-ferreira](https://www.linkedin.com/in/cristiano-da-silva-ferreira/)
