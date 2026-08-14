# ReqRes API Test Cases

This document defines the functional test cases for the ReqRes API portfolio. The scenarios cover positive, negative, authentication, validation-hypothesis, and edge-case testing.

## Module: Users - Search (GET)

### CT001.001 - Retrieve existing user by ID

**Objective:** Validate that a user exposed by the test dataset can be retrieved by ID.  
**Method:** GET  
**Endpoint:** `/api/users/2`

**Preconditions:**
- A valid `x-api-key` is provided.
- ID `2` is available in the externally observable dataset used by this portfolio.

**Test Data:** User ID = `2`

**Steps:**
1. Send `GET {{baseUrl}}/api/users/2` with a valid `x-api-key` header.

**Expected Result:**
- Status code is `200 OK`.
- Response is valid JSON.
- Response contains a `data` object.
- `data.id` equals `2`.

**Oracle:** API Documentation / Published Contract.  
**Type:** Positive Testing.  
**Automation Status:** Automated.

---

### CT001.002 - Retrieve non-existent user by ID

**Objective:** Validate the response for an ID outside the dataset used by this test.  
**Method:** GET  
**Endpoint:** `/api/users/23`

**Preconditions:**
- A valid `x-api-key` is provided.
- ID `23` is treated as non-existent by the dataset behavior exercised by this portfolio.

**Test Data:** User ID = `23`

**Steps:**
1. Send `GET {{baseUrl}}/api/users/23` with a valid `x-api-key` header.

**Expected Result:**
- Status code is `404 Not Found`.
- Response is valid JSON.
- Response body is an empty object `{}`.

**Oracle:** API Documentation / Observed Contract.  
**Type:** Negative Testing.  
**Automation Status:** Automated.

---

### CT001.003 - Retrieve user without authentication

**Objective:** Validate that the endpoint rejects a request when the required API key is omitted.  
**Method:** GET  
**Endpoint:** `/api/users/2`

**Preconditions:**
- The `x-api-key` header is not sent.

**Test Data:** User ID = `2`

**Steps:**
1. Send `GET {{baseUrl}}/api/users/2` without `x-api-key`.

**Expected Result:**
- Status code is `401 Unauthorized`.
- Response indicates that the API key is missing or invalid.

**Oracle:** API Security / Published Contract.  
**Type:** Authentication / Negative Testing.  
**Automation Status:** Automated.

---

## Module: Users - Creation (POST)

### CT002.001 - Create user with valid data

**Objective:** Validate the documented successful response when valid user data is submitted.  
**Method:** POST  
**Endpoint:** `/api/users`

**Preconditions:**
- A valid `x-api-key` is provided.

**Test Data:**

```json
{
  "name": "QA Tester",
  "job": "QA Engineer"
}
```

**Steps:**
1. Send `POST {{baseUrl}}/api/users` with a valid `x-api-key` and the JSON payload.

**Expected Result:**
- Status code is `201 Created`.
- Response is valid JSON.
- Response echoes `name` and `job`.
- Response contains a generated `id`.
- Response contains `createdAt`.

**Oracle:** API Documentation / Published Contract.  
**Type:** Positive Testing.  
**Automation Status:** Automated.

---

### CT002.002 - Create user without authentication

**Objective:** Validate that creation is rejected when the required API key is omitted.  
**Method:** POST  
**Endpoint:** `/api/users`

**Preconditions:**
- The `x-api-key` header is not sent.

**Test Data:**

```json
{
  "name": "QA Tester",
  "job": "QA Engineer"
}
```

**Steps:**
1. Send `POST {{baseUrl}}/api/users` without `x-api-key`.

**Expected Result:**
- Status code is `401 Unauthorized`.
- Response indicates that the API key is missing or invalid.

**Oracle:** API Security / Published Contract.  
**Type:** Authentication / Negative Testing.  
**Automation Status:** Automated.

---

### CT002.003 - Create user with empty body payload

**Objective:** Explore how the endpoint handles a creation request without user fields.  
**Method:** POST  
**Endpoint:** `/api/users`

**Preconditions:**
- A valid `x-api-key` is provided.

**Test Data:**

```json
{}
```

**Steps:**
1. Send `POST {{baseUrl}}/api/users` with a valid API key and an empty JSON object.

