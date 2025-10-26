import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  category: String,
  ratings: { type: Number, default: 0 },
  reviews: [{ type: Object }],
  location: String,
  priceRange: {
    min: Number,
    max: Number
  },
  availability: { type: Boolean, default: true },
  portfolio: [String], // Array of image URLs
  services: [String], // Array of service names
  otherData: Object,
  userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Vendor', vendorSchema);
