import Customer from '../models/Customer.js';

// Get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create customer
export const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, totalBudget, remainingBudget, profileLink } = req.body;
    const customer = new Customer({
      name, email, phone, totalBudget, remainingBudget, profileLink
    });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
