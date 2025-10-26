import mongoose from 'mongoose';

const giftOrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  giftId: { type: mongoose.Schema.Types.ObjectId, ref: 'GiftCategory', required: true },
  cid: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  address: String,
  invoiceId: { type: String, required: true },
  purchaseAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  customization: Object,
}, { timestamps: true });

export default mongoose.model('GiftOrder', giftOrderSchema);
