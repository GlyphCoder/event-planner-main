import express from 'express';
import { getGifts, createGift, createGiftOrder } from '../controllers/giftController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getGifts);
router.post('/', authenticateToken, authorizeRoles('admin'), createGift);
router.post('/order', authenticateToken, authorizeRoles('customer'), createGiftOrder);

export default router;
