# ReqRes API QA Portfolio

Portfolio project focused on API test design, positive and negative scenarios, automated Postman assertions, authentication validation, and structured documentation using the ReqRes public API.

## Project Goal
This repository serves as a professional technical showcase of API testing skills. It demonstrates how to structure test cases, design contract-based assertions using Postman and Newman, identify boundary conditions, log exploratory findings without breaking automated CI pipelines, and document everything using a clear, scalable structure.

## Test Scope
The scope includes functional validation of the **Users** resource of the ReqRes API.
It covers:
- `GET`, `POST`, and `PUT` methods.
- Positive testing (Happy path).
- Negative testing (Invalid IDs, Missing authentication).
- Input validation (Empty payloads).
- Edge cases (Updating non-existent resources).

## Current Coverage

| ID | Method | Endpoint | Scenario | Type | Oracle |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CT001.001** | GET | `/api/users/{id}` | Retrieve existing user by ID | Positive | API Documentation |
| **CT001.002** | GET | `/api/users/{id}` | Retrieve non-existent user by ID | Negative | Test Hypothesis / API Domain Expectation |
| **CT001.003** | GET | `/api/users/{id}` | Retrieve user without authentication | Negative | API Security |
| **CT002.001** | POST | `/api/users` | Create user with valid data | Positive | API Documentation |
| **CT002.002** | POST | `/api/users` | Create user without authentication | Negative | API Security |
| **CT002.003** | POST | `/api/users` | Create user with empty body payload | Negative/Edge | Test Hypothesis |
| **CT003.001** | PUT | `/api/users/{id}` | Update existing user with valid data | Positive | API Documentation |
| **CT003.002** | PUT | `/api/users/{id}` | Update existing user without authentication | Negative | API Security |
| **CT003.003** | PUT | `/api/users/{id}` | Update user with non-existent ID | Negative/Edge | Test Hypothesis / API Domain Expectation |
| **CT003.004** | PUT | `/api/users/{id}` | Update existing user with empty body payload | Negative/Edge | Test Hypothesis |

## Project Architecture

```
/
├── README.md                                        # This file
├── .gitignore                                       # Ignored files
├── postman/
│   ├── ReqRes_API_QA_Portfolio.postman_collection.json # Automated test cases
│   └── ReqRes_API_QA_Portfolio.environment.example.json # Template for env variables
├── test-cases/
│   └── test-cases.md                                # Detailed test scenarios
├── docs/
│   ├── test-strategy.md                             # Scope, approaches, and limitations
│   ├── test-findings.md                             # Detailed behavior divergence logs
│   └── traceability-matrix.md                       # Mapping tests to requirements
└── .github/
    └── workflows/
        └── api-tests.yml                            # GitHub Actions CI pipeline
```

## Running the Tests

To run the automated tests locally, you need [Node.js](https://nodejs.org/) installed.

1. Install dependencies:
   ```bash
   npm ci
   ```
2. Configure the API Key:
   Create a `.env` file in the root directory and add your API key (do not commit this file):
   ```env
   REQRES_API_KEY=your_api_key_here
   ```
3. Run the tests:
   ```bash
   npm run test:api
   ```

## Environment Variables

The Postman collection is fully parameterized. Do not commit real secrets or API keys.
- `{{baseUrl}}`: The base URL of the API (e.g., `https://reqres.in`).
- `{{api-key}}`: The authorization key required to interact with the endpoints. This must be injected via CLI or a local environment file.

## Test Findings and CI/CD

Exploratory findings (e.g., the API returning `201 Created` for an empty payload instead of `400 Bad Request`) are actively documented in `docs/test-findings.md`.
To maintain a reliable Continuous Integration (CI) pipeline, the automated Postman assertions test the *actual observed behavior* for these known findings, ensuring the build remains green while the architectural issues are tracked transparently in the documentation.
