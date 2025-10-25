import mongoose from 'mongoose';

const giftOrderSchema = new mongoose.Schema({
  orderId: String,
  giftId: { type: mongoose.Schema.Types.ObjectId, ref: 'GiftCategory' },
  cid: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  address: String,
  invoiceId: String,
  purchaseAmount: Number,
}, { timestamps: true });

export default mongoose.model('GiftOrder', giftOrderSchema);
