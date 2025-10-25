import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
  } catch (err) {
    console.error('loginUser error:', err.response || err);
    throw err;
  }
};

export const registerUser = async (userData) => {
  try {
    console.log('registerUser: Sending request with data:', userData);
    const res = await axios.post(`${API_URL}/signup`, userData);
    console.log('registerUser: Response received:', res.data);
    return res.data;
  } catch (err) {
    console.error('registerUser error:', err.response || err);
    console.error('registerUser error details:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message
    });
    console.error('Full error response data:', JSON.stringify(err.response?.data, null, 2));
    throw err;
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const res = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
    return res.data;
  } catch (err) {
    console.error('refreshAccessToken error:', err.response || err);
    throw err;
  }
};

export const refreshToken = refreshAccessToken;
