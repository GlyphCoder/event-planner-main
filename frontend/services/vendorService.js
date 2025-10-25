import apiClient from './apiClient';

export const getAllVendors = async () => {
  try {
    const res = await apiClient.get('/vendors');
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
