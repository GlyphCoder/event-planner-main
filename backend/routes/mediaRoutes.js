import express from 'express';
import { 
  getStorybooks, 
  createStorybook,
  getInvitations, 
  createInvitation,
  getPosts, 
  createPost 
} from '../controllers/mediaController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Storybooks
router.get('/storybooks', authenticateToken, getStorybooks);
router.post('/storybooks', authenticateToken, createStorybook);

// Invitations
router.get('/invitations', authenticateToken, getInvitations);
router.post('/invitations', authenticateToken, createInvitation);

// Social Media Posts
router.get('/posts', authenticateToken, getPosts);
router.post('/posts', authenticateToken, createPost);

export default router;
