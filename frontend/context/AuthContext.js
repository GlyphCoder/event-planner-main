import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { loginUser, registerUser, refreshToken } from '../services/userService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // User sign-in logic
  const signIn = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      if (response?.accessToken) {
        setAccessToken(response.accessToken);

        const decoded = jwtDecode(response.accessToken);
        setUser({ ...decoded, role: decoded.usertype });

        await AsyncStorage.setItem('accessToken', response.accessToken);
        await AsyncStorage.setItem('refreshToken', response.refreshToken);
        console.log('AuthContext: User signed in', { user: decoded, accessToken: response.accessToken });
      }
      return response;
    } catch (error) {
      console.error('Sign-in error:', error);
      return { error: 'Login failed. Please try again.' };
    }
  };

  // User sign-up logic
  const signUp = async (userData) => {
    console.log('AuthContext signUp: Starting signup with data:', userData);
    try {
      const response = await registerUser(userData);
      console.log('AuthContext signUp: Received response:', response);
      
      if (response?.accessToken) {
        setAccessToken(response.accessToken);

        const decoded = jwtDecode(response.accessToken);
        setUser({ ...decoded, role: decoded.usertype });

        await AsyncStorage.setItem('accessToken', response.accessToken);
        await AsyncStorage.setItem('refreshToken', response.refreshToken);
        console.log('AuthContext: User signed up', { user: decoded, accessToken: response.accessToken });
      } else {
        console.log('AuthContext signUp: No accessToken in response:', response);
      }
      return response;
    } catch (error) {
      console.error('Sign-up error:', error);
      console.error('Sign-up error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      // Handle specific error cases
      if (error.response?.data?.error) {
        return { error: error.response.data.error };
      }
      
      return { error: 'Registration failed. Please try again.' };
    }
  };

  // User sign-out logic
  const signOut = async () => {
    try {
      setUser(null);
      setAccessToken(null);
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  // Load user session on app startup
  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        setAccessToken(token);
        const decoded = jwtDecode(token);
        setUser({ ...decoded, role: decoded.usertype });
      }
    } catch (error) {
      console.error('Error loading user session:', error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, signIn, signUp, signOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};