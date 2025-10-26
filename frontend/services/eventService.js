import apiClient from './apiClient';

export const getAllEvents = async (customerId) => {
  try {
    const url = customerId ? `/events?cid=${customerId}` : '/events';
    const res = await apiClient.get(url);
    return res.data;
  } catch (err) {
    console.error('getAllEvents error:', err.response || err);
    throw err;
  }
};

export const getEventById = async (id) => {
  try {
    const res = await apiClient.get(`/events/${id}`);
    return res.data;
  } catch (err) {
    console.error('getEventById error:', err.response || err);
    throw err;
  }
};

export const createEvent = async (data) => {
  try {
    const res = await apiClient.post('/events', data);
    return res.data;
  } catch (err) {
    console.error('createEvent error:', err.response || err);
    throw err;
  }
};

export const updateEvent = async (id, data) => {
  try {
    const res = await apiClient.put(`/events/${id}`, data);
    return res.data;
  } catch (err) {
    console.error('updateEvent error:', err.response || err);
    throw err;
  }
};

export const deleteEvent = async (id) => {
  try {
    const res = await apiClient.delete(`/events/${id}`);
    return res.data;
  } catch (err) {
    console.error('deleteEvent error:', err.response || err);
    throw err;
  }
};

export const generateEventTimeline = async (eventId, data) => {
  try {
    const res = await apiClient.post(`/events/${eventId}/timeline`, data);
    return res.data;
  } catch (err) {
    console.error('generateEventTimeline error:', err.response || err);
    throw err;
  }
};

export const addVendorToEvent = async (eventId, vendorId) => {
  try {
    const res = await apiClient.post(`/events/${eventId}/vendors`, { vendorId });
    return res.data;
  } catch (err) {
    console.error('addVendorToEvent error:', err.response || err);
    throw err;
  }
};
