import Storybook from '../models/Storybook.js';
import Invitation from '../models/Invitation.js';
import SocialMediaPost from '../models/SocialMediaPost.js';
import * as aiService from '../services/aiService.js';
import Customer from '../models/Customer.js';

// Storybooks
export const getStorybooks = async (req, res) => {
  try {
    const cid = req.user?.id; // Assuming user ID from auth middleware
    let query = {};
    
    if (req.query.cid) {
      query.cid = req.query.cid;
    } else if (cid) {
      query.cid = cid;
    }
    
    const books = await Storybook.find(query).populate('cid');
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createStorybook = async (req, res) => {
  try {
    const { images, eventDetails, tone } = req.body;
    const cid = req.user?.id;
    
    if (!cid) {
      return res.status(400).json({ message: 'Customer ID is required' });
    }
    
    // Generate story using AI
    const story = await aiService.generateStorybook(images, eventDetails, tone);
    
    // Create unique storybook ID
    const storybookId = `STB_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const storybook = new Storybook({
      storybookId,
      cid,
      images,
      story,
      tone: tone || 'romantic',
      eventName: eventDetails.eventName,
      title: `${eventDetails.eventName} - Memories`,
      metadata: eventDetails,
    });
    
    await storybook.save();
    
    // Update customer's storybook list
    await Customer.findByIdAndUpdate(cid, {
      $push: { storybook: storybook._id }
    });
    
    res.status(201).json(storybook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Invitations
export const getInvitations = async (req, res) => {
  try {
    const cid = req.user?.id;
    let query = {};
    
    if (req.query.cid) {
      query.cid = req.query.cid;
    } else if (cid) {
      query.cid = cid;
    }
    
    const invitations = await Invitation.find(query)
      .populate('eventId')
      .populate('guestId');
    res.status(200).json(invitations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createInvitation = async (req, res) => {
  try {
    const { eventId, guestId, userEmail, template, personalizedMessage } = req.body;
    const cid = req.user?.id;
    
    if (!cid) {
      return res.status(400).json({ message: 'Customer ID is required' });
    }
    
    const inviteId = `INV_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const inviteUrl = `${process.env.FRONTEND_URL}/invitation/${inviteId}`;
    
    const invitation = new Invitation({
      inviteId,
      eventId,
      cid,
      guestId,
      userEmail,
      inviteUrl,
      template,
      personalizedMessage,
      sentAt: new Date(),
      status: 'sent',
    });
    
    await invitation.save();
    
    // Update customer's invitations list
    await Customer.findByIdAndUpdate(cid, {
      $push: { invitations: invitation._id }
    });
    
    res.status(201).json(invitation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Social Media Posts
export const getPosts = async (req, res) => {
  try {
    const cid = req.user?.id;
    let query = {};
    
    if (req.query.cid) {
      query.cid = req.query.cid;
    } else if (cid) {
      query.cid = cid;
    }
    
    const posts = await SocialMediaPost.find(query).populate('cid');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { postImageUrl, eventName, description, tone, platforms } = req.body;
    const cid = req.user?.id;
    
    if (!cid) {
      return res.status(400).json({ message: 'Customer ID is required' });
    }
    
    // Generate AI content for the post
    const aiContent = await aiService.generateSocialMediaContent({
      eventName,
      description,
      tone: tone || 'fun'
    });
    
    const postId = `POST_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const post = new SocialMediaPost({
      postId,
      cid,
      postImageUrl,
      caption: aiContent.caption,
      hashtags: aiContent.hashtags,
      platforms: platforms || ['instagram', 'facebook'],
      status: 'draft',
    });
    
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
