import express from 'express';
import { getCustomers, createCustomer } from '../controllers/customerController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, authorizeRoles('admin', 'vendor'), getCustomers);
router.post('/', authenticateToken, authorizeRoles('admin'), createCustomer);

export default router;
