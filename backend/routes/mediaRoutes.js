import express from 'express';
import { getStorybooks, getInvitations, getPosts } from '../controllers/mediaController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/storybooks', authenticateToken, getStorybooks);
router.get('/invitations', authenticateToken, getInvitations);
router.get('/posts', authenticateToken, getPosts);

export default router;
