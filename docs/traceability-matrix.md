# Traceability Matrix

This matrix maps the documented test cases to their implementation in the Postman collection and highlights any findings logged against the observed behavior.

| Test Case | Method | Collection Request | Oracle | Finding | Automation Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CT001.001** | GET | `CT001.001 - Retrieve existing user by ID` | API Documentation | - | Automated |
| **CT001.002** | GET | `CT001.002 - Retrieve non-existent user by ID` | HTTP Semantics | - | Automated |
| **CT001.003** | GET | `CT001.003 - Retrieve user without authentication` | API Security | - | Automated |
| **CT002.001** | POST | `CT002.001 - Create user with valid data` | API Documentation | - | Automated |
| **CT002.002** | POST | `CT002.002 - Create user without authentication` | API Security | - | Automated |
| **CT002.003** | POST | `CT002.003 - Create user with empty body payload` | Test Hypothesis | FIND-001 | Automated |
| **CT003.001** | PUT | `CT003.001 - Update existing user with valid data` | API Documentation | - | Automated |
| **CT003.002** | PUT | `CT003.002 - Update existing user without authentication` | API Security | - | Automated |
| **CT003.003** | PUT | `CT003.003 - Update user with non-existent ID` | Test Hypothesis / API Domain Expectation | FIND-002 | Automated |
| **CT003.004** | PUT | `CT003.004 - Update existing user with empty body payload` | Test Hypothesis | FIND-003 | Automated |
