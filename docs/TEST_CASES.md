# Test Cases Documentation – UI & API

**Student name:** _[Fill in your name]_  
**Date:** _[Fill in date]_  
**Project:** Playwright Test Automation Assessment

---

## Application Under Test

| Area | URL | Credentials / Notes |
|------|-----|---------------------|
| CURA Healthcare (UI) | https://katalon-demo-cura.herokuapp.com/ | User: `John Doe`, Password: `ThisIsNotAPassword` |
| FakeStore API | https://fakestoreapi.com | Auth: `johnd` / `m38rmF$` |

---

## Part A – CURA Healthcare (UI)

### UI-LOGIN-01 – Positive login (Smoke)

| Field | Detail |
|-------|--------|
| **Priority** | High / Smoke |
| **Precondition** | User is logged out |
| **Steps** | 1. Open CURA homepage 2. Navigate to login (`/profile.php#login`) 3. Enter valid username and password 4. Click Login |
| **Test data** | Username: `John Doe`, Password: `ThisIsNotAPassword` |
| **Expected result** | Logout link visible; URL contains `#appointment` or `profile.php#profile` |
| **Automated file** | `tests/ui/login.spec.ts` |
| **Tag** | `@smoke @ui` |

---

### UI-LOGIN-02 – Negative login (invalid password)

| Field | Detail |
|-------|--------|
| **Priority** | High |
| **Precondition** | User is logged out |
| **Steps** | 1. Open login page 2. Enter valid username + wrong password 3. Click Login |
| **Test data** | Username: `John Doe`, Password: `WrongPassword!` |
| **Expected result** | "Login failed" message shown; Logout link NOT visible |
| **Automated file** | `tests/ui/login.spec.ts` |
| **Tag** | `@ui` |

---

### UI-LOGIN-03 – Negative login (empty credentials)

| Field | Detail |
|-------|--------|
| **Priority** | Medium |
| **Precondition** | User is logged out |
| **Steps** | 1. Open login page 2. Click Login without entering data |
| **Expected result** | Remains on login page; Logout not visible |
| **Automated file** | `tests/ui/login.spec.ts` |
| **Tag** | `@ui` |

---

### UI-APT-01 – Book appointment after login (Smoke)

| Field | Detail |
|-------|--------|
| **Priority** | High / Smoke |
| **Precondition** | User is logged out |
| **Steps** | 1. Click Make Appointment 2. Login with valid credentials 3. Select facility: Hongkong 4. Check readmission 5. Select Medicare 6. Pick date from calendar 7. Enter comment 8. Click Book Appointment |
| **Expected result** | URL: `appointment.php#summary`; heading "Appointment Confirmation"; facility shown on summary |
| **Automated file** | `tests/ui/appointment.spec.ts` |
| **Tag** | `@smoke @ui` |

---

### UI-APT-02 – Invalid appointment date (corner case)

| Field | Detail |
|-------|--------|
| **Priority** | Medium |
| **Precondition** | User is logged in on appointment form |
| **Steps** | 1. Complete login flow 2. Enter invalid date text 3. Click Book |
| **Expected result** | Confirmation page NOT shown; Book button still visible |
| **Automated file** | `tests/e2e/cura-e2e.spec.ts` |
| **Tag** | `@e2e` |

---

## Part B – FakeStore API

### API-01 – GET user by id (Smoke)

| Field | Detail |
|-------|--------|
| **Endpoint** | `GET /users/1` |
| **Expected status** | 200 |
| **Assertions** | `id === 1`, `email` and `username` present |
| **Automated file** | `tests/api/users.api.spec.ts` |
| **Tag** | `@smoke @api` |

---

### API-02 – POST create user

| Field | Detail |
|-------|--------|
| **Endpoint** | `POST /users` |
| **Body** | Valid JSON with email, username, password, name |
| **Expected status** | 201 |
| **Assertions** | `id > 0` |
| **Automated file** | `tests/api/users.api.spec.ts` |

---

### API-03 – PUT update user

| Field | Detail |
|-------|--------|
| **Endpoint** | `PUT /users/1` |
| **Expected status** | 200 |
| **Assertions** | Updated `email` in response |
| **Automated file** | `tests/api/users.api.spec.ts` |

---

### API-04 – DELETE user

| Field | Detail |
|-------|--------|
| **Endpoint** | `DELETE /users/:id` |
| **Expected status** | 200 |
| **Assertions** | Returned `id` matches deleted user |
| **Automated file** | `tests/api/users.api.spec.ts` |

---

### API-05 – Auth login (positive)

| Field | Detail |
|-------|--------|
| **Endpoint** | `POST /auth/login` |
| **Body** | `{ "username": "johnd", "password": "m38rmF$" }` |
| **Expected status** | 201 |
| **Assertions** | JWT `token` returned |
| **Automated file** | `utils/auth.ts`, `tests/api/users.api.spec.ts` |

---

### API-06 – Auth login (negative)

| Field | Detail |
|-------|--------|
| **Endpoint** | `POST /auth/login` |
| **Body** | Wrong password |
| **Expected status** | 401 |
| **Automated file** | `tests/api/users.api.spec.ts` |

---

### API-07 – GET invalid user id format

| Field | Detail |
|-------|--------|
| **Endpoint** | `GET /users/abc` |
| **Expected status** | 400 |
| **Automated file** | `tests/api/users.datadriven.spec.ts` |

---

### API-08 – Data-driven tests

| Field | Detail |
|-------|--------|
| **Data source** | `fixtures/users-positive.json`, `fixtures/users-negative.json` |
| **Purpose** | Run same logic with multiple data rows |
| **Automated file** | `tests/api/users.datadriven.spec.ts` |

---

## Part C – E2E (UI + API)

### E2E-01 – Verify API user then book CURA appointment (Smoke)

| Field | Detail |
|-------|--------|
| **Steps** | 1. API: GET `/users/1` and verify id 2. UI: Login to CURA 3. Book appointment 4. Verify confirmation |
| **Expected result** | API returns user id 1; UI shows Appointment Confirmation |
| **Automated file** | `tests/e2e/cura-e2e.spec.ts` |
| **Tag** | `@smoke @e2e` |

---

## Test tags summary

| Tag | Command | Tests included |
|-----|---------|----------------|
| `@smoke` | `npm run test:smoke` | Critical login, appointment, API GET, E2E |
| `@ui` | `npm run test:ui` | All CURA UI tests |
| `@api` | `npm run test:api` | All FakeStore API tests |
| `@e2e` | `npm run test:e2e` | Combined UI + API flows |

---

## Related documentation

| Document | Purpose |
|----------|---------|
| `REST_CONCEPTS.md` | REST theory for Session 2 |
| `POSTMAN_MANUAL_EXPLORATION.md` | Manual Postman requests |
| `RECORD_AND_PLAYBACK_EVALUATION.md` | Codegen pros/cons |
| `SUBMISSION_GUIDE.md` | Screenshot & video step-by-step |
