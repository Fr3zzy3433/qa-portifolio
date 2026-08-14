# ReqRes API Test Findings

This document records observations and differences between explicit API expectations, test hypotheses, and the actual behavior observed during execution.

Because ReqRes is an external testing API and this portfolio does not own its business requirements, these behaviors are classified as **Validation Findings** or **Observed Behavior** rather than confirmed defects. In a real product environment, they would be raised for clarification against the product/API contract before being classified as bugs.

## FIND-001 — POST accepts empty payload

**Classification:** Validation Finding  
**Test Case:** CT002.003  
**Oracle:** Test Hypothesis / Input Validation Best Practices  
**Expected (Hypothesis):** Status code `400 Bad Request` or `422 Unprocessable Entity` if `name` and `job` are mandatory fields.  
**Observed:** The API returns `201 Created`, generating an `id` and `createdAt` timestamp for an empty body `{}`.  
**Evidence:** Executing `POST /api/users` with `{}` and a valid API key returns a successful creation response.  
**Impact:** Not assessed because this portfolio has no authoritative business requirement declaring those fields mandatory.  
**Conclusion:** The behavior differs from the validation hypothesis, but it is not a confirmed defect without an explicit contract requiring those fields.

---

## FIND-002 — PUT accepts update for a non-existent resource ID

**Classification:** Validation Finding  
**Test Case:** CT003.003  
**Oracle:** Test Hypothesis / API Domain Expectation  
**Expected (Hypothesis):** `404 Not Found` if the API contract requires the target resource to exist before an update.  
**Observed:** The API returns `200 OK` with an `updatedAt` field for a request to an ID treated by this test as non-existent (for example, ID `999`).  
**Evidence:** Executing `PUT /api/users/999` with a valid payload and API key returns `200 OK`.  
**Impact:** Not assessed because the repository has no authoritative ReqRes business requirement defining whether this operation must reject, update, or upsert a non-existent resource.  
**Conclusion:** This is a domain-level test hypothesis, not a universal HTTP rule. `PUT` semantics do not by themselves require every update to a non-existent URI to return `404`; APIs may define different creation/upsert behavior. The response is therefore documented as an observed behavior pending an explicit contract.

---

## FIND-003 — PUT accepts empty payload

**Classification:** Validation Finding  
**Test Case:** CT003.004  
**Oracle:** Test Hypothesis / Input Validation Best Practices  
**Expected (Hypothesis):** `400 Bad Request` or `422 Unprocessable Entity` if the API contract requires update fields in the request body.  
**Observed:** The API returns `200 OK`, generating an `updatedAt` timestamp for an empty body `{}`.  
**Evidence:** Executing `PUT /api/users/2` with `{}` and a valid API key returns `200 OK`.  
**Impact:** Not assessed because this portfolio has no authoritative business requirement declaring update fields mandatory.  
**Conclusion:** The behavior differs from the validation hypothesis, but it is not a confirmed defect without an explicit contract requiring data fields for the operation.
