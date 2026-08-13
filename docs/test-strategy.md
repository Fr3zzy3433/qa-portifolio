# Test Strategy - ReqRes API QA Portfolio

This document outlines the testing strategy employed for the ReqRes API test portfolio. It defines the boundaries of testing, methodologies applied, and expectations set for automation and exploratory findings.

## 1. Scope
The scope of this project is limited to functional API testing of the **Users** resource of the ReqRes API.
The following HTTP methods are covered:
- `GET` /api/users/{id}
- `POST` /api/users
- `PUT` /api/users/{id}

## 2. Out of Scope
The following testing types are explicitly out of scope for this portfolio project:
- Performance Testing (Load, Stress, Spike)
- Security Penetration Testing (beyond basic authentication validation)
- UI Testing
- Database Testing
- Other endpoints of the ReqRes API (e.g., `/api/login`, `/api/register`)

## 3. Test Approach
The test design applies the following techniques:
- **Positive Testing:** Validating that the API behaves correctly when provided with valid input and preconditions (Happy Path).
- **Negative Testing:** Validating how the API handles invalid inputs, such as missing fields or non-existent IDs.
- **Authentication Testing:** Ensuring that the endpoints correctly validate the presence of the `x-api-key` header and return appropriate access control status codes (`401 Unauthorized`).
- **Validation / Edge Cases:** Exploring how the API handles boundary conditions like empty payloads (`{}`) and updating non-existent records.

## 4. Test Environment
Tests are executed against the public ReqRes environment: `https://reqres.in`

## 5. Test Data
Test data is hardcoded for simplicity in this specific project context, chosen to demonstrate clear functional intent:
- **Valid User ID:** `2` (Known to exist in ReqRes).
- **Invalid User ID:** `23` (or `999`), selected to simulate `404 Not Found` or edge case scenarios.

## 6. Test Oracle
Since ReqRes is a public mock API without a rigid set of explicit business requirements, results are evaluated against the following oracles:
- **API Documentation:** The implicit behavior demonstrated on the ReqRes website.
- **HTTP Semantics:** RFC conventions for RESTful APIs (e.g., `GET` on a non-existent resource should return `404`, `POST` should return `201`).
- **Test Hypothesis:** Logical QA assumptions for input validation (e.g., creating a user with an empty body should return a `400`). Deviations from these hypotheses are logged as *Validation Findings* rather than confirmed deviations.

## 7. Risks and Limitations
- **Public Sandbox Environment:** The ReqRes API is public; its behavior, data state, and authentication mechanisms may change without notice. Currently, endpoints enforce an `x-api-key` header which might cause standard `GET` requests to return `401` if no valid key is present.
- **Stateless Mocks:** Operations like `POST` and `PUT` return success codes but do not persist data in a real backend. Subsequent `GET` requests for a newly "created" ID will return `404`. This is a known limitation of the test environment and not a bug.
