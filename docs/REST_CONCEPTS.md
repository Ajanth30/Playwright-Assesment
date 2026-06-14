# REST Concepts – Session 2

**Student name:** _[Fill in your name]_  
**Date:** _[Fill in date]_

---

## 1. What is REST?

REST (Representational State Transfer) is a style for building web APIs. Clients send **HTTP requests** to **endpoints** (URLs), and servers return **responses** with a **status code** and often a **body** (usually JSON).

---

## 2. HTTP verbs (methods)

| Verb | Purpose | Example in this assessment |
|------|---------|----------------------------|
| **GET** | Read / retrieve data | `GET /users/1` – fetch user by id |
| **POST** | Create new data | `POST /users` – create a user |
| **PUT** | Replace / update a resource | `PUT /users/1` – update user 1 |
| **PATCH** | Partial update | Not heavily used in our tests |
| **DELETE** | Remove a resource | `DELETE /users/11` – delete user |

---

## 3. Parts of a request

| Part | Description | Example |
|------|-------------|---------|
| **Endpoint** | URL path on the server | `https://fakestoreapi.com/users/1` |
| **Headers** | Metadata (content type, auth) | `Content-Type: application/json`, `Authorization: Bearer <token>` |
| **Body** | Data sent with POST/PUT | JSON user object |
| **Query params** | Optional filters on URL | `?limit=5` (not used in our core tests) |

---

## 4. Parts of a response

| Part | Description | Example |
|------|-------------|---------|
| **Status code** | Outcome of the request | `200`, `201`, `400`, `401` |
| **Body** | Returned data | `{ "id": 1, "email": "..." }` |
| **Headers** | Server metadata | `content-type: application/json` |

---

## 5. Common status codes

| Code | Meaning | When we see it in FakeStore API |
|------|---------|--------------------------------|
| **200** | OK – success | GET user, PUT update, DELETE success |
| **201** | Created | POST new user, POST login success |
| **400** | Bad Request | GET `/users/abc` (invalid id format) |
| **401** | Unauthorized | Login with wrong password |
| **404** | Not Found | Some APIs return this for missing ids; FakeStore mock often returns `200` with `null` instead |
| **500** | Server Error | Unexpected server failure |

---

## 6. Authentication in our project

FakeStore provides `POST /auth/login` with username and password. A successful login returns a **JWT token**. Our `utils/auth.ts` helper stores this token and sends it in the `Authorization: Bearer <token>` header for authenticated requests.

**Test credentials used:**
- Username: `johnd`
- Password: `m38rmF$`

---

## 7. How automation maps to manual testing

| Manual (Postman) | Automated (Playwright) |
|------------------|------------------------|
| Set URL and verb | `ApiClient.get()`, `.post()`, etc. |
| Set JSON body | `data: { ... }` in request |
| Check status in Postman | `expect(response.status()).toBe(200)` |
| Check JSON field | `expect(body.id).toBe(1)` |
| Save token from login | `loginAndGetToken()` in `utils/auth.ts` |

---

## 8. Notes on FakeStore API behaviour

FakeStore is a **demo/mock API**. Some responses differ from a strict production API:

- `POST /users` with minimal body may still return **201** (mock accepts many payloads).
- `GET /users/999999` returns **200** with body `null` (not 404).
- `GET /users/abc` returns **400** with an error message.

Our automated tests in `tests/api/users.api.spec.ts` assert the **actual** API behaviour observed during exploration.
