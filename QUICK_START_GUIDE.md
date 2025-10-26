# Event Planner App - Quick Start Guide

## ✅ Status: Backend is Working!

The backend server is now running successfully on port 3000 with all AI features and user authentication ready.

## 🚀 How to Start

### 1. Backend (Already Running!)
```bash
cd backend
npm install  # (Already done)
npm start    # Server running on http://localhost:3000
```

### 2. Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm start
```

Then scan the QR code with Expo Go app or press `i` for iOS / `a` for Android.

## 📝 Environment Setup

The backend needs these environment variables in `backend/.env`:

```env
PORT=3000
NODE_ENV=development

# MongoDB - Get from MongoDB Atlas
MONGO_URI=your_mongodb_connection_string

# JWT Secrets - Generate random strings
JWT_SECRET=your_random_secret
JWT_REFRESH_SECRET=your_random_refresh_secret

# Google Gemini API Key - REQUIRED for AI features
GEMINI_API_KEY=your_gemini_api_key_here

# Frontend URL
FRONTEND_URL=http://localhost:19006
CORS_ORIGIN=http://localhost:19006
```

**Get your Gemini API key:**
1. Visit https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key to `backend/.env`

## 👥 User Signup Options

### 1. Customer Signup
- Name, Email, Password
- Automatically creates customer profile
- Dashboard: View vendors, manage events, AI features

### 2. Vendor Signup
- Name, Business Name, Email, Phone, Category, Password
- Automatically creates vendor profile with ratings, services, portfolio
- Dashboard: View bookings, manage services, track events

### 3. Admin Signup
- Name, Email, Admin Code (ADMIN2024), Password
- Full access to all features
- Dashboard: View all events, vendors, gifts, system stats

## 🎯 What Each User Type Sees

### Customer Dashboard
- Available vendors count
- Your events
- List of available vendors
- Access to: Event creation, AI storybooks, Social media automation, Gift shop

### Vendor Dashboard
- My bookings count
- Competitors count
- List of your bookings with event details
- Event type, date, venue, status

### Admin Dashboard
- Total events count
- Total gifts count
- Total vendors count
- All events management
- Full system overview

## ✨ Key Features Available

### 1. AI Storybook Generation
```javascript
POST /api/media/storybooks
{
  "images": ["url1", "url2"],
  "eventDetails": {
    "eventName": "Wedding",
    "date": "2024-06-15",
    "description": "Beautiful ceremony"
  },
  "tone": "romantic"
}
```

### 2. AI Social Media Posts
```javascript
POST /api/media/posts
{
  "postImageUrl": "url",
  "eventName": "Birthday Party",
  "description": "Amazing celebration",
  "tone": "fun",
  "platforms": ["instagram", "facebook"]
}
```

### 3. AI Vendor Recommendations
```javascript
GET /api/vendors/recommendations?budget=50000&location=Mumbai&eventType=wedding
```

### 4. AI Event Timeline
```javascript
POST /api/events/:id/timeline
{
  "eventType": "wedding",
  "eventDate": "2024-06-15",
  "venue": "Grand Hotel"
}
```

## 🔧 Troubleshooting

### Backend not starting?
- Check MongoDB connection in `.env`
- Ensure `MONGO_URI` is correct
- Check if MongoDB is accessible

### AI features not working?
- Verify `GEMINI_API_KEY` is set in `.env`
- Check API key is valid at https://makersuite.google.com/app/apikey
- Review backend logs for errors

### Frontend not connecting?
- Ensure backend is running on port 3000
- Check API_BASE_URL in frontend
- Verify CORS settings in backend

### Cannot sign up?
- Check MongoDB is connected
- Verify all required fields are filled
- Check if email already exists

## 📱 Testing the App

### Test Customer Flow:
1. Sign up as Customer
2. View vendors list
3. Create an event
4. Generate AI storybook
5. Create social media post
6. Browse gift shop
7. Get vendor recommendations

### Test Vendor Flow:
1. Sign up as Vendor
2. View your bookings
3. See competitor count
4. View event details you're assigned to

### Test Admin Flow:
1. Sign up as Admin (use code ADMIN2024)
2. View all events
3. Manage vendors
4. View system statistics

## 🎨 API Endpoints Summary

**Authentication:**
- `POST /api/users/signup` - Register user
- `POST /api/users/login` - Login
- `POST /api/users/refresh-token` - Refresh token
- `POST /api/users/logout` - Logout

**Events:**
- `GET /api/events` - Get all events
- `POST /api/events` - Create event
- `GET /api/events/:id` - Get event by ID
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/timeline` - AI generate timeline

**Vendors:**
- `GET /api/vendors` - Get all vendors (filterable)
- `POST /api/vendors` - Create vendor (admin only)
- `GET /api/vendors/recommendations` - AI recommendations
- `GET /api/vendors/:id` - Get vendor by ID
- `POST /api/vendors/:id/reviews` - Add review

**Media (AI Features):**
- `POST /api/media/storybooks` - Create AI storybook
- `GET /api/media/storybooks` - Get storybooks
- `POST /api/media/posts` - Create AI social post
- `GET /api/media/posts` - Get posts

**Gifts:**
- `GET /api/gifts` - Get all gifts (filterable)
- `POST /api/gifts/order` - Place order
- `GET /api/gifts/orders/list` - Get orders

## 🎉 You're Ready!

The app is now fully functional with:
- ✅ Multi-user signup (Customer, Vendor, Admin)
- ✅ Different dashboards for each user type
- ✅ AI-powered storybook generation
- ✅ AI social media assistant
- ✅ AI vendor recommendations
- ✅ Complete event management
- ✅ Gift marketplace
- ✅ Digital invitations
- ✅ Budget tracking

Enjoy your AI-powered event planning platform!

