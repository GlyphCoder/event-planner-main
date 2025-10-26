import apiClient from './apiClient';

export const getAllVendors = async (filters = {}) => {
  try {
    const { category, location, minRating, maxPrice, minPrice, search } = filters;
    const queryParams = new URLSearchParams();
    
    if (category) queryParams.append('category', category);
    if (location) queryParams.append('location', location);
    if (minRating) queryParams.append('minRating', minRating);
    if (maxPrice) queryParams.append('maxPrice', maxPrice);
    if (minPrice) queryParams.append('minPrice', minPrice);
    if (search) queryParams.append('search', search);
    
    const queryString = queryParams.toString();
    const url = `/vendors${queryString ? `?${queryString}` : ''}`;
    
    const res = await apiClient.get(url);
    return res.data;
  } catch (err) {
    console.error('getAllVendors error:', err.response || err);
    throw err;
  }
};

export const getVendorById = async (id) => {
  try {
    const res = await apiClient.get(`/vendors/${id}`);
    return res.data;
  } catch (err) {
    console.error('getVendorById error:', err.response || err);
    throw err;
  }
};

export const getVendorRecommendations = async (criteria) => {
  try {
    const { budget, location, eventType, preferences } = criteria;
    const queryParams = new URLSearchParams();
    
    if (budget) queryParams.append('budget', budget);
    if (location) queryParams.append('location', location);
    if (eventType) queryParams.append('eventType', eventType);
    if (preferences) queryParams.append('preferences', preferences);
    
    const queryString = queryParams.toString();
    const url = `/vendors/recommendations?${queryString}`;
    
    const res = await apiClient.get(url);
    return res.data;
  } catch (err) {
    console.error('getVendorRecommendations error:', err.response || err);
    throw err;
  }
};

export const addVendorReview = async (vendorId, review) => {
  try {
    const res = await apiClient.post(`/vendors/${vendorId}/reviews`, review);
    return res.data;
  } catch (err) {
    console.error('addVendorReview error:', err.response || err);
    throw err;
  }
};
