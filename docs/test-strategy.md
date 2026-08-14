# Test Strategy - ReqRes API QA Portfolio

This document defines the testing strategy for the ReqRes API QA portfolio, including scope, test techniques, test data, oracles, environment assumptions, risks, and automation boundaries.

## 1. Scope

The project focuses on functional API testing of the classic **Users** endpoints exposed by ReqRes:

- `GET /api/users/{id}`
- `POST /api/users`
- `PUT /api/users/{id}`

The suite is designed as an independent QA portfolio: each case should be understandable and executable without relying on state created by a previous test.

## 2. Out of Scope

The following are intentionally outside this portfolio's scope:

- Performance testing (load, stress, spike).
- Penetration/security testing beyond basic authentication behavior.
- UI testing.
- Database validation.
- Other ReqRes endpoint families such as login/register.
- Cross-request persistence guarantees that are not part of this project's documented contract.

## 3. Test Approach

The test design uses:

- **Positive Testing:** Valid inputs and expected successful responses.
- **Negative Testing:** Missing authentication and IDs outside the dataset used by the test.
- **Authentication Testing:** Comparison of published `x-api-key` requirements with observed unauthorized/authorized responses.
- **Validation / Edge Cases:** Empty payloads and update requests targeting IDs treated as non-existent by the test dataset.
- **Contract-Oriented Assertions:** Status codes and response fields are asserted only when supported by the documented or currently established behavior used by the portfolio.
- **Exploratory Findings:** Differences between a QA hypothesis and observed behavior are documented separately instead of being automatically labeled as confirmed defects.
- **Published Contract Divergence:** When ReqRes documentation states a behavior explicitly and execution contradicts it, the difference is tracked separately from hypothesis-based findings.

## 4. Test Environment

Tests execute against the external ReqRes service at `https://reqres.in`.

Authenticated scenarios require a valid `x-api-key`. The API key is injected at execution time through a local `.env` file or the GitHub Actions secret `REQRES_API_KEY`; it is never stored in the collection or committed to the repository.

The official ReqRes documentation currently states that requests require `x-api-key`. During CI validation on 2026-08-14, however, `GET /api/users/2` returned `200 OK` without the header while POST and PUT negative-authentication cases returned `401 Unauthorized`. This is tracked as `FIND-004` rather than silently weakening the published authentication expectation.

## 5. Test Data

Static data is intentionally used to keep the examples deterministic and easy to review:

- **Known user ID:** `2`, used by the positive GET/PUT scenarios.
- **Non-existent candidate ID for GET:** `23`, used by the negative GET scenario based on the dataset behavior exercised by this portfolio.
- **Non-existent candidate ID for PUT:** `999`, used to explore the service's behavior for an update target outside the dataset used by the test.

The documentation avoids claiming knowledge of an internal database. These IDs describe the externally observable dataset used by the tests.

## 6. Test Oracles

The project distinguishes the source of each expectation:

- **API Documentation / Published Contract:** Behavior explicitly documented for the endpoint or authentication mechanism.
- **Observed Contract:** Repeatable behavior used as a regression expectation when appropriate and clearly identified as such.
- **Published Contract vs. Observed Behavior:** A documented requirement contradicted by a reproducible response; tracked as a contract divergence.
- **HTTP Semantics:** Protocol-level meaning of methods/status codes where relevant. HTTP semantics are not used as a substitute for missing business rules.
- **Test Hypothesis / Domain Expectation:** A reasonable QA assumption that requires a product/API contract before it can be called a requirement. Divergences are recorded as Validation Findings, not automatically as defects.

For example, a `PUT` to an ID treated as non-existent may reasonably prompt a `404` hypothesis, but HTTP alone does not require every API to reject that operation; an API may define create/upsert behavior. The project therefore documents the expectation as a domain hypothesis rather than a universal protocol rule.

## 7. Automation Principles

- A missing or invalid API key must never produce a false-green pipeline.
- Authentication/configuration failures return a non-zero test result.
- Tests should not depend on execution order or data produced by earlier cases.
- Known behavioral findings may assert the current observed behavior for regression visibility, while the documentation preserves the original hypothesis or published expectation.
- If ReqRes changes a known finding so that the automated observed-behavior assertion no longer matches, CI should fail and the finding must be reviewed/closed.
- A changed response that no longer matches the automated expectation should fail and require investigation; assertions must not be weakened merely to keep CI green.

## 8. Risks and Limitations

- **Third-party environment:** ReqRes is external to this repository and may change behavior, authentication requirements, or availability without notice.
- **Credential dependency:** Authenticated tests require a valid API key configured outside source control.
- **Network dependency:** CI and local executions depend on access to the external service.
- **Dataset assumptions:** IDs used by the examples reflect the externally observable dataset at the time the portfolio is maintained; if that dataset changes, the cases must be reviewed.
- **No authoritative business requirements for hypothesis cases:** For exploratory edge cases, the portfolio can state a hypothesis and observed behavior but cannot confirm a business defect without an explicit contract.
