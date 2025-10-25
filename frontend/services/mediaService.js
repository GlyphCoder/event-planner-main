import apiClient from './apiClient';

export const getSocialPosts = async (customerId) => {
  try {
    const res = await apiClient.get(`/media/posts/${customerId}`);
    return res.data;
  } catch (err) {
    console.error('getSocialPosts error:', err.response || err);
    throw err;
  }
};
