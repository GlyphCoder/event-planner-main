import apiClient from './apiClient';

// Storybook Services
export const getStorybooks = async (customerId) => {
  try {
    const res = await apiClient.get(`/media/storybooks${customerId ? `?cid=${customerId}` : ''}`);
    return res.data;
  } catch (err) {
    console.error('getStorybooks error:', err.response || err);
    throw err;
  }
};

export const createStorybook = async (data) => {
  try {
    const { images, eventDetails, tone } = data;
    const res = await apiClient.post('/media/storybooks', {
      images,
      eventDetails,
      tone
    });
    return res.data;
  } catch (err) {
    console.error('createStorybook error:', err.response || err);
    throw err;
  }
};

// Invitation Services
export const getInvitations = async (customerId) => {
  try {
    const res = await apiClient.get(`/media/invitations${customerId ? `?cid=${customerId}` : ''}`);
    return res.data;
  } catch (err) {
    console.error('getInvitations error:', err.response || err);
    throw err;
  }
};

export const createInvitation = async (data) => {
  try {
    const res = await apiClient.post('/media/invitations', data);
    return res.data;
  } catch (err) {
    console.error('createInvitation error:', err.response || err);
    throw err;
  }
};

// Social Media Post Services
export const getSocialPosts = async (customerId) => {
  try {
    const res = await apiClient.get(`/media/posts${customerId ? `?cid=${customerId}` : ''}`);
    return res.data;
  } catch (err) {
    console.error('getSocialPosts error:', err.response || err);
    throw err;
  }
};

export const createSocialPost = async (data) => {
  try {
    const { postImageUrl, eventName, description, tone, platforms } = data;
    const res = await apiClient.post('/media/posts', {
      postImageUrl,
      eventName,
      description,
      tone,
      platforms
    });
    return res.data;
  } catch (err) {
    console.error('createSocialPost error:', err.response || err);
    throw err;
  }
};
