import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  totalBudget: { type: Number, default: 0 },
  remainingBudget: { type: Number, default: 0 },
  profileLink: String,
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  invitations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invitation' }],
  storybook: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Storybook' }],
  userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Customer', customerSchema);
