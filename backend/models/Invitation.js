import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  cid: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  guestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest' },
  userEmail: String,
  inviteUrl: String,
}, { timestamps: true });

export default mongoose.model('Invitation', invitationSchema);
