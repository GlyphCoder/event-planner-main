import GiftCategory from '../models/GiftCategory.js';
import GiftOrder from '../models/GiftOrder.js';
import Customer from '../models/Customer.js';

// Gifts
export const getGifts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { giftName: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }
    if (minPrice) query.giftPrice = { ...query.giftPrice, $gte: minPrice };
    if (maxPrice) query.giftPrice = { ...(query.giftPrice || {}), $lte: maxPrice };
    
    const gifts = await GiftCategory.find(query);
    res.status(200).json(gifts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getGift = async (req, res) => {
  try {
    const gift = await GiftCategory.findById(req.params.id);
    if (!gift) {
      return res.status(404).json({ message: 'Gift not found' });
    }
    res.status(200).json(gift);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createGift = async (req, res) => {
  try {
    const { giftId, giftName, imageUrl, giftPrice, quantityAvailable, category, description, customizable } = req.body;
    
    const gift = new GiftCategory({ 
      giftId, 
      giftName, 
      imageUrl, 
      giftPrice, 
      quantityAvailable,
      category,
      description,
      customizable
    });
    
    await gift.save();
    res.status(201).json(gift);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateGift = async (req, res) => {
  try {
    const gift = await GiftCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!gift) {
      return res.status(404).json({ message: 'Gift not found' });
    }
    
    res.status(200).json(gift);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Gift orders
export const getGiftOrders = async (req, res) => {
  try {
    const cid = req.user?.id;
    let query = {};
    
    if (req.query.cid) {
      query.cid = req.query.cid;
    } else if (cid) {
      query.cid = cid;
    }
    
    const orders = await GiftOrder.find(query)
      .populate('giftId')
      .populate('cid')
      .sort({ createdAt: -1 });
    
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createGiftOrder = async (req, res) => {
  try {
    const { giftId, cid, address, purchaseAmount, customization } = req.body;
    
    // Check if gift is available
    const gift = await GiftCategory.findById(giftId);
    if (!gift) {
      return res.status(404).json({ message: 'Gift not found' });
    }
    
    if (gift.quantityAvailable === 0) {
      return res.status(400).json({ message: 'Gift is out of stock' });
    }
    
    // Generate order ID
    const orderId = `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const invoiceId = `INV_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const order = new GiftOrder({ 
      orderId, 
      giftId, 
      cid, 
      address, 
      invoiceId, 
      purchaseAmount: purchaseAmount || gift.giftPrice 
    });
    
    await order.save();
    
    // Update gift quantity
    gift.quantityAvailable -= 1;
    await gift.save();
    
    // Update customer's remaining budget if applicable
    const customer = await Customer.findById(cid);
    if (customer && customer.remainingBudget) {
      customer.remainingBudget -= purchaseAmount || gift.giftPrice;
      await customer.save();
    }
    
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await GiftOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
