# ReqRes API Test Findings

This document outlines the professional observations and findings identified during the validation of the ReqRes API.

**Note on Terminology**: These items are documented as *Validation Findings* or *Observed Behaviors* rather than definitive "Bugs". In standard QA practice, a system behavior is only classified as a bug if it explicitly contradicts a written requirement, contract, or specification. Since the ReqRes public API serves as a mock environment without strict public requirement documentation detailing expected error handling for empty bodies or non-existent IDs, we note these deviations from standard REST conventions professionally.

## 1. POST `/api/users` - Missing Required Fields Handling (CT002.003)
*   **Test Case Expectation:** When sending an empty request body (`{}`), standard REST convention expects a `400 Bad Request` or `422 Unprocessable Entity` indicating that required user creation fields (e.g., `name`, `job`) are missing.
*   **Observed Behavior:** The API returns a `201 Created` status code and generates a response containing an `id` and a `createdAt` timestamp, effectively accepting the creation of a user without any data.

## 2. PUT `/api/users/{id}` - Non-Existent ID Handling (CT003.003)
*   **Test Case Expectation:** When attempting to update a resource using an ID that does not exist in the database (e.g., ID `999`), the system is expected to return a `404 Not Found` to indicate the resource cannot be modified because it was not found.
*   **Observed Behavior:** The API returns a `200 OK` status code along with an `updatedAt` timestamp, seemingly accepting the update for a non-existent resource without generating an error.

## 3. PUT `/api/users/{id}` - Empty Request Body Handling (CT003.004)
*   **Test Case Expectation:** When sending an empty request body (`{}`) for an update operation on an existing user, the system is expected to return a `400 Bad Request` (or similar validation error) as no data was provided to update the resource.
*   **Observed Behavior:** The API returns a `200 OK` status code along with an `updatedAt` timestamp, processing the update despite the absence of a payload.
