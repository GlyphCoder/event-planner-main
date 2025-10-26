import Event from '../models/Event.js';
import Customer from '../models/Customer.js';
import * as aiService from '../services/aiService.js';

// Get events
export const getEvents = async (req, res) => {
  try {
    const cid = req.user?.id;
    let query = {};
    
    if (req.query.cid) {
      query.cid = req.query.cid;
    } else if (cid) {
      query.cid = cid;
    }
    
    const events = await Event.find(query)
      .populate('cid')
      .populate('vendors')
      .sort({ date: -1 });
    
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get event by ID
export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('cid')
      .populate('vendors');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create event
export const createEvent = async (req, res) => {
  try {
    const { 
      date, 
      cid, 
      eventName,
      eventType,
      venue,
      budget,
      vendors,
      metadata 
    } = req.body;
    
    // Generate event ID
    const eventId = `EVT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const event = new Event({ 
      date, 
      cid, 
      eventId,
      eventName,
      eventType,
      venue,
      budget,
      vendors,
      metadata 
    });
    
    await event.save();
    
    // Update customer's events list
    await Customer.findByIdAndUpdate(cid, {
      $push: { events: event._id }
    });
    
    // Update customer's remaining budget
    const customer = await Customer.findById(cid);
    if (budget && customer.totalBudget) {
      customer.remainingBudget = customer.totalBudget - (budget || 0);
      await customer.save();
    }
    
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('cid').populate('vendors');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Generate AI timeline for event
export const generateEventTimeline = async (req, res) => {
  try {
    const { eventType, eventDate, venue } = req.body;
    
    const timeline = await aiService.generateEventTimeline({
      eventType,
      eventDate,
      venue
    });
    
    // Parse timeline and update event
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // You can add logic to parse timeline and add to event.timeline
    // For now, just return the generated timeline
    
    res.status(200).json({ timeline, aiGenerated: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add vendor to event
export const addVendorToEvent = async (req, res) => {
  try {
    const { vendorId } = req.body;
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    if (!event.vendors.includes(vendorId)) {
      event.vendors.push(vendorId);
      await event.save();
    }
    
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
