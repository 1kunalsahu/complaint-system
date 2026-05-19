# AI-Based Smart Complaint Management System

Complete B.Tech ESE MERN project for the AIML paper: complaint registration, tracking, status update, AI priority detection, department recommendation, automated response, JWT authentication, MongoDB storage, and Render deployment.

## 1. Project Requirements From PDF

The project is based on the case study: **AI-Based Smart Complaint Management System**.

Main modules:

- Complaint Registration Form
- Complaint List Page
- Complaint Status Update Page
- AI Analysis Result Display
- Complaint tracking with category filter and location search
- AI urgency detection, department recommendation, summary, and auto response
- JWT authentication with bcrypt password hashing
- REST APIs using Node.js, Express.js, MongoDB, and Mongoose
- Deployment using GitHub, Render, and MongoDB Atlas

## 2. Folder Structure

```text
smart-complaint-management-system/
  backend/
    src/
      config/db.js
      controllers/
      middleware/
      models/
      routes/
      services/openRouterService.js
      utils/generateToken.js
      app.js
      server.js
    .env.example
    package.json
  frontend/
    src/
      api/
      components/
      context/
      pages/
      utils/
      App.jsx
      main.jsx
      styles.css
    .env.example
    package.json
  docs/
  README.md
```

## 3. Beginner Setup Commands For Windows PowerShell

Open PowerShell in this folder:

```powershell
cd "C:\Users\Kunal\OneDrive\Documents\New project\smart-complaint-management-system"
```

Install all dependencies:

```powershell
npm.cmd install
npm.cmd --prefix backend install
npm.cmd --prefix frontend install
```

Create backend environment file:

```powershell
copy backend\.env.example backend\.env
```

Create frontend environment file:

```powershell
copy frontend\.env.example frontend\.env
```

Run backend:

```powershell
npm.cmd --prefix backend run dev
```

Run frontend in another PowerShell window:

```powershell
npm.cmd --prefix frontend run dev
```

If Vite dev server shows a Windows/OneDrive access error, use the production preview commands:

```powershell
npm.cmd --prefix frontend run build
npm.cmd --prefix frontend run preview
```

Local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## 4. Environment Variables

Backend `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smart_complaints
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=deepseek/deepseek-chat-v3-0324:free
```

Frontend `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## 5. API Endpoints

Authentication:

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/profile`

Complaints:

- `POST /api/complaints`
- `GET /api/complaints`
- `GET /api/complaints/:id`
- `PUT /api/complaints/:id`
- `DELETE /api/complaints/:id`
- `GET /api/complaints/search?location=Ghaziabad`
- `POST /api/complaints/:id/analyze`

AI:

- `POST /api/ai/analyze`

## 6. Sample Complaint Body

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

## 7. MongoDB Atlas Setup

1. Go to MongoDB Atlas and create a free cluster.
2. Create a database user with username and password.
3. Add IP address `0.0.0.0/0` for Render access.
4. Copy the connection string and set it as `MONGO_URI` in Render and local `.env`.
5. Database name can be `smart_complaints`.

If `mongodb+srv` gives `querySrv ECONNREFUSED`, use a direct shard URI with `replicaSet` from the TXT DNS record, for example:

```env
MONGO_URI=mongodb://username:password@ac-xxxxx-shard-00-00.cluster.mongodb.net:27017,ac-xxxxx-shard-00-01.cluster.mongodb.net:27017,ac-xxxxx-shard-00-02.cluster.mongodb.net:27017/smart_complaints?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&retryWrites=true&w=majority
```

## 8. OpenRouter Setup

1. Create an account at OpenRouter.
2. Generate an API key.
3. Add it to `backend/.env`:

```env
OPENROUTER_API_KEY=your_key_here
OPENROUTER_MODEL=deepseek/deepseek-chat-v3-0324:free
```

The backend includes a fallback analyzer, so the project still works for demos if the key is missing.

## 9. GitHub Push Commands

```powershell
git init
git add .
git commit -m "Initial MERN AI complaint management project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/smart-complaint-management-system.git
git push -u origin main
```

## 10. Render Deployment Guide

Backend as Render Web Service:

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables:
  - `PORT=10000`
  - `MONGO_URI=your_atlas_uri`
  - `JWT_SECRET=your_secret`
  - `CLIENT_URL=https://your-frontend.onrender.com`
  - `OPENROUTER_API_KEY=your_key`
  - `OPENROUTER_MODEL=deepseek/deepseek-chat-v3-0324:free`

Frontend as Render Static Site:

- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment Variable:
  - `VITE_API_URL=https://your-backend.onrender.com/api`

React Router rewrite:

- Source: `/*`
- Destination: `/index.html`
- Action: `Rewrite`

## 11. Testing Checklist

- Signup creates user and stores hashed password.
- Login returns JWT token.
- Protected APIs reject requests without token.
- Add complaint stores data in MongoDB.
- Missing title returns validation error.
- Invalid email returns validation error.
- Location search returns matching complaints.
- Status update changes complaint status.
- Admin can add solution remarks to a user complaint.
- Delete complaint removes complaint.
- AI analyzer returns priority, department, summary, and response.
- Frontend form submits successfully.
- Render backend root URL returns running message.
- Render frontend refresh works on all routes.

## 12. Screenshots Checklist

Capture these for the PDF report:

- Signup page
- Login page
- Dashboard
- Complaint Registration Form
- Complaint List Page
- Complaint Status Update Page
- AI Analysis Result Display
- Thunder Client signup request
- Thunder Client login request with token
- Thunder Client add complaint request
- Thunder Client get complaints request
- Thunder Client status update request
- Thunder Client AI analyzer request
- MongoDB Atlas collection data
- Render frontend deployment success
- Render backend deployment success
- Live deployed frontend URL
- Live backend API endpoint response

## 13. PDF Report Structure

Use `docs/REPORT_STRUCTURE.md` for the full report outline.

## 14. Viva Questions

Use `docs/VIVA_QA.md` for ready viva answers.

## 15. Thunder Client Guide

Use `docs/THUNDER_CLIENT_GUIDE.md` for all request bodies and test steps.
