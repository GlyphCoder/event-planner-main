import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  totalBudget: Number,
  remainingBudget: Number,
  profileLink: String,
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  invitations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invitation' }],
  storybook: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Storybook' }],
}, { timestamps: true });

export default mongoose.model('Customer', customerSchema);
