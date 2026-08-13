# ReqRes API Test Findings

This document formally reports observations and inconsistencies between standard REST conventions (or test hypotheses) and the actual behavior of the ReqRes API.

Because ReqRes acts as a public sandbox/mock API without strict business requirements, these behaviors are classified as **Validation Findings** or **Observed Behavior** rather than confirmed defects. In a real corporate environment, these would be raised for clarification with the product or development team.

## FIND-001 — POST accepts empty payload

**Classification:** Validation Finding
**Test Case:** CT002.003
**Oracle:** Test Hypothesis / Input Validation Best Practices
**Expected:** Status code `400 Bad Request` or `422 Unprocessable Entity` indicating the absence of required data fields (e.g., `name`, `job`).
**Observed:** The API returns status `201 Created`, generating an `id` and `createdAt` timestamp for a completely empty body `{}`.
**Evidence:** Executing `POST /api/users` with `{}` payload returns a successful creation response.
**Impact:** Not assessed due to the absence of a strict business requirement.
**Conclusion:** The behavior differs from the expected validation hypothesis, but it cannot be classified as a confirmed defect without an explicit API contract dictating mandatory fields.

---

## FIND-002 — PUT updates non-existent resource ID

**Classification:** Validation Finding
**Test Case:** CT003.003
**Oracle:** HTTP Semantics (RFC 7231)
**Expected:** Status code `404 Not Found` informing that the requested resource could not be found for an update operation.
**Observed:** The API returns `200 OK` with an `updatedAt` field, successfully accepting an update command for an entity that does not exist (e.g., ID `999`).
**Evidence:** Executing `PUT /api/users/999` with valid payload returns `200 OK`.
**Impact:** Not assessed due to the absence of a strict business requirement.
**Conclusion:** The behavior deviates from standard HTTP semantics for `PUT` on non-existent resources (which typically return `404` or `201` if creation is allowed). Since it behaves as a mock, this is noted as a finding.

---

## FIND-003 — PUT accepts empty payload

**Classification:** Validation Finding
**Test Case:** CT003.004
**Oracle:** Test Hypothesis / Input Validation Best Practices
**Expected:** Status code `400 Bad Request` or `422 Unprocessable Entity` indicating that data must be provided to perform an update.
**Observed:** The API returns status `200 OK`, generating an `updatedAt` timestamp despite the payload being empty `{}`.
**Evidence:** Executing `PUT /api/users/2` with `{}` payload returns `200 OK`.
**Impact:** Not assessed due to the absence of a strict business requirement.
**Conclusion:** The behavior differs from the expected validation hypothesis, but it cannot be classified as a confirmed defect without an explicit API contract dictating mandatory update fields.
