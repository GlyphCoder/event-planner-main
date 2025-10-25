import express from 'express';
import { getVendors, createVendor } from '../controllers/vendorController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, authorizeRoles('admin', 'vendor', 'customer'), getVendors);
router.post('/', authenticateToken, authorizeRoles('admin'), createVendor);

export default router;
