# Viva Questions And Answers

## 1. What is the title of your project?

The title is AI-Based Smart Complaint Management System.

## 2. What problem does your project solve?

It allows citizens to register complaints online, track their status, and use AI to detect priority, recommend the department, summarize the complaint, and generate a response.

## 3. Which technologies did you use?

Frontend uses React, Vite, Tailwind CSS, Axios, and React Router DOM. Backend uses Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, and OpenRouter API.

## 4. Why did you use MongoDB?

MongoDB stores complaint and user data in flexible JSON-like documents, which works well with Node.js and Mongoose.

## 5. What is Mongoose?

Mongoose is an ODM library that provides schemas, validation, models, and query methods for MongoDB.

## 6. What is JWT authentication?

JWT authentication creates a signed token after login. The frontend sends this token in the Authorization header to access protected routes.

## 7. How is the password secured?

Passwords are hashed with bcryptjs before being stored in MongoDB. The original password is never stored.

## 8. What are protected routes?

Protected routes are backend APIs or frontend pages that require a valid JWT token before access is allowed.

## 9. Which AI features are implemented?

The system detects complaint urgency, recommends the responsible department, summarizes the complaint, and generates an automatic user response.

## 10. What is OpenRouter?

OpenRouter is an API platform that provides access to AI models through a chat completions API.

## 11. What happens if the OpenRouter API key is missing?

The backend uses a fallback rule-based analyzer so the project can still run during local demos.

## 12. What are the main complaint APIs?

The main APIs are add complaint, get complaints, search by location, update status, delete complaint, and analyze complaint.

## 13. How do you validate data?

The backend uses express-validator and Mongoose schema validation for fields like title, email, description, category, and location.

## 14. How does the frontend communicate with the backend?

The frontend uses Axios. An interceptor automatically attaches the JWT token to protected API requests.

## 15. Why did you use React Router DOM?

React Router DOM provides client-side routing for pages such as login, signup, dashboard, complaint list, complaint details, and AI analyzer.

## 16. How is deployment done?

The backend is deployed as a Render Web Service. The frontend is deployed as a Render Static Site. MongoDB Atlas is used for the cloud database.

## 17. Why is a rewrite needed on Render frontend?

React Router handles routes in the browser, so Render must rewrite all frontend paths to `/index.html`.

## 18. What is CORS?

CORS controls which frontend domains can access the backend API. The backend uses the `CLIENT_URL` environment variable.

## 19. What is the difference between signup and login?

Signup creates a new user and hashes the password. Login verifies the email and password and returns a JWT token.

## 20. What future improvements can be added?

Future improvements include role-based admin approval, file upload for complaint images, email notifications, analytics charts, and department-wise dashboards.
