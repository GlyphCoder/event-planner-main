import mongoose from 'mongoose';

const giftCategorySchema = new mongoose.Schema({
  giftId: String,
  giftName: String,
  imageUrl: String,
  giftPrice: Number,
  quantityAvailable: Number,
});

export default mongoose.model('GiftCategory', giftCategorySchema);
