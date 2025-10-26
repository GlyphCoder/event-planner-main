# Event Planner App - Implementation Guide

## Overview
This is a comprehensive AI-powered Event Planning Platform built with:
- **Backend**: Node.js + Express + MongoDB + Google Gemini AI
- **Frontend**: React Native + Expo
- **AI Services**: Google Gemini for storybook generation, social media automation, and vendor recommendations

## Features Implemented

### 1. AI-Powered Storybook Generation
- Uses Google Gemini to generate narrative stories from event photos
- Supports multiple tones: romantic, professional, fun, nostalgic
- Automatically creates engaging story text based on uploaded images and event details

### 2. AI Social Media Assistant
- Automatically generates captions and hashtags for event posts
- Supports multi-platform publishing (Instagram, Facebook, TikTok)
- Tracks engagement metrics

### 3. AI Vendor Matching
- Budget-based vendor filtering
- Location-based search
- AI recommendations for vendor selection
- Rating and review system

### 4. Gift Shop & Marketplace
- Curated gift catalog with categories
- Filter by price range, category, search
- Customizable gift options
- Order tracking system

### 5. Event Management
- Create and manage events
- Budget tracking with automatic updates
- Vendor assignment to events
- AI-generated event timelines

### 6. Digital Invitations
- Generate unique invitation links
- Track invitation status (sent, opened, accepted, declined)
- Send personalized messages
- Multiple template support

## Database Schema

The application uses MongoDB with the following collections:

### Models Overview
1. **User** - Authentication and user types (admin, vendor, customer)
2. **Customer** - Customer profiles with budgets, events, invitations, storybooks
3. **Vendor** - Vendor profiles with ratings, services, pricing, location
4. **Event** - Event details with timeline, vendors, budget, status
5. **Storybook** - AI-generated storybooks with images and narrative
6. **Invitation** - Digital invitations with tracking
7. **GiftCategory** - Gift catalog with pricing and availability
8. **GiftOrder** - Gift orders with status tracking
9. **SocialMediaPost** - Social media posts with AI-generated content
10. **Guest** - Guest information and management
11. **EventCategory** - Event type categorization
12. **Admin** - Admin user profiles

## Setup Instructions

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp env.example .env
   ```

4. **Configure environment variables:**
   Edit `.env` file and add your credentials:
   - MongoDB URI
   - JWT secrets
   - Google Gemini API key
   - Cloudinary credentials (for image uploads)
   - Other optional configurations

5. **Start the server:**
   ```bash
   npm run dev  # Development mode with nodemon
   # OR
   npm start    # Production mode
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start Expo:**
   ```bash
   npm start
   # or
   npm run ios     # for iOS
   npm run android # for Android
   ```

## API Endpoints

### Authentication
- `POST /api/users/signup` - User signup
- `POST /api/users/login` - User login
- `POST /api/users/refresh-token` - Refresh access token
- `POST /api/users/logout` - User logout

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/timeline` - Generate AI timeline
- `POST /api/events/:id/vendors` - Add vendor to event

### Vendors
- `GET /api/vendors` - Get all vendors (with filters)
- `GET /api/vendors/:id` - Get vendor by ID
- `POST /api/vendors` - Create vendor (admin only)
- `PUT /api/vendors/:id` - Update vendor (admin only)
- `GET /api/vendors/recommendations` - Get AI vendor recommendations
- `POST /api/vendors/:id/reviews` - Add vendor review

### Media (Storybooks, Invitations, Social Posts)
- `GET /api/media/storybooks` - Get storybooks
- `POST /api/media/storybooks` - Create AI-generated storybook
- `GET /api/media/invitations` - Get invitations
- `POST /api/media/invitations` - Create invitation
- `GET /api/media/posts` - Get social media posts
- `POST /api/media/posts` - Create AI-generated social media post

### Gifts
- `GET /api/gifts` - Get all gifts (with filters)
- `GET /api/gifts/:id` - Get gift by ID
- `POST /api/gifts` - Create gift (admin only)
- `PUT /api/gifts/:id` - Update gift (admin only)
- `GET /api/gifts/orders/list` - Get gift orders
- `POST /api/gifts/order` - Place gift order
- `PUT /api/gifts/order/:id` - Update order status (admin only)

## Using AI Features

### 1. Generate Storybook

```javascript
import { createStorybook } from '../services/mediaService';

