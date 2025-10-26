import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  cid: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  eventId: { type: String, required: true, unique: true },
  eventName: String,
  eventType: String, // wedding, birthday, corporate, etc.
  venue: String,
  budget: Number,
  status: { type: String, enum: ['planning', 'confirmed', 'completed', 'cancelled'], default: 'planning' },
  vendors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }],
  timeline: [{
    milestone: String,
    date: Date,
    completed: { type: Boolean, default: false }
  }],
  reminders: [{ type: Object }],
  metadata: Object,
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
