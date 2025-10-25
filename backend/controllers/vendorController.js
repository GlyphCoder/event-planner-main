import Vendor from '../models/Vendor.js';
import User from '../models/User.js';

// Get all vendors
export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create vendor
export const createVendor = async (req, res) => {
  try {
    const { name, email, phone, category, otherData } = req.body;
    const vendor = new Vendor({ name, email, phone, category, otherData });
    await vendor.save();
    res.status(201).json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Vendor bookings and clients can be added later with event relations
