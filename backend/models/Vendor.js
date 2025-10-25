import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  category: String,
  otherData: Object,
}, { timestamps: true });

export default mongoose.model('Vendor', vendorSchema);
