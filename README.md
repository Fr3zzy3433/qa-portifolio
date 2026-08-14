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
| **CT001.003** | GET | `/api/users/{id}` | Retrieve existing user without `x-api-key` | Known Finding | Published Authentication Contract vs. Observed Behavior |
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

Configure the repository secret under **Settings > Secrets and variables > Actions** with the exact name `REQRES_API_KEY`.

The CI pipeline:

1. Checks out the repository.
2. Uses Node.js 24.
3. Verifies that `REQRES_API_KEY` is configured.
4. Installs dependencies reproducibly with `npm ci`.
5. Executes the Newman suite through `npm run test:api`.
6. Returns a non-zero exit code whenever the test run contains failures.

A missing secret is treated as a configuration failure, not as a reason to skip the suite and report success.

## Findings vs. Confirmed Defects

ReqRes is an external testing API and this portfolio does not own its business requirements. For that reason, test hypotheses are not automatically labeled as bugs.

The documentation distinguishes among:

- published/documented API expectations;
- observed contract behavior;
- security expectations;
- test hypotheses;
- validation findings;
- published-contract divergences.

`FIND-004` is intentionally stronger than the hypothesis-based findings: ReqRes currently documents `x-api-key` as required for requests, yet the automated suite observed `GET /api/users/2` returning `200 OK` without that header while POST and PUT negative-authentication cases returned `401`. The case therefore records the current observed behavior and links it to the published-contract divergence in `docs/test-findings.md`. If ReqRes later enforces the documented contract for that GET endpoint, the assertion will fail and the finding must be reviewed.

Other examples, such as accepting an empty payload or allowing a `PUT` against an ID treated as non-existent, remain hypothesis-based findings rather than confirmed product defects.

## Documentation

- `test-cases/test-cases.md` — detailed test scenarios and expected/observed results.
- `docs/test-strategy.md` — scope, approach, risks, and limitations.
- `docs/test-findings.md` — documented behavioral findings and contract divergences.
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
