# Food App

This repository contains a MERN-style food reels app with separate `backend/` and `frontend/` folders.

## Overview
- Backend: `backend/` (Express, MongoDB)
- Frontend: `frontend/` (React + Vite)

## Ready-for-deployment notes
- Backend reads allowed CORS origins from `ALLOWED_ORIGINS` (comma-separated).
- Frontend uses `VITE_API_BASE_URL` at build/runtime. In development the Vite proxy forwards `/api` to `http://127.0.0.1:3000`.
- Auth token is stored in an httpOnly cookie; cookie options change depending on `NODE_ENV`.

## Local quickstart
1. Start MongoDB locally.
2. Create `.env` in `backend/` (see `backend/.env.example`).
3. Run backend:

```bash
cd backend
npm install
npm start
```

4. Run frontend:

```bash
cd frontend
npm install
npm run dev
# open http://127.0.0.1:5173
```

## Build frontend

```bash
cd frontend
npm run build
# built files in frontend/dist
```

## Deploy backend to Render
1. Create a new Web Service on Render and connect your GitHub repository.
2. Set the following environment variables on Render:
   - `MONGO_URI` (your MongoDB connection string)
   - `JWT_SECRET` (a secure random secret)
   - `ALLOWED_ORIGINS` (comma-separated list, include your Vercel frontend URL, e.g. `https://your-frontend.vercel.app`)
   - `NODE_ENV=production`
3. Render will run `npm install` and use the `start` script from `backend/package.json` to launch the server. Ensure the service's Root directory is set to `backend`.

## Deploy frontend to Vercel
1. In Vercel, import the project from GitHub and set the "Root Directory" to `frontend`.
2. Set build command: `npm run build` and output directory: `dist`.
3. Set environment variable on Vercel:
   - `VITE_API_BASE_URL=https://<your-backend-render-url>`

## Important CORS note
- Set `ALLOWED_ORIGINS` on the backend to include the Vercel frontend domain. The backend sets `Access-Control-Allow-Credentials: true` and issues an httpOnly cookie for auth. Ensure both services use HTTPS in production so `secure` cookies are set.

## Push repository to GitHub (example)
Run these commands from the repository root (replace the remote URL with your own):

```bash
git init
git add .
git commit -m "Initial commit: prepare for deployment"
git branch -M main
git remote add origin https://github.com/skhrithik861/food-app.git
git push -u origin main
```

If you already have the repo, simply add the remote and push:

```bash
git remote add origin https://github.com/skhrithik861/food-app.git
git push -u origin main
```

## Next steps I can help with
- Create a CI workflow (GitHub Actions) to build frontend and run backend tests.
- Add `helmet` and `compression` to the backend for production hardening.
- Help configure Render and Vercel settings interactively.
