# ReqRes API – QA Portfolio
This collection contains functional test cases for the ReqRes public API, organized as a QA portfolio to demonstrate API testing practices using Postman.
The tests cover the Users resource and are grouped into two modules:
Usuários – Busca (GET)
Validates the behavior of the GET /api/users/{id} endpoint across different scenarios:
CT001.001 – Retrieve a user by a valid existing ID (happy path)
CT001.002 – Retrieve a user by a non-existent ID (expected 404)
CT001.003 – Retrieve a user without authentication (access control validation)

Usuários – Criação (POST)
Validates the behavior of the POST /api/users endpoint:
CT002.001 – Create a user with valid data (happy path)
CT002.002 – Attempt to create a user without authentication (access control validation)
CT002.003 – Attempt to create a user with an empty request body (input validation)

Each test case follows a structured naming convention (CT[module].[case]) to make it easy to trace requirements and results. The collection uses the ReqRes environment for variable management (e.g., api-key).

## How to Use
1. Import `ReqRes_API_QA_Portfolio.postman_collection.json` into Postman
2. Create a new Environment called `ReqRes` with a variable `api-key`
3. Set your ReqRes API key as the Current Value of `api-key`
4. Select the `ReqRes` environment and run the collection


