import apiClient from './apiClient';

export const getCustomerById = async (id) => {
  try {
    const res = await apiClient.get(`/customers/${id}`);
    return res.data;
  } catch (err) {
    console.error('getCustomerById error:', err.response || err);
    throw err;
  }
};

export const getCustomerEvents = async (id) => {
  try {
    const res = await apiClient.get(`/customers/${id}/events`);
    return res.data;
  } catch (err) {
    console.error('getCustomerEvents error:', err.response || err);
    throw err;
  }
};

export const updateCustomer = async (id, data) => {
  try {
    const res = await apiClient.put(`/customers/${id}`, data);
    return res.data;
  } catch (err) {
    console.error('updateCustomer error:', err.response || err);
    throw err;
  }
};

export const getStorybooks = async (id) => {
  try {
    const res = await apiClient.get(`/customers/${id}/storybooks`);
    return res.data;
  } catch (err) {
    console.error('getStorybooks error:', err.response || err);
    throw err;
  }
};
