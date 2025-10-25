import apiClient from './apiClient';

export const getAllGifts = async () => {
  try {
    const res = await apiClient.get('/gifts');
    return res.data;
  } catch (err) {
    console.error('getAllGifts error:', err.response || err);
    throw err;
  }
};

export const orderGift = async (data) => {
  try {
    const res = await apiClient.post('/gifts/orders', data);
    return res.data;
  } catch (err) {
    console.error('orderGift error:', err.response || err);
    throw err;
  }
};
