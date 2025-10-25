import apiClient from './apiClient';

export const getAllEvents = async () => {
  try {
    const res = await apiClient.get('/events');
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
