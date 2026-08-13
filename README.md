# ReqRes API QA Portfolio

This repository contains a professional API testing suite for the [ReqRes](https://reqres.in) mock API, demonstrating functional test coverage, automated assertions, and professional defect documentation.

## Objective

The purpose of this portfolio is to demonstrate practical API testing skills, including creating structured test cases based on BDD principles, automating validations using Postman and Newman, organizing test execution suites, and professionally documenting observed deviations from standard REST conventions.

## Stack

- **Postman**: API testing and collection management.
- **Newman**: CLI execution of Postman collections.
- **REST API**: Architecture tested.
- **JSON**: Data format validated.
- **HTTP**: Protocol and status code validation.

## Test Coverage

The test cases cover positive and negative scenarios across multiple HTTP methods on the Users resource.

| Case ID   | Method | Scenario                                      | Expected Result                                   |
|-----------|--------|-----------------------------------------------|---------------------------------------------------|
| CT001.001 | GET    | Retrieve an existing user by ID               | 200 OK, valid JSON object                         |
| CT001.002 | GET    | Retrieve a non-existent user by ID            | 404 Not Found, empty JSON object                  |
| CT001.003 | GET    | Retrieve a user without authentication        | 401 Unauthorized, auth error message              |
| CT002.001 | POST   | Create a user with valid data                 | 201 Created, contains ID and createdAt timestamp  |
| CT002.002 | POST   | Create a user without authentication          | 401 Unauthorized, auth error message              |
| CT002.003 | POST   | Attempt to create a user with an empty body   | 400 Bad Request                                   |
| CT003.001 | PUT    | Update an existing user with valid data       | 200 OK, contains updatedAt timestamp              |
| CT003.002 | PUT    | Update a user without authentication          | 401 Unauthorized, auth error message              |
| CT003.003 | PUT    | Attempt to update a non-existent user         | 404 Not Found                                     |
| CT003.004 | PUT    | Attempt to update a user with an empty body   | 400 Bad Request                                   |

*For full BDD details, please refer to the [Test Cases Document](test-cases/test-cases-reqres-api.md).*

## Repository Structure

```
/
├── README.md                                          # This file
├── .gitignore                                         # Standard git ignores
├── postman/
│   └── ReqRes_API_QA_Portfolio.postman_collection.json # Automated test collection
├── test-cases/
│   ├── test-cases-reqres-api.xlsx                     # Original test case spreadsheet
│   └── test-cases-reqres-api.md                       # Markdown version for easy reading
└── docs/
    └── test-findings.md                               # Professional documentation of test observations
```

## Running the Tests

To execute these tests locally via the command line using Newman:

1. **Install Node.js** (if not already installed).
2. **Install Newman** globally:
   ```bash
   npm install -g newman
   ```
3. **Execute the Collection**:
   Since the API requires an API key for this specific mock setup, you must pass the environment variable during runtime. Replace `YOUR_API_KEY` with a valid key.
   ```bash
   newman run postman/ReqRes_API_QA_Portfolio.postman_collection.json --env-var "api-key=YOUR_API_KEY"
   ```

*Note: For testing in the Postman UI, import the JSON file and set the `api-key` in your Environment Variables.*

## Environment Variables

The collection utilizes variables to ensure flexibility and security:
- `{{baseUrl}}`: Defaults to `https://reqres.in`. Prevents hardcoded URLs across requests.
- `{{api-key}}`: The authentication token required for endpoints. **This is intentionally left empty in the versioned collection** to prevent secret leakage. You must provide it locally to run the tests.

## Test Automation

The Postman collection includes automated assertions (`pm.test`) to validate:
- **HTTP Status Codes** (e.g., asserting `200`, `201`, `401`, `404`).
- **Response Structure** (e.g., verifying responses are valid JSON).
- **Data Integrity** (e.g., ensuring `id`, `createdAt`, or `updatedAt` properties are returned when expected).
- **Negative Scenarios** (e.g., asserting expected client errors).

## Test Findings

During testing, some behaviors deviated from expected standard REST conventions (e.g., accepting empty request bodies). These have been documented objectively as **Validation Findings**.

Read the full report in [Test Findings](docs/test-findings.md).

## Skills Demonstrated

- API Testing
- Test Case Design (BDD)
- Positive and Negative Testing
- Postman (Collections, Variables, Scripts)
- REST API Conventions
- HTTP Status Validation
- Defect/Finding Documentation
- Git/GitHub (Security and Organization)
