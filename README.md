# Event Planner - AI-Powered Event Management Platform

A comprehensive full-stack event planning application with AI-powered features including automated storybook generation, social media content creation, and intelligent vendor matching. Built with Node.js, Express, MongoDB, and Google Gemini AI.

## 🚀 Key Features

### AI-Powered Features
- **AI Storybook Generation**: Automatically generate beautiful narrative stories from event photos using Google Gemini
- **Social Media Assistant**: Auto-generate captions and hashtags for event posts
- **Intelligent Vendor Matching**: AI-powered vendor recommendations based on budget and preferences
- **Event Timeline Generator**: Automatically create event timelines and checklists

### Core Features
- **Budget-Friendly Vendor Finder**: Filter vendors by budget, location, ratings with AI recommendations
- **Digital Invitations**: Create and track invitations with status monitoring
- **Gift Marketplace**: Browse and order customizable gifts with order tracking
- **Event Management**: Complete event lifecycle management with budget tracking
- **Social Media Automation**: Multi-platform posting with engagement tracking

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
- MongoDB instance (Atlas or local)
- Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))
- (Optional) Cloudinary account for image uploads

## Backend

1. Copy the example environment file to create your real .env:
   - cp backend/env.example backend/.env

2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Configure environment variables in backend/.env
   - Get MongoDB URI from MongoDB Atlas or use local MongoDB
   - Get Google Gemini API key from https://makersuite.google.com/app/apikey
   - Set JWT secrets (generate strong random strings)
   - (Optional) Configure Cloudinary for image uploads

4. Run the server:
   ```bash
   npm run dev   # Development mode with auto-reload
   npm start     # Production mode
   ```

### Backend environment variables
Create `backend/.env` (not committed). See `backend/env.example` for all available options.

**Required variables:**
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing
- `JWT_REFRESH_SECRET` - Secret for refresh token
- `GEMINI_API_KEY` - Google Gemini API key for AI features

**Optional variables:**
- `CLOUDINARY_*` - For image uploads
- `SMTP_*` - For sending invitations via email
- `FRONTEND_URL` - For CORS configuration

**Quick setup:**
1. Copy `backend/env.example` to `backend/.env`
2. Fill in the required values
3. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Frontend

1. Install and run:
   ```bash
   cd frontend
   npm install
   npm start     # Start Expo development server
   npm run ios   # Run on iOS simulator
   npm run android # Run on Android emulator
   ```

2. The frontend uses React Native with Expo. The API client is configured to connect to the backend at `http://localhost:3000` by default. Make sure your backend is running before starting the frontend.

## Running locally — Quick Start

### Start Backend:
```bash
cd backend
cp env.example .env
# Edit .env with your MongoDB URI and Gemini API key
npm install
npm run dev
```
Backend will run on `http://localhost:3000`

### Start Frontend:
```bash
cd frontend
npm install
npm start
```
Scan the QR code with Expo Go app on your phone or press `i` for iOS simulator, `a` for Android emulator.

### Testing AI Features:
1. Sign up or log in as a customer
2. Create an event
3. Try creating an AI storybook with event photos
4. Generate social media posts with AI captions
5. Get AI vendor recommendations based on your budget

For detailed setup instructions, see `IMPLEMENTATION_GUIDE.md`

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

## AI Features in Detail

### Google Gemini Integration
The app uses Google Gemini AI for:
- **Storybook Generation**: Multimodal analysis of photos to create narrative stories
- **Social Media Content**: Auto-generate engaging captions and hashtags
- **Vendor Recommendations**: Intelligent suggestions based on budget and preferences
- **Event Timeline**: Automated event planning with milestones and reminders

### API Endpoints

**AI Endpoints:**
- `POST /api/media/storybooks` - Create AI-generated storybook
- `POST /api/media/posts` - Generate AI social media post
- `GET /api/vendors/recommendations` - Get AI vendor recommendations
- `POST /api/events/:id/timeline` - Generate AI event timeline

See `IMPLEMENTATION_GUIDE.md` for complete API documentation.

## Contributing
- Fork the repository, create a feature branch, and open a pull request.
- Describe changes and add tests where relevant.

## Documentation
- `IMPLEMENTATION_GUIDE.md` - Complete setup and API documentation
- `SETUP_SUMMARY.md` - Quick reference for implemented features
- `database schema.md` - Database schema reference

## License
MIT License

---

If you'd like, I can:
- Generate a ready-to-commit backend/.env.example file for your repo,
- Or open a PR that adds the README and .env.example to the repository (I will only do that if you ask and provide permission).
