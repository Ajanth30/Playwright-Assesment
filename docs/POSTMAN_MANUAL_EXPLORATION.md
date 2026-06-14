# Step 1 – Manual API Exploration (Postman)

**Student name:** _[Fill in your name]_  
**Date:** _[Fill in date]_  
**API base URL:** `https://fakestoreapi.com`

> **Important:** Run each request yourself in Postman and replace the screenshot placeholders below with your own captures. The response values below are examples from real API calls — your `id` values may differ slightly after POST/DELETE.

---

## Checklist before you start

- [ ] Postman installed
- [ ] OpenAPI/spec imported from https://fakestoreapi.com/docs
- [ ] New Postman collection created: `Playwright Assessment – FakeStore`

---

## Request 1 – GET user by id

| Field | Value |
|-------|-------|
| **Verb** | GET |
| **URL** | `https://fakestoreapi.com/users/1` |
| **Headers** | None required |
| **Body** | None |

**Recorded response:**

| Field | Value |
|-------|-------|
| **Status code** | `200 OK` |
| **Key fields in body** | `id`, `email`, `username`, `name`, `address`, `phone` |

**Sample response (truncated):**
```json
{
  "id": 1,
  "email": "john@gmail.com",
  "username": "johnd",
  "name": { "firstname": "john", "lastname": "doe" }
}
```

**Assertion to automate:** Status is 200; `id` equals 1; `email` is not empty.  
**Automated test:** `tests/api/users.api.spec.ts` → `@smoke @api GET user by id`

**Screenshot to take:** `screenshots/postman_01_get_user.png`  
_Show: URL bar, GET method, status 200, JSON body with id and email._

---

## Request 2 – POST create user (valid body)

| Field | Value |
|-------|-------|
| **Verb** | POST |
| **URL** | `https://fakestoreapi.com/users` |
| **Headers** | `Content-Type: application/json` |
| **Body (raw JSON)** | See below |

```json
{
  "email": "manual.test@example.com",
  "username": "manual_test",
  "password": "Pass123",
  "name": { "firstname": "Manual", "lastname": "Test" }
}
```

**Recorded response:**

| Field | Value |
|-------|-------|
| **Status code** | `201 Created` |
| **Key fields** | `id` (new numeric id) |

**Sample response:**
```json
{ "id": 11 }
```

**Assertion to automate:** Status is 201; `id` > 0.  
**Automated test:** `tests/api/users.api.spec.ts` → `POST create user`

**Screenshot to take:** `screenshots/postman_02_post_user_valid.png`  
_Show: POST method, JSON body, status 201, response id._

---

## Request 3 – POST with invalid / minimal body

| Field | Value |
|-------|-------|
| **Verb** | POST |
| **URL** | `https://fakestoreapi.com/users` |
| **Body** | `{ "username": "only_username" }` |

**Recorded response (FakeStore mock behaviour):**

| Field | Value |
|-------|-------|
| **Status code** | `201 Created` *(mock API — does not validate strictly)* |
| **Body** | `{ "id": 1 }` |

**Note for assessor:** A real production API would likely return `400 Bad Request`. FakeStore is a demo API and often accepts incomplete bodies. Our negative tests use other scenarios that do fail, e.g. invalid user id format (`GET /users/abc` → 400) and wrong login (`401`).

**Screenshot to take:** `screenshots/postman_03_post_user_invalid.png`  
_Show: minimal/invalid body and the status code you received._

---

## Request 4 – GET invalid user id format

| Field | Value |
|-------|-------|
| **Verb** | GET |
| **URL** | `https://fakestoreapi.com/users/abc` |

**Recorded response:**

| Field | Value |
|-------|-------|
| **Status code** | `400 Bad Request` |
| **Body** | `{ "status": "error", "message": "user id should be provided" }` |

**Assertion to automate:** Status is 400.  
**Automated test:** `tests/api/users.datadriven.spec.ts` → `invalid-user-id-format`

**Screenshot to take:** `screenshots/postman_04_get_invalid_id.png`

---

## Request 5 – POST login (authentication)

| Field | Value |
|-------|-------|
| **Verb** | POST |
| **URL** | `https://fakestoreapi.com/auth/login` |
| **Body** | `{ "username": "johnd", "password": "m38rmF$" }` |

**Recorded response:**

| Field | Value |
|-------|-------|
| **Status code** | `201 Created` |
| **Key field** | `token` (JWT string) |

**Assertion to automate:** Token length > 10 characters.  
**Automated test:** `utils/auth.ts` + `tests/api/users.api.spec.ts` → authentication login

**Screenshot to take:** `screenshots/postman_05_auth_login_success.png`

---

## Request 6 – POST login (wrong password)

| Field | Value |
|-------|-------|
| **Verb** | POST |
| **URL** | `https://fakestoreapi.com/auth/login` |
| **Body** | `{ "username": "johnd", "password": "wrong-password" }` |

**Recorded response:**

| Field | Value |
|-------|-------|
| **Status code** | `401 Unauthorized` |
| **Body** | `username or password is incorrect` |

**Screenshot to take:** `screenshots/postman_06_auth_login_fail.png`

---

## Request 7 – DELETE user

| Field | Value |
|-------|-------|
| **Verb** | DELETE |
| **URL** | `https://fakestoreapi.com/users/11` *(use id from your POST in Request 2)* |

**Recorded response:**

| Field | Value |
|-------|-------|
| **Status code** | `200 OK` |
| **Body** | `{ "id": 11 }` |

**Assertion to automate:** Deleted `id` matches created id.  
**Automated test:** `tests/api/users.api.spec.ts` → `DELETE user`

**Screenshot to take:** `screenshots/postman_07_delete_user.png`

---

## Summary table (fill after your Postman run)

| # | Verb | Endpoint | Status | One assertion |
|---|------|----------|--------|---------------|
| 1 | GET | /users/1 | 200 | `id` and `email` present |
| 2 | POST | /users (valid) | 201 | `id` returned |
| 3 | POST | /users (minimal) | 201* | Mock API behaviour noted |
| 4 | GET | /users/abc | 400 | Error message present |
| 5 | POST | /auth/login (valid) | 201 | `token` present |
| 6 | POST | /auth/login (invalid) | 401 | Error message |
| 7 | DELETE | /users/:id | 200 | `id` in response |

---

## OpenAPI import evidence

**Screenshot to take:** `screenshots/postman_00_openapi_import.png`  
_Show: FakeStore collection or imported endpoints visible in Postman sidebar._
