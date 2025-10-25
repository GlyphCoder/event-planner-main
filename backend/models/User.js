import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  usertype: { type: String, enum: ['admin', 'vendor', 'customer'], required: true },
  refreshToken: { type: String },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
