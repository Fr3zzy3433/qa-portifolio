# ReqRes API QA Portfolio

Portfolio project focused on API test design, positive and negative scenarios, automated Postman assertions, authentication validation, traceability, and CI execution using the ReqRes API.

## Project Goal

This repository is a technical QA showcase. It demonstrates how to structure test cases, automate API validations with Postman/Newman, separate confirmed behavior from test hypotheses, document findings without overstating them as defects, and run the suite consistently in local and CI environments.

## Test Scope

The scope covers the **Users** resource of the ReqRes API:

- `GET`, `POST`, and `PUT` methods.
- Positive testing / happy paths.
- Negative testing, including missing authentication and non-existent IDs.
- Input-validation hypotheses using empty payloads.
- Edge-case analysis.
- Traceability between documented cases, automated requests, and findings.

## Current Coverage

| ID | Method | Endpoint | Scenario | Type | Oracle |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CT001.001** | GET | `/api/users/{id}` | Retrieve existing user by ID | Positive | API Documentation / Published Contract |
| **CT001.002** | GET | `/api/users/{id}` | Retrieve non-existent user by ID | Negative | API Documentation / Observed Contract |
| **CT001.003** | GET | `/api/users/{id}` | Retrieve user without authentication | Negative | API Security / Published Contract |
| **CT002.001** | POST | `/api/users` | Create user with valid data | Positive | API Documentation / Published Contract |
| **CT002.002** | POST | `/api/users` | Create user without authentication | Negative | API Security / Published Contract |
| **CT002.003** | POST | `/api/users` | Create user with empty body payload | Negative / Edge | Test Hypothesis / Input Validation Expectation |
| **CT003.001** | PUT | `/api/users/{id}` | Update existing user with valid data | Positive | API Documentation / Published Contract |
| **CT003.002** | PUT | `/api/users/{id}` | Update existing user without authentication | Negative | API Security / Published Contract |
| **CT003.003** | PUT | `/api/users/{id}` | Update user with non-existent ID | Negative / Edge | Test Hypothesis / API Domain Expectation |
| **CT003.004** | PUT | `/api/users/{id}` | Update existing user with empty body payload | Negative / Edge | Test Hypothesis / Input Validation Expectation |

## Project Structure

```text
/
├── README.md
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── scripts/
│   └── run-api-tests.js
├── postman/
│   ├── ReqRes_API_QA_Portfolio.postman_collection.json
│   └── ReqRes_API_QA_Portfolio.environment.example.json
├── test-cases/
│   └── test-cases.md
├── docs/
│   ├── test-strategy.md
│   ├── test-findings.md
│   └── traceability-matrix.md
└── .github/
    └── workflows/
        └── api-tests.yml
```

## Prerequisites

- Node.js 20 or newer for local execution.
- A valid ReqRes API key.

The API key is never committed to this repository.

## Running Locally

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Create your local environment file.

   **Windows PowerShell:**

   ```powershell
   Copy-Item .env.example .env
   ```

   **macOS / Linux:**

   ```bash
   cp .env.example .env
   ```

3. Open `.env` and replace the placeholder with a valid key:

   ```env
   REQRES_API_KEY=your_real_key_here
   ```

4. Execute the suite:

   ```bash
   npm run test:api
   ```

`npm run test` runs the same API suite.

The Node runner loads `.env` locally and injects the key into Newman without relying on shell-specific environment-variable syntax, so the command works consistently on Windows, macOS, Linux, and GitHub Actions.

## Environment Variables

The collection is parameterized with:

- `{{baseUrl}}` — ReqRes base URL.
- `{{api-key}}` — API key injected at execution time.

A missing or placeholder API key causes the run to fail. Authentication/configuration failures are never converted into passing assertions.

## CI with GitHub Actions

The workflow in `.github/workflows/api-tests.yml` runs on pull requests, pushes to `main`, and can also be started manually with **Run workflow**.

Before authenticated executions can pass, configure the repository secret:

1. Open **Settings** in the GitHub repository.
2. Go to **Secrets and variables > Actions**.
3. Create a repository secret named exactly `REQRES_API_KEY`.
4. Store a valid ReqRes API key as its value.

The CI pipeline:

1. Checks out the repository.
2. Uses Node.js 24.
3. Verifies that `REQRES_API_KEY` is configured.
4. Installs dependencies reproducibly with `npm ci`.
5. Executes the Newman suite through `npm run test:api`.
6. Returns a non-zero exit code whenever the test run contains failures.

A missing secret is treated as a configuration failure, not as a reason to skip the suite and report success.

## Findings vs. Confirmed Defects

ReqRes is an external testing API and this portfolio does not own its business requirements. For that reason, unexpected responses are not automatically labeled as bugs.

The documentation distinguishes among:

- published/documented API expectations;
- security expectations;
- observed contract behavior;
- test hypotheses;
- validation findings.

Examples such as accepting an empty payload or allowing a `PUT` against an ID treated as non-existent are documented in `docs/test-findings.md`. Their automated checks record the currently observed behavior while the documentation preserves the original hypothesis and explains the gap. A configuration failure, authentication failure, or unexpected regression still fails the pipeline.

## Documentation

- `test-cases/test-cases.md` — detailed test scenarios and expected/observed results.
- `docs/test-strategy.md` — scope, approach, risks, and limitations.
- `docs/test-findings.md` — documented behavioral findings.
- `docs/traceability-matrix.md` — mapping between test cases, Postman requests, oracles, and findings.

## Technologies

- Postman
- Newman
- Node.js
- GitHub Actions
- REST / JSON

## Author

**Marcius Logan Barcellos**  
QA Analyst Júnior

GitHub: `github.com/Fr3zzy3433`
