```markdown
# 🔐 Admin Login API Contract

## 📌 Endpoint
```

POST /api/admin/login

````

---

## 📤 Request

### 🔸 Headers:

```http
Content-Type: application/json
````

### 🔸 Body:

```json
{
    "email": "admin@example.com",
    "password": "your_password"
}
```

---

## 📥 Response

### ✅ Success (HTTP 200)

```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
        "id": "12345",
        "name": "Admin Name",
        "email": "admin@example.com"
    }
}
```

### ❌ Failure (HTTP 200 or 401)

```json
{
    "success": false,
    "message": "Invalid email or password"
}
```

---

## 🛡️ Auth Note

-   No token is required for this login request.
-   The returned `token` should be stored (e.g., in `localStorage`) and used in subsequent admin-authenticated requests via:

```http
Authorization: Bearer <token>
```

---

## 📘 Optional Enhancements

-   Return detailed validation errors (e.g., missing fields).
-   Implement rate limiting to protect against brute-force login attempts.

```

```
