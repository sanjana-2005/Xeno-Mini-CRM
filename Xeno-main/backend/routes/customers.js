const express = require('express');
const Customer = require('../models/customerModel');
const router = express.Router();

// Create customer
router.post('/', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all customers
router.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

// Get single customer
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.json(customer);
});

// Update customer
router.put('/:id', async (req, res) => {
  const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete customer
router.delete('/:id', async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: "Customer deleted" });
});

module.exports = router;
