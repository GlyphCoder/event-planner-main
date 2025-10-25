import User from '../models/User.js';
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

// Signup
export const signup = async (req, res) => {
  console.log('Signup request body:', req.body);
  try {
    const { name, email, password, usertype } = req.body;

    // Validate required fields
    if (!name || !email || !password || !usertype) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, password, usertype' 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        error: 'User already exists with this email' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, usertype });
    await newUser.save();

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
