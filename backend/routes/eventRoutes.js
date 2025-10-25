import express from 'express';
import { getEvents, createEvent } from '../controllers/eventController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getEvents);
router.post('/', authenticateToken, authorizeRoles('admin', 'customer'), createEvent);

export default router;
