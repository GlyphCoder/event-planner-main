import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  cid: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  guestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest' },
  inviteId: { type: String, required: true, unique: true },
  userEmail: String,
  inviteUrl: String,
  status: { type: String, enum: ['sent', 'opened', 'accepted', 'declined'], default: 'sent' },
  sentAt: Date,
  openedAt: Date,
  template: String,
  personalizedMessage: String
}, { timestamps: true });

export default mongoose.model('Invitation', invitationSchema);
