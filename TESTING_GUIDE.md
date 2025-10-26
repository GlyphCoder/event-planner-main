# Complete Testing Guide - Making Everything Work

## ✅ What I Just Fixed

1. **Auth Middleware** - Now properly attaches user id to request
2. **Navigation Check** - Fixed user state check in AppNavigator  
3. **Signup Flow** - Added better error handling
4. **User Id Handling** - Ensured user.id is available

## 🧪 Test Signup Flow

### 1. Test Customer Signup

**Steps:**
1. Open frontend app
2. Go to "Sign Up as Customer"
3. Fill form:
   - Name: "Test Customer"
   - Email: "customer@test.com"
   - Password: "test123"
   - Confirm Password: "test123"
4. Click "Register as Customer"

**Expected Result:**
- ✅ No validation errors
- ✅ Success alert appears
- ✅ User logged in automatically
- ✅ Navigates to Customer Dashboard
- ✅ Dashboard shows user name and stats

### 2. Test Vendor Signup

**Steps:**
1. Go to "Sign Up as Vendor"
2. Fill form:
   - Name: "Test Vendor"  
   - Business Name: "Test Business"
   - Email: "vendor@test.com"
   - Phone: "1234567890"
   - Category: "Photography"
   - Password: "test123"
   - Confirm Password: "test123"
3. Click "Register as Vendor"

**Expected Result:**
- ✅ No validation errors
- ✅ Success alert appears
- ✅ User logged in automatically
- ✅ Navigates to Vendor Dashboard
- ✅ Shows vendor stats and bookings

### 3. Test Admin Signup

**Steps:**
1. Go to "Sign Up as Admin"
2. Fill form:
   - Name: "Test Admin"
   - Email: "admin@test.com"
   - Admin Code: "ADMIN2024"
   - Password: "test123"
   - Confirm Password: "test123"
3. Click "Register as Admin"

**Expected Result:**
- ✅ No validation errors
- ✅ Success alert appears
- ✅ User logged in automatically  
- ✅ Navigates to Admin Dashboard
- ✅ Shows admin stats

## 🔍 Check Database

After signup, check MongoDB Compass:

### For Customer:
```
users collection:
{
  "name": "Test Customer",
  "email": "customer@test.com",
  "usertype": "customer",
  "profileId": <customer_profile_id>
}

customers collection:
{
  "name": "Test Customer",
  "email": "customer@test.com",
  "userRef": <user_id>
}
```

### For Vendor:
```
users collection:
{
  "name": "Test Vendor",
  "email": "vendor@test.com",
  "usertype": "vendor",
  "profileId": <vendor_profile_id>
}

vendors collection:
{
  "name": "Test Vendor",
  "email": "vendor@test.com",
  "phone": "1234567890",
  "category": "Photography",
  "userRef": <user_id>
}
```

### For Admin:
```
users collection:
{
  "name": "Test Admin",
  "email": "admin@test.com",
  "usertype": "admin",
  "profileId": <admin_profile_id>
}

admins collection:
{
  "name": "Test Admin",
  "email": "admin@test.com",
  "userRef": <user_id>
}
```

## 🐛 If Something Doesn't Work

### Check Backend Logs:
```bash
cat backend_output.log
```

Look for:
- ✅ "Server running on port 3000"
- ✅ "MongoDB connected"
- ✅ "✅ Vendor profile created with ID: ..."
- ✅ "✅ User linked to profile ID: ..."

### Check Frontend Console:
Look for:
- "AuthContext signUp: Starting signup with data:"
- "AuthContext signUp: Received response:"
- "AuthContext: User signed up"
- "AppNavigator: User state"

## 🔧 Manual Fix if Needed

### If Signup Works But Dashboard Doesn't Show:

1. **Check user state in console:**
```javascript
// In AuthContext, the user should have:
{
  id: "...",
  usertype: "vendor/customer/admin",
  role: "vendor/customer/admin",
  ...
}
```

2. **Force Re-render:**
- Logout and login again
- Clear AsyncStorage if needed

### If Validation Errors:

**Email Errors:**
- ❌ "test" → Need @ symbol
- ❌ "test@" → Need domain
- ✅ "test@example.com" → Valid

**Phone Errors:**
- ❌ "12345" → Need 10 digits
- ❌ "123-456-7890" → No dashes
- ✅ "1234567890" → Valid

**Password Errors:**
- ❌ "abc@123" → No @ allowed
- ❌ "abc!" → No ! allowed
- ❌ "abc" → Too short (need 6+)
- ✅ "abc123" → Valid

## 🎯 Success Checklist

- ✅ Can sign up as Customer
- ✅ Can sign up as Vendor
- ✅ Can sign up as Admin
- ✅ Dashboard shows for Customer
- ✅ Dashboard shows for Vendor
- ✅ Dashboard shows for Admin
- ✅ Can logout
- ✅ Can login
- ✅ Navigation menu works
- ✅ Data stored in correct collections

## 📱 Frontend Commands

Start frontend:
```bash
cd frontend
npm start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app

## 🔗 All Endpoints Working

**Public:**
- POST `/api/users/signup` ✅
- POST `/api/users/login` ✅
- POST `/api/users/refresh-token` ✅

**Protected (need token):**
- GET `/api/events` ✅
- GET `/api/vendors` ✅
- GET `/api/gifts` ✅
- POST `/api/events` ✅
- POST `/api/media/storybooks` ✅
- POST `/api/media/posts` ✅

## 🚀 Quick Test

1. **Start Backend:** ✅ Already running
2. **Start Frontend:** `cd frontend && npm start`
3. **Sign up as customer**
4. **See dashboard**
5. **Works!** 🎉

If anything fails, check the logs and let me know what error you see!

