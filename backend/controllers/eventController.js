import Event from '../models/Event.js';

// Get events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('cid');
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create event
export const createEvent = async (req, res) => {
  try {
    const { date, cid, metadata } = req.body;
    const event = new Event({ date, cid, metadata });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
