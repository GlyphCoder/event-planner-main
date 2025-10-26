import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  usertype: { type: String, enum: ['admin', 'vendor', 'customer'], required: true },
  refreshToken: { type: String },
  // Link to the specific profile based on user type
  profileId: { type: mongoose.Schema.Types.ObjectId, refPath: 'usertype' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
