# ReqRes API Test Findings

Este documento relata formalmente as inconsistências observadas entre os comportamentos previstos por convenções REST padrão e as respostas reais da API ReqRes. Tais comportamentos são registrados como **Validation Finding** ou **Observed Behavior**, uma vez que a ReqRes atua como ambiente de teste e não possui documentação rígida proibindo tais práticas, mas num cenário corporativo real indicariam falhas estruturais.

## 1. POST `/api/users` - Criação com Body Vazio (CT002.003)
- **Test Finding:** A API aceita a criação de um usuário sem que nenhum campo obrigatório seja enviado.
- **Expected Result:** Status code `400 Bad Request` ou `422 Unprocessable Entity` informando a ausência de dados obrigatórios (`name`, `job`).
- **Actual Result:** A API retorna status `201 Created` gerando `id` e `createdAt` para um body vazio `{}`.

## 2. PUT `/api/users/{id}` - Atualização de ID Inexistente (CT003.003)
- **Test Finding:** A API permite atualizar recursos que não existem no banco de dados.
- **Expected Result:** Status code `404 Not Found` informando que o recurso solicitado não pôde ser encontrado para atualização.
- **Actual Result:** A API retorna `200 OK` com o campo `updatedAt`, aceitando com sucesso o comando sobre uma entidade inexistente (ex: ID 999).

## 3. PUT `/api/users/{id}` - Atualização com Body Vazio (CT003.004)
- **Test Finding:** A API processa e aceita atualizações em recursos sem que nenhuma informação nova seja transmitida.
- **Expected Result:** Status code `400 Bad Request` informando que dados devem ser passados para a modificação.
- **Actual Result:** A API retorna status `200 OK` gerando `updatedAt` para um body vazio `{}`.
