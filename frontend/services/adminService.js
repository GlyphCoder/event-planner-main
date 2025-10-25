import apiClient from './apiClient';

export const getAllAdmins = async () => {
  try {
    const res = await apiClient.get('/admins');
    return res.data;
  } catch (err) {
    console.error('getAllAdmins error:', err.response || err);
    throw err;
  }
};

// Example: Admin stats (used in Dashboard)
export const getAdminStats = async () => {
  try {
    const res = await apiClient.get('/admins/stats');
    return res.data;
  } catch (err) {
    console.error('getAdminStats error:', err.response || err);
    throw err;
  }
};
