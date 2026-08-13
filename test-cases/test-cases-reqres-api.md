# ReqRes API Test Cases

This document outlines the test cases for the ReqRes API. It includes positive and negative scenarios for GET, POST, and PUT operations.

## Scenario: 001- Busca/Search

### CT001.001 - Buscando Usuario por ID cadastrado na base

**Description / Steps:**
> Dado que o ID 2 exista na base
> Quando eu fizer o get em https://reqres.in/api/users/2
> Então o sistema deve retornar status 200 OK
> E o corpo da resposta deve ser um objeto válido

**Status:** Pass

---

### CT001.002 - Buscando Usuario por ID  Não existente na base

**Description / Steps:**
> Dado que o ID 23 não exista na base
> Quando eu fizer o get em https://reqres.in/api/users/23
> Então o sistema deve retornar status 404 Not Found
> E o corpo da resposta deve ser um objeto vazio {}

**Status:** Pass

---

### CT001.003 - Buscando Usuario por ID sem autenticação

**Description / Steps:**
> Dado que eu não informe o x-api-key
> Quando eu fizer get em https://reqres.in/api/users/2
> Então o sistema deve retornar status 401 Unauthorized
> E a resposta deve indicar falta de autenticação

**Status:** Pass

---

## Scenario: 002 -  Criação/Create

### CT002.001 - Criando um Usuario novo na base com todos os dados corretos

**Description / Steps:**
> Dado que eu informe a x-api-key
> E os dados name como string e job como string
> Quando eu fizer POST em https://reqres.in/api/users
> Então o sistema deve retornar status 201 Created
> E a resposta deve conter name e job com os valores enviados
> E a resposta deve conter id como inteiro gerado pela API
> E a resposta deve conter createdAt como timestamp da criação

**Status:** Pass

---

### CT002.002 - Criando um Usuario novo na base sem a x-api-key

**Description / Steps:**
> Dado que eu não informe a x-api-key
> Quando eu fizer o post em https://reqres.in/api/users
> Então o sistema deve retornar status 401 Unauthorized
> E a resposta deve ser clara sobre a falta da x-api-key

**Status:** Pass

---

### CT002.003 - Criando um Usuario novo na base passando o body vazio

**Description / Steps:**
> Dado que eu mande um body vazio
> Quando eu fizer o post em https://reqres.in/api/users
> Então o sistema deve retornar 400 Bad Request
>

**Status:** Validation Finding (Observation)

**Observed Behavior:** API retornou 201 Created com timestamp  mesmo sem nenhum dado no body, aceitando criação de  usuário sem campos obrigatórios

---

## Scenario: 003 - Atualizar/Update

### CT003.001 - Atualizando um Usuario na base estando autenticado

**Description / Steps:**
> Dado que eu passe a x-api-key e o usuario exista
> Quando eu fizer o PUT em https://reqres.in/api/users/2
> Então o sistema deve retornar status 200 OK
> E a resposta deve retornar o objeto ja atualizado

**Status:** Pass

---

### CT003.002 - Atualizando um Usuario na base não estando autenticado

**Description / Steps:**
> Dado que eu não passe a x-api-key e o usuario exista
> Quando eu fizer o PUT em https://reqres.in/api/users/2
> Então o sistema deve retornar status 401 Unauthorized
> E a resposta deve retornar o erro claro de falta da chave de API

**Status:** Pass

---

### CT003.003 - Atualizando um Usuario na base com ID inexistente

**Description / Steps:**
> Dado que eu passe a x-api-key e o usuario não exista
> Quando eu fizer o PUT em https://reqres.in/api/users/999
> Então o sistema deve retornar status 404 Not Found
> E a resposta deve retornar o body vazio

**Status:** Validation Finding (Observation)

**Observed Behavior:** API retornou 200OK com timestamp  mesmo sem nenhum dado no body, aceitando atualização de  usuário sem o mesmo existir na base

---

### CT003.004 - Atualizando um Usuario na base passando body vazio

**Description / Steps:**
> Dado que eu passe a x-api-key e o usuario exista
> Quando eu fizer o PUT em https://reqres.in/api/users/2
> Então o sistema deve retornar status 400 Bad Request
> E a resposta deve retornar o body vazio

**Status:** Validation Finding (Observation)

**Observed Behavior:** API retornou 200 OK com timestamp  mesmo sem nenhum dado no body, aceitando atualização de  usuário com body vazio

---
