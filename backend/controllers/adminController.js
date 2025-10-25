import Admin from '../models/Admin.js';
import User from '../models/User.js';

// Get all admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create Admin
export const createAdmin = async (req, res) => {
  try {
    const { name, email } = req.body;
    const admin = new Admin({ name, email });
    await admin.save();
    res.status(201).json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
