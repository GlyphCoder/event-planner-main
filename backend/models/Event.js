import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  date: Date,
  cid: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  eventId: String,
  metadata: Object,
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
