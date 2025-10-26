import mongoose from 'mongoose';

const giftCategorySchema = new mongoose.Schema({
  giftId: { type: String, required: true, unique: true },
  giftName: { type: String, required: true },
  imageUrl: String,
  giftPrice: { type: Number, required: true },
  quantityAvailable: { type: Number, default: 0 },
  category: String,
  description: String,
  customizable: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('GiftCategory', giftCategorySchema);
