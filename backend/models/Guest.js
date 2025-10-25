import mongoose from 'mongoose';

const guestSchema = new mongoose.Schema({
  name: String,
  cid: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  guestId: String,
  guestEmail: String,
  otherMetadata: Object,
}, { timestamps: true });

export default mongoose.model('Guest', guestSchema);