const storybook = await createStorybook({
  images: ['https://...', 'https://...'], // Array of image URLs
  eventDetails: {
    eventName: "John & Jane's Wedding",
    date: "2024-06-15",
    description: "Beautiful outdoor wedding ceremony",
    anecdotes: "First meeting, proposal story, favorite memories"
  },
  tone: "romantic" // or "professional", "fun", "nostalgic"
});
```

### 2. Generate Social Media Post

```javascript
import { createSocialPost } from '../services/mediaService';

const post = await createSocialPost({
  postImageUrl: "https://...",
  eventName: "Summer Birthday Party",
  description: "Amazing party with friends and family",
  tone: "fun",
  platforms: ["instagram", "facebook"]
});
```

### 3. Get AI Vendor Recommendations

```javascript
import { getVendorRecommendations } from '../services/vendorService';

const recommendations = await getVendorRecommendations({
  budget: 50000,
  location: "Mumbai",
  eventType: "wedding",
  preferences: "Contemporary and modern style"
});
```

### 4. Generate Event Timeline

```javascript
import { generateEventTimeline } from '../services/eventService';

const timeline = await generateEventTimeline(eventId, {
  eventType: "wedding",
  eventDate: "2024-06-15",
  venue: "Grand Hotel"
});
```

## Environment Variables

### Required Variables
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing
- `JWT_REFRESH_SECRET` - Secret for refresh token
- `GEMINI_API_KEY` - Google Gemini API key

### Optional Variables
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` - For image uploads
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - For sending invitations via email
- `FRONTEND_URL` - Frontend application URL for CORS
- `INSTAGRAM_ACCESS_TOKEN`, `FACEBOOK_ACCESS_TOKEN` - For social media posting

## Testing the API

### Example: Create an AI Storybook

```bash
curl -X POST http://localhost:3000/api/media/storybooks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "images": ["url1", "url2"],
    "eventDetails": {
      "eventName": "Wedding Ceremony",
      "date": "2024-06-15",
      "description": "Beautiful outdoor wedding",
      "anecdotes": "Love story highlights"
    },
    "tone": "romantic"
  }'
```

### Example: Get AI Vendor Recommendations

```bash
curl -X GET "http://localhost:3000/api/vendors/recommendations?budget=50000&location=Mumbai&eventType=wedding" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Security

- All endpoints (except signup/login) require authentication via JWT
- Role-based access control for admin operations
- Password hashing with bcrypt
- Environment variables for sensitive data
- CORS configuration for frontend access

## Troubleshooting

### Backend Issues
- Check MongoDB connection in `.env`
- Verify JWT secrets are set
- Ensure Gemini API key is valid
- Check server logs for detailed errors

### Frontend Issues
- Update API base URL in `frontend/services/apiClient.js`
- Verify token storage in AsyncStorage
- Check CORS settings in backend

### AI Service Issues
- Verify Gemini API key is set correctly
- Check API quota/limits with Google
- Ensure image URLs are accessible
- Monitor backend logs for API errors

## Next Steps

1. **Get Google Gemini API Key:**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create an API key
   - Add it to your `.env` file

2. **Set up MongoDB:**
   - Use MongoDB Atlas or local MongoDB
   - Add connection string to `.env`

3. **Configure Cloudinary (for image uploads):**
   - Sign up at [Cloudinary](https://cloudinary.com)
   - Add credentials to `.env`

4. **Deploy:**
   - Backend: Deploy to Heroku, Railway, or similar
   - Frontend: Build with Expo and deploy to app stores

## API Documentation

For detailed API documentation, see the inline comments in each controller file.

## Support

For issues or questions, refer to the code comments or create an issue in the repository.