**Expected Result (Hypothesis):**
- `400 Bad Request` or `422 Unprocessable Entity` if the contract requires fields such as `name` and `job`.

**Observed Behavior:**
- The portfolio has observed `201 Created` with generated response metadata for `{}`.

**Oracle:** Test Hypothesis / Input Validation Expectation.  
**Type:** Edge Case / Negative Testing.  
**Automation Status:** Automated (Finding: `FIND-001`).

**Interpretation:** This is a validation finding, not a confirmed defect, because this portfolio has no authoritative business requirement declaring those fields mandatory.

---

## Module: Users - Update (PUT)

### CT003.001 - Update existing user with valid data

**Objective:** Validate the documented response for an update request targeting an ID available in the test dataset.  
**Method:** PUT  
**Endpoint:** `/api/users/2`

**Preconditions:**
- A valid `x-api-key` is provided.
- ID `2` is available in the externally observable dataset used by this portfolio.

**Test Data:**

```json
{
  "name": "Teste de PUT",
  "job": "QA Junior"
}
```

**Steps:**
1. Send `PUT {{baseUrl}}/api/users/2` with a valid API key and the JSON payload.

**Expected Result:**
- Status code is `200 OK`.
- Response is valid JSON.
- Response echoes the submitted `name` and `job`.
- Response contains `updatedAt`.

**Oracle:** API Documentation / Published Contract.  
**Type:** Positive Testing.  
**Automation Status:** Automated.

---

### CT003.002 - Update existing user without authentication

**Objective:** Validate that an update is rejected when the required API key is omitted.  
**Method:** PUT  
**Endpoint:** `/api/users/2`

**Preconditions:**
- The `x-api-key` header is not sent.

**Test Data:**

```json
{
  "name": "Teste de PUT",
  "job": "QA Junior"
}
```

**Steps:**
1. Send `PUT {{baseUrl}}/api/users/2` without `x-api-key`.

**Expected Result:**
- Status code is `401 Unauthorized`.
- Response indicates that the API key is missing or invalid.

**Oracle:** API Security / Published Contract.  
**Type:** Authentication / Negative Testing.  
**Automation Status:** Automated.

---

### CT003.003 - Update user with non-existent candidate ID

**Objective:** Explore how the API handles an update target outside the dataset used by this test.  
**Method:** PUT  
**Endpoint:** `/api/users/999`

**Preconditions:**
- A valid `x-api-key` is provided.
- ID `999` does not appear in the dataset behavior exercised by this portfolio.

**Test Data:**

```json
{
  "name": "Teste de PUT",
  "job": "QA Junior"
}
```

**Steps:**
1. Send `PUT {{baseUrl}}/api/users/999` with a valid API key and the JSON payload.

**Expected Result (Hypothesis):**
- `404 Not Found` if the API contract requires an update target to already exist.

**Observed Behavior:**
- The portfolio has observed `200 OK` with an `updatedAt` field for this request.

**Oracle:** Test Hypothesis / API Domain Expectation.  
**Type:** Edge Case / Negative Testing.  
**Automation Status:** Automated (Finding: `FIND-002`).

**Interpretation:** This is not a universal HTTP violation. An API may define creation/upsert behavior for `PUT`; without an explicit ReqRes business contract for this scenario, the result is recorded as a validation finding rather than a confirmed defect.

---

### CT003.004 - Update existing user with empty body payload

**Objective:** Explore how the endpoint handles an update request without data fields.  
**Method:** PUT  
**Endpoint:** `/api/users/2`

**Preconditions:**
- A valid `x-api-key` is provided.
- ID `2` is available in the externally observable dataset used by this portfolio.

**Test Data:**

```json
{}
```

**Steps:**
1. Send `PUT {{baseUrl}}/api/users/2` with a valid API key and an empty JSON object.

**Expected Result (Hypothesis):**
- `400 Bad Request` or `422 Unprocessable Entity` if the API contract requires at least one update field.

**Observed Behavior:**
- The portfolio has observed `200 OK` with an `updatedAt` timestamp for `{}`.

**Oracle:** Test Hypothesis / Input Validation Expectation.  
**Type:** Edge Case / Negative Testing.  
**Automation Status:** Automated (Finding: `FIND-003`).

**Interpretation:** This is a validation finding, not a confirmed defect, because this portfolio has no authoritative business requirement declaring update fields mandatory.
