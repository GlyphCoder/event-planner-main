import User from '../models/User.js';
import Customer from '../models/Customer.js';
import Vendor from '../models/Vendor.js';
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, usertype: user.usertype },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, usertype: user.usertype },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

// Helper function to validate input
const validateInput = (email, password, phone, usertype) => {
  const errors = [];

  // Validate email has @ symbol
  if (email && !email.includes('@')) {
    errors.push('Email must contain @ symbol');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push('Email format is invalid');
  }

  // Validate password is alphanumeric
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  if (password && !alphanumericRegex.test(password)) {
    errors.push('Password must contain only alphanumeric characters');
  }

  // Validate password length
  if (password && password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  // Validate phone number is 10 digits (if provided)
  if (phone && phone.trim() !== '') {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      errors.push('Phone number must be exactly 10 digits');
    }
  }

  return errors;
};

// Signup
export const signup = async (req, res) => {
  console.log('Signup request body:', req.body);
  try {
    const { name, email, password, usertype, phone, category, businessName } = req.body;

    // Validate required fields
    if (!name || !email || !password || !usertype) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, password, usertype' 
      });
    }

    // Validate input format
    const validationErrors = validateInput(email, password, phone, usertype);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        error: validationErrors.join(', ') 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        error: 'User already exists with this email' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user first
    const newUser = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      usertype
    });
    await newUser.save();

    // Create corresponding profile based on user type with user reference
    let profileId;
    
    try {
      if (usertype === 'customer') {
        const customer = new Customer({ 
          name, 
          email, 
          phone: phone || '',
          totalBudget: 0,
          remainingBudget: 0,
          profileLink: '',
          events: [],
          invitations: [],
          storybook: [],
          userRef: newUser._id
        });
        await customer.save();
        profileId = customer._id;
        console.log('✅ Customer profile created with ID:', profileId);
      } else if (usertype === 'vendor') {
        const vendor = new Vendor({ 
          name, 
          email, 
          phone: phone || '',
          category: category || '',
          location: '',
          ratings: 0,
          reviews: [],
          priceRange: { min: 0, max: 0 },
          availability: true,
          portfolio: [],
          services: [],
          otherData: {},
          userRef: newUser._id
        });
        await vendor.save();
        profileId = vendor._id;
        console.log('✅ Vendor profile created with ID:', profileId);
      } else if (usertype === 'admin') {
        const admin = new Admin({ 
          name, 
          email,
          userRef: newUser._id
        });
        await admin.save();
        profileId = admin._id;
        console.log('✅ Admin profile created with ID:', profileId);
      }

      // Update user with profile link
      newUser.profileId = profileId;
      await newUser.save();
      console.log('✅ User linked to profile ID:', profileId);
    } catch (profileError) {
      console.error('❌ Error creating profile:', profileError);
      // If profile creation fails, delete the user
      await User.findByIdAndDelete(newUser._id);
      return res.status(500).json({ 
        error: 'Failed to create profile: ' + profileError.message 
      });
    }

    // Generate tokens for immediate login after signup
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.status(201).json({ 
      message: 'User registered successfully',
      accessToken,
      refreshToken,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        usertype: newUser.usertype
      }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ 
      error: err.message || 'Internal server error' 
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({ accessToken, refreshToken, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Refresh Token
export const refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== token)
      return res.status(403).json({ message: 'Invalid refresh token' });

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
