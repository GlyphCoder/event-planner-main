import mongoose from 'mongoose';

const eventCategorySchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  eventName: { type: String, required: true },
});

export default mongoose.model('EventCategory', eventCategorySchema);
