import express from 'express';
import { 
  getEvents, 
  getEvent, 
  createEvent, 
  updateEvent, 
  deleteEvent,
  generateEventTimeline,
  addVendorToEvent 
} from '../controllers/eventController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Get all events
router.get('/', authenticateToken, getEvents);

// Get event by ID
router.get('/:id', authenticateToken, getEvent);

// Create event
router.post('/', authenticateToken, authorizeRoles('admin', 'customer'), createEvent);

// Update event
router.put('/:id', authenticateToken, authorizeRoles('admin', 'customer'), updateEvent);

// Delete event
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'customer'), deleteEvent);

// Generate AI timeline
router.post('/:id/timeline', authenticateToken, generateEventTimeline);

// Add vendor to event
router.post('/:id/vendors', authenticateToken, authorizeRoles('admin', 'customer'), addVendorToEvent);

export default router;
