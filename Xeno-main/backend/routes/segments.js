const express = require('express');
const Segment = require('../models/segmentModel');
const Customer = require('../models/customerModel');
const router = express.Router();

// Helper to build MongoDB conditions
function buildCondition(rule) {
  const { field, operator, value } = rule;
  const val = isNaN(value) ? value : Number(value);
  switch (operator) {
    case '>': return { [field]: { $gt: val } };
    case '<': return { [field]: { $lt: val } };
    case '=': return { [field]: val };
    default: return {};
  }
}

// GET all segments
router.get('/', async (req, res) => {
  try {
    const segments = await Segment.find();
    res.json(segments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET customers matching segment logic
router.get('/:id/customers', async (req, res) => {
  try {
    const segment = await Segment.findById(req.params.id);
    if (!segment) return res.status(404).json({ error: 'Segment not found' });

    const { rules, logic } = segment;
    const query = logic === 'AND'
      ? { $and: rules.map(buildCondition) }
      : { $or: rules.map(buildCondition) };

    const matchedCustomers = await Customer.find(query);
    res.json(matchedCustomers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
