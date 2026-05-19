# PDF Report Structure

## 1. Cover Page

- Project title: AI-Based Smart Complaint Management System
- Student name
- Roll number
- Branch and semester
- Subject: AI Driven Full Stack Development
- Course code: AI308B
- Faculty name
- College name

## 2. Certificate

Write a short certificate stating that the project was completed as part of the B.Tech ESE examination.

## 3. Acknowledgement

Thank your faculty, department, and college.

## 4. Abstract

Explain that the system allows online complaint registration, complaint tracking, AI-based analysis, secure authentication, and deployment.

## 5. Introduction

Describe the need for digital complaint systems and how AI can improve complaint handling.

## 6. Problem Statement

Manual complaint systems are slow, difficult to track, and do not automatically identify priority or responsible department.

## 7. Objectives

- Build a MERN stack complaint management system.
- Allow users to register complaints.
- Allow tracking and status updates.
- Use AI for priority detection and department recommendation.
- Secure the system with JWT and bcrypt.
- Deploy the system on Render.

## 8. Technology Stack

Frontend:

- React + Vite
- Tailwind CSS
- Axios
- React Router DOM

Backend:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

AI:

- OpenRouter API

Deployment:

- GitHub
- Render
- MongoDB Atlas

## 9. System Architecture

Add a diagram:

```text
React Frontend -> Express API -> MongoDB Atlas
                       |
                       v
                 OpenRouter API
```

## 10. Database Design

Add User schema fields:

- name
- email
- password
- role

Add Complaint schema fields:

- user
- name
- email
- title
- description
- category
- location
- status
- aiAnalysis.urgency
- aiAnalysis.department
- aiAnalysis.summary
- aiAnalysis.response
- createdAt
- updatedAt

## 11. API Design

Add all API endpoints from the README.

## 12. Implementation Screenshots

Add screenshots for:

- Signup
- Login
- Dashboard
- Complaint form
- Complaint list
- Complaint detail and status update
- AI analyzer result

## 13. Backend Testing Screenshots

Add Thunder Client screenshots for:

- Signup
- Login
- Add complaint
- Get complaints
- Search by location
- Update status
- AI analyzer
- Delete complaint

## 14. MongoDB Screenshots

Show:

- Users collection
- Complaints collection
- Hashed password
- Complaint with AI analysis

## 15. Deployment Screenshots

Show:

- GitHub repository
- Render backend success
- Render frontend success
- Live frontend URL
- Live backend API URL

## 16. Test Cases

| Test Case | Expected Output |
| --- | --- |
| Add valid complaint | Complaint stored successfully |
| Missing title field | Validation error |
| Invalid email | Error message |
| Filter by location | Matching complaints displayed |
| Valid login | Token generated |
| Invalid password | Unauthorized error |
| Access without token | Access denied |
| Stored password | Encrypted format |
| Water leakage | Water department suggestion |
| Electricity issue | High priority alert |
| Garbage complaint | Sanitation department |
| Long complaint text | AI-generated summary |

## 17. Conclusion

The project successfully implements a full-stack AI-based complaint management system with secure authentication, MongoDB storage, AI analysis, and deployment readiness.

## 18. Future Scope

- Admin-only role permissions
- Image upload
- Email or SMS notifications
- Analytics charts
- Department login
- Complaint escalation system
