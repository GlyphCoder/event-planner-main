# Event Planner

A full-stack event planning application (frontend + backend). This README explains how to run the project locally, what environment variables you need for the backend and frontend, and common start/build commands.

> NOTE: Do NOT commit real secrets (API keys, JWT secrets, DB URIs) to your repository. Use a .env file (and add it to .gitignore) or your platform's secret manager.

## Table of contents
- Project structure (typical)
- Prerequisites
- Backend — env variables and start commands
- Frontend — env variables and start commands
- Running locally (dev / prod)
- Building for production
- Security notes
- Contributing

## Typical project structure
This repository commonly uses a two-folder structure:

- /backend — Node.js / Express API (or similar)
- /frontend — React / Next.js / Vue app (or similar)
- .gitignore
- README.md

Adjust paths below if your repo structure differs.

## Prerequisites
- Node.js (v16+ recommended)
- npm (or yarn / pnpm)
- MongoDB instance (Atlas or local) or other configured DB
- (Optional) Cloudinary account for image uploads

## Backend

1. Copy the example environment file to create your real .env:
   - cp backend/.env.example backend/.env

2. Install and run:
   - cd backend
   - npm install
   - npm run dev   # for development (requires nodemon)
   - npm start     # for production

3. Common package.json scripts you may have:
   - "start": "node dist/index.js"
   - "dev": "nodemon src/index.js"
   - "build": "tsc" (if using TypeScript)

### Backend environment variables
Create backend/.env (not committed). Example variables the backend expects:

PORT=3000
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/<dbname>?retryWrites=true&w=majority"

Replace <username>, <password>, and <dbname> with your credentials and DB name. Use the secure credentials store in production.

(If you use the example you provided, replace the placeholders appropriately. Do not commit secrets.)

## Frontend

1. Install and run:
   - cd frontend
   - npm install
   - npm run dev   # typical for frameworks like Vite/Next in dev mode
   - npm run build # build for production
   - npm run start # serve production build (if configured)

2. Frontend environment variables
Frontend frameworks typically use prefixed variables (e.g., REACT_APP_, NEXT_PUBLIC_).
Example (frontend/.env.local):
REACT_APP_API_BASE_URL=http://localhost:3000/api
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name

Make sure variables used by the client are safe to expose (do not put secrets like DB credentials or private JWT secrets in client envs).

## Running locally — summary

Start backend:
- cd backend
- cp .env.example .env
- edit .env to set the real values
- npm install
- npm run dev

Start frontend:
- cd frontend
- npm install
- update frontend/.env.local or .env
- npm run dev

Open the frontend at http://localhost:3000 (or as your frontend dev server prints). The backend usually runs at http://localhost:3000 (or as set in PORT).

## Building for production

- Backend: build/transpile (if TS) then run `npm start`. Ensure environment variables are set in the hosting environment.
- Frontend: run `npm run build` and deploy the static files to a static host (Vercel, Netlify, or a CDN + server).

## Deployment tips
- Use environment variable management on your host (Heroku, Vercel, Railway, Render, DigitalOcean) — do not check secrets into Git.
- Use HTTPS for API endpoints.
- Enable proper CORS settings on backend.
- Rotate secrets and keys regularly.

## Security notes
- Never commit .env files or secrets to your repo.
- Add `.env` and any local secret files to `.gitignore`.
- Use strong, randomly generated JWT secrets.
- Use role-based access or scopes for protected endpoints and validate input to avoid injections.

## Troubleshooting
- If you get a DB connection error, confirm MONGO_URI and network access (Atlas IP whitelist or VPC).
- If Cloudinary uploads fail, verify cloud name, API key, and secret.
- For CORS errors, ensure backend allows the frontend origin in dev and production.

## Contributing
- Fork the repository, create a feature branch, and open a pull request.
- Describe changes and add tests where relevant.

## License
Add your project license here (e.g., MIT).

---

If you'd like, I can:
- Generate a ready-to-commit backend/.env.example file for your repo,
- Or open a PR that adds the README and .env.example to the repository (I will only do that if you ask and provide permission).
