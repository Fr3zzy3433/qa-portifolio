# ReqRes API QA Portfolio

Portfólio de testes de API focado na validação de endpoints do ReqRes. O projeto demonstra boas práticas em testes, estruturação e documentação de defeitos de API.

## Objective

O objetivo principal deste portfólio é demonstrar experiência técnica e prática com testes de API utilizando Postman, criação de casos de teste, validação estrutural (JSON) e identificação de comportamentos divergentes do padrão REST.

## Stack

- Postman
- REST API
- JSON
- HTTP
- Git/GitHub

## Test Coverage

| ID | Method | Scenario | Type |
|----|--------|----------|------|
| CT001.001 | GET | Buscando Usuario por ID cadastrado na base | Positive |
| CT001.002 | GET | Buscando Usuario por ID Não existente na base | Negative |
| CT001.003 | GET | Buscando Usuario por ID sem autenticação | Negative |
| CT002.001 | POST | Criando um Usuario novo na base com todos os dados corretos | Positive |
| CT002.002 | POST | Criando um Usuario novo na base sem a x-api-key | Negative |
| CT002.003 | POST | Criando um Usuario novo na base passando o body vazio | Negative |
| CT003.001 | PUT | Atualizando um Usuario na base estando autenticado | Positive |
| CT003.002 | PUT | Atualizando um Usuario na base não estando autenticado | Negative |
| CT003.003 | PUT | Atualizando um Usuario na base com ID inexistente | Negative |
| CT003.004 | PUT | Atualizando um Usuario na base passando body vazio | Negative |

## Repository Structure

- `README.md`: Este documento com a visão geral do projeto.
- `postman/ReqRes_API_QA_Portfolio.postman_collection.json`: Collection contendo as requisições automatizadas do Postman.
- `test-cases/test-cases.md` & `test-cases.xlsx`: Descrição detalhada dos casos de teste.
- `docs/test-findings.md`: Documentação de observações, comportamentos inesperados e falhas estruturais.

## Running the Tests

1. Instale o Newman (CLI para Postman) via NPM:
   `npm install -g newman`
2. Execute os testes informando as variáveis:
   `newman run postman/ReqRes_API_QA_Portfolio.postman_collection.json --env-var "baseUrl=https://reqres.in" --env-var "api-key=YOUR_API_KEY"`

## Environment Variables

- `{{baseUrl}}`: URL base da API (https://reqres.in).
- `{{api-key}}`: Chave de autenticação necessária para as requisições. Por motivos de segurança, esta variável fica vazia no repositório.

## Automated Assertions

A collection contém scripts `pm.test` que realizam as seguintes validações:
- Status Code (ex: 200, 201, 401, 400, 404).
- Presença de campos obrigatórios no response body (ex: `id`, `createdAt`, `updatedAt`).
- Estrutura JSON válida.

## Test Findings

Comportamentos que não seguem o padrão REST foram identificados (ex: aceitação de requests com body vazio). Eles estão documentados no arquivo `docs/test-findings.md`.

## Skills Demonstrated

- API Testing
- Test Case Design
- Positive Testing
- Negative Testing
- Authentication Testing
- REST
- JSON
- HTTP
- Postman
- Git/GitHub
