import GiftCategory from '../models/GiftCategory.js';
import GiftOrder from '../models/GiftOrder.js';

// Gifts
export const getGifts = async (req, res) => {
  try {
    const gifts = await GiftCategory.find();
    res.status(200).json(gifts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createGift = async (req, res) => {
  try {
    const { giftName, imageUrl, giftPrice, quantityAvailable } = req.body;
    const gift = new GiftCategory({ giftName, imageUrl, giftPrice, quantityAvailable });
    await gift.save();
    res.status(201).json(gift);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Gift orders
export const createGiftOrder = async (req, res) => {
  try {
    const { giftId, cid, address, invoiceId, purchaseAmount } = req.body;
    const order = new GiftOrder({ giftId, cid, address, invoiceId, purchaseAmount });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
