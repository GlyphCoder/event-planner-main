import express from 'express';
import { 
  getGifts, 
  getGift, 
  createGift, 
  updateGift,
  getGiftOrders,
  createGiftOrder,
  updateOrderStatus
} from '../controllers/giftController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Get all gifts
router.get('/', authenticateToken, getGifts);

// Get gift by ID
router.get('/:id', authenticateToken, getGift);

// Create gift (admin only)
router.post('/', authenticateToken, authorizeRoles('admin'), createGift);

// Update gift (admin only)
router.put('/:id', authenticateToken, authorizeRoles('admin'), updateGift);

// Get orders
router.get('/orders/list', authenticateToken, getGiftOrders);

// Create order
router.post('/order', authenticateToken, authorizeRoles('customer'), createGiftOrder);

// Update order status
router.put('/order/:id', authenticateToken, authorizeRoles('admin'), updateOrderStatus);

export default router;
