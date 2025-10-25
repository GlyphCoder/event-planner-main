import express from 'express';
import { getAdmins, createAdmin } from '../controllers/adminController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, authorizeRoles('admin'), getAdmins);
router.post('/', authenticateToken, authorizeRoles('admin'), createAdmin);

export default router;
