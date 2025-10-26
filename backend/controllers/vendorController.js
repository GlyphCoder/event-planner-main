import Vendor from '../models/Vendor.js';
import User from '../models/User.js';
import * as aiService from '../services/aiService.js';

// Get all vendors with filtering
export const getVendors = async (req, res) => {
  try {
    const { category, location, minRating, maxPrice, minPrice, search } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (location) query.location = new RegExp(location, 'i');
    if (minRating) query.ratings = { $gte: minRating };
    
    if (maxPrice || minPrice) {
      query['priceRange.max'] = { $lte: maxPrice || Infinity };
      if (minPrice) query['priceRange.min'] = { $gte: minPrice };
    }
    
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { category: new RegExp(search, 'i') },
        { services: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    query.availability = true;
    
    const vendors = await Vendor.find(query);
    res.status(200).json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get vendor by ID
export const getVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(200).json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create vendor
export const createVendor = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      category, 
      location,
      priceRange,
      services,
      portfolio,
      otherData 
    } = req.body;
    
    const vendor = new Vendor({ 
      name, 
      email, 
      phone, 
      category, 
      location,
      priceRange,
      services,
      portfolio,
      otherData 
    });
    
    await vendor.save();
    res.status(201).json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get AI vendor recommendations
export const getVendorRecommendations = async (req, res) => {
  try {
    const { budget, location, eventType, preferences } = req.query;
    
    const aiRecommendations = await aiService.generateVendorRecommendations({
      budget,
      location,
      eventType,
      preferences
    });
    
    // Get matching vendors from database
    const query = {};
    if (location) query.location = new RegExp(location, 'i');
    if (budget) {
      query['priceRange.min'] = { $lte: budget };
      query['priceRange.max'] = { $gte: budget * 0.7 }; // Flexible pricing
    }
    
    const matchingVendors = await Vendor.find(query).limit(10);
    
    res.status(200).json({
      aiRecommendations,
      matchingVendors
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update vendor
export const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    
    res.status(200).json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add review/rating to vendor
export const addVendorReview = async (req, res) => {
  try {
    const { rating, comment, customerName } = req.body;
    const vendor = await Vendor.findById(req.params.id);
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    
    vendor.reviews.push({ rating, comment, customerName, date: new Date() });
    
    // Update average rating
    const avgRating = vendor.reviews.reduce((sum, review) => sum + review.rating, 0) / vendor.reviews.length;
    vendor.ratings = avgRating;
    
    await vendor.save();
    res.status(200).json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
