# Thunder Client Testing Guide

Base URL:

```text
http://localhost:5000
```

After login/signup, copy the `token` and add this header for protected requests:

```text
Authorization: Bearer YOUR_TOKEN
```

## 1. Signup

Method: `POST`

URL:

```text
http://localhost:5000/api/auth/signup
```

Body:

```json
{
  "name": "Kunal Student",
  "email": "kunal@example.com",
  "password": "123456",
  "role": "admin"
}
```

Expected output: token generated and user returned.

## 2. Login

Method: `POST`

URL:

```text
http://localhost:5000/api/auth/login
```

Body:

```json
{
  "email": "kunal@example.com",
  "password": "123456"
}
```

Expected output: token generated.

## 3. Add Complaint

Method: `POST`

URL:

```text
http://localhost:5000/api/complaints
```

Body:

```json
{
  "name": "Rahul Kumar",
  "email": "rahul@gmail.com",
  "title": "Water Leakage Issue",
  "description": "Water pipeline damaged near market area.",
  "category": "Water Supply",
  "location": "Ghaziabad",
  "status": "Pending"
}
```

Expected output: `Complaint stored successfully`.

## 4. Missing Title Validation Test

Method: `POST`

URL:

```text
http://localhost:5000/api/complaints
```

Body:

```json
{
  "name": "Rahul Kumar",
  "email": "rahul@gmail.com",
  "description": "Water pipeline damaged near market area.",
  "category": "Water Supply",
  "location": "Ghaziabad"
}
```

Expected output: validation error for complaint title.

## 5. Invalid Email Test

Method: `POST`

URL:

```text
http://localhost:5000/api/complaints
```

Body:

```json
{
  "name": "Rahul Kumar",
  "email": "wrong-email",
  "title": "Water Leakage Issue",
  "description": "Water pipeline damaged near market area.",
  "category": "Water Supply",
  "location": "Ghaziabad"
}
```

Expected output: valid email validation error.

## 6. Get All Complaints

Method: `GET`

URL:

```text
http://localhost:5000/api/complaints
```

Expected output: list of complaints.

## 7. Filter Complaints

Method: `GET`

URL:

```text
http://localhost:5000/api/complaints?category=Water&status=Pending
```

Expected output: matching complaints.

## 8. Search By Location

Method: `GET`

URL:

```text
http://localhost:5000/api/complaints/search?location=Ghaziabad
```

Expected output: complaints from Ghaziabad.

## 9. Update Complaint Status

Method: `PUT`

URL:

```text
http://localhost:5000/api/complaints/COMPLAINT_ID
```

Body:

```json
{
  "status": "In Progress"
}
```

Expected output: status updated.

Admin can also add solution remarks:

```json
{
  "status": "Resolved",
  "resolutionNote": "Water pipeline repair team visited the location and fixed the damaged pipeline."
}
```

Expected output: status and admin solution saved.

## 10. AI Complaint Analyzer

Method: `POST`

URL:

```text
http://localhost:5000/api/ai/analyze
```

Body:

```json
{
  "title": "Electricity wire sparking",
  "description": "An electric wire is sparking near the school gate and may cause an accident.",
  "category": "Electricity",
  "location": "Ghaziabad"
}
```

Expected output: high or critical priority, Electricity Department, summary, and response.

## 11. Analyze Existing Complaint

Method: `POST`

URL:

```text
http://localhost:5000/api/complaints/COMPLAINT_ID/analyze
```

Expected output: complaint updated with AI analysis.

## 12. Delete Complaint

Method: `DELETE`

URL:

```text
http://localhost:5000/api/complaints/COMPLAINT_ID
```

Expected output: complaint removed successfully.
