import Storybook from '../models/Storybook.js';
import Invitation from '../models/Invitation.js';
import SocialMediaPost from '../models/SocialMediaPost.js';

// Storybooks
export const getStorybooks = async (req, res) => {
  try {
    const books = await Storybook.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Invitations
export const getInvitations = async (req, res) => {
  try {
    const invitations = await Invitation.find();
    res.status(200).json(invitations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Social Media Posts
export const getPosts = async (req, res) => {
  try {
    const posts = await SocialMediaPost.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
