# ReqRes API Test Findings

This document records observations and differences between explicit API expectations, test hypotheses, and the actual behavior observed during execution.

Because ReqRes is an external testing API and this portfolio does not own its business requirements, hypothesis-based behaviors are classified as **Validation Findings** rather than confirmed defects. When an observed response contradicts ReqRes's published documentation, the finding is identified separately as a **Published Contract Divergence**.

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
**Conclusion:** This is a domain-level test hypothesis, not a universal HTTP rule. The response is documented as observed behavior pending an explicit contract.

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

---

## FIND-004 — GET user succeeds without `x-api-key`

**Classification:** Published Contract Divergence  
**Test Case:** CT001.003  
**Oracle:** ReqRes Published Authentication Contract  
**Published Expectation:** ReqRes documentation states that requests to `reqres.in` require an `x-api-key` header and specifically documents `/api/users` requests with that header.  
**Observed:** `GET /api/users/2` without `x-api-key` returns `200 OK` and the user payload, while the authenticated negative POST and PUT scenarios in the same suite return `401 Unauthorized` when the key is omitted.  
**Evidence:** CI execution on 2026-08-14 returned `200 OK` for CT001.003 without the header.  
**Reference:** https://reqres.in/docs  
**Impact:** Authentication enforcement is inconsistent across the exercised classic `/api/users` methods.  
**Conclusion:** Unlike FIND-001 through FIND-003, this is not merely a QA hypothesis: it is a reproducible difference between published authentication guidance and observed behavior. The automated case asserts the current observed `200` behavior so the portfolio pipeline remains deterministic; if ReqRes changes the endpoint to enforce the published contract, the test will fail and the finding must be reviewed/closed.
