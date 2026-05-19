# Render Deployment Steps

GitHub repository:

```text
https://github.com/1kunalsahu/complaint-system
```

Render runs on Linux, so use `npm`, not `npm.cmd`, in Render settings.

## Fastest Option: Render Blueprint

The repo includes `render.yaml`, so you can deploy both services together.

1. Render Dashboard > `New` > `Blueprint`
2. Select repo: `1kunalsahu/complaint-system`
3. Render will detect `render.yaml`
4. Fill prompted secret values:
   - `MONGO_URI`
   - `CLIENT_URL`
   - `FRONTEND_URL`
   - `OPENROUTER_API_KEY`
   - `VITE_API_URL`

Use temporary values first if Render asks before URLs are generated:

```env
CLIENT_URL=https://complaint-system-frontend.onrender.com
FRONTEND_URL=https://complaint-system-frontend.onrender.com
VITE_API_URL=https://complaint-system-backend.onrender.com/api
```

After deployment, confirm the actual frontend/backend URLs in Render. If Render changes service names, update these environment variables and redeploy.

## Backend Web Service

Create: `New` > `Web Service`

- Repository: `1kunalsahu/complaint-system`
- Branch: `main`
- Root Directory: `backend`
- Runtime: `Node`
- Build Command: `npm install`
- Start Command: `npm start`

Environment variables:

```env
PORT=10000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=https://your-frontend-name.onrender.com
FRONTEND_URL=https://your-frontend-name.onrender.com
OPENROUTER_API_KEY=your_openrouter_key
OPENROUTER_MODEL=openrouter/free
```

After deploy, test:

```text
https://your-backend-name.onrender.com/
```

Expected:

```json
{
  "message": "AI-Based Smart Complaint Management System API",
  "status": "Running"
}
```

## Frontend Static Site

Create: `New` > `Static Site`

- Repository: `1kunalsahu/complaint-system`
- Branch: `main`
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

Environment variable:

```env
VITE_API_URL=https://your-backend-name.onrender.com/api
```

Add React Router rewrite:

```text
Source: /*
Destination: /index.html
Action: Rewrite
```

After frontend URL is created, update backend environment:

```env
CLIENT_URL=https://your-frontend-name.onrender.com
FRONTEND_URL=https://your-frontend-name.onrender.com
```

Then redeploy backend.
