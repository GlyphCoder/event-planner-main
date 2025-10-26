import express from 'express';
import { 
  getVendors, 
  getVendor, 
  createVendor, 
  updateVendor,
  getVendorRecommendations,
  addVendorReview 
} from '../controllers/vendorController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Get all vendors (with filtering)
router.get('/', authenticateToken, getVendors);

// Get AI vendor recommendations
router.get('/recommendations', authenticateToken, getVendorRecommendations);

// Get vendor by ID
router.get('/:id', authenticateToken, getVendor);

// Create vendor (admin only)
router.post('/', authenticateToken, authorizeRoles('admin'), createVendor);

// Update vendor (admin only)
router.put('/:id', authenticateToken, authorizeRoles('admin'), updateVendor);

// Add review (customer only)
router.post('/:id/reviews', authenticateToken, authorizeRoles('customer'), addVendorReview);

export default router;
