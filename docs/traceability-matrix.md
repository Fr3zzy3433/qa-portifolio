# Traceability Matrix

This matrix maps each documented test case to its Postman implementation, primary oracle, associated finding (when applicable), and automation status.

| Test Case | Method | Collection Request | Primary Oracle | Finding | Automation Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CT001.001** | GET | `CT001.001 - Retrieve existing user by ID` | API Documentation / Published Contract | - | Automated |
| **CT001.002** | GET | `CT001.002 - Retrieve non-existent user by ID` | API Documentation / Observed Contract | - | Automated |
| **CT001.003** | GET | `CT001.003 - Retrieve user without authentication` | API Security / Published Contract | - | Automated |
| **CT002.001** | POST | `CT002.001 - Create user with valid data` | API Documentation / Published Contract | - | Automated |
| **CT002.002** | POST | `CT002.002 - Create user without authentication` | API Security / Published Contract | - | Automated |
| **CT002.003** | POST | `CT002.003 - Create user with empty body payload` | Test Hypothesis / Input Validation Expectation | FIND-001 | Automated |
| **CT003.001** | PUT | `CT003.001 - Update existing user with valid data` | API Documentation / Published Contract | - | Automated |
| **CT003.002** | PUT | `CT003.002 - Update existing user without authentication` | API Security / Published Contract | - | Automated |
| **CT003.003** | PUT | `CT003.003 - Update user with non-existent ID` | Test Hypothesis / API Domain Expectation | FIND-002 | Automated |
| **CT003.004** | PUT | `CT003.004 - Update existing user with empty body payload` | Test Hypothesis / Input Validation Expectation | FIND-003 | Automated |
