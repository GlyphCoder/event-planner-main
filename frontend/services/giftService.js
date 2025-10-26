import apiClient from './apiClient';

export const getAllGifts = async (filters = {}) => {
  try {
    const { category, search, minPrice, maxPrice } = filters;
    const queryParams = new URLSearchParams();
    
    if (category) queryParams.append('category', category);
    if (search) queryParams.append('search', search);
    if (minPrice) queryParams.append('minPrice', minPrice);
    if (maxPrice) queryParams.append('maxPrice', maxPrice);
    
    const queryString = queryParams.toString();
    const url = `/gifts${queryString ? `?${queryString}` : ''}`;
    
    const res = await apiClient.get(url);
    return res.data;
  } catch (err) {
    console.error('getAllGifts error:', err.response || err);
    throw err;
  }
};

export const getGiftById = async (id) => {
  try {
    const res = await apiClient.get(`/gifts/${id}`);
    return res.data;
  } catch (err) {
    console.error('getGiftById error:', err.response || err);
    throw err;
  }
};

export const getGiftOrders = async (customerId) => {
  try {
    const url = customerId ? `/gifts/orders/list?cid=${customerId}` : '/gifts/orders/list';
    const res = await apiClient.get(url);
    return res.data;
  } catch (err) {
    console.error('getGiftOrders error:', err.response || err);
    throw err;
  }
};

export const orderGift = async (data) => {
  try {
    const res = await apiClient.post('/gifts/order', data);
    return res.data;
  } catch (err) {
    console.error('orderGift error:', err.response || err);
    throw err;
  }
};
