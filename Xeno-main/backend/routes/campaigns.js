const express = require('express');
const Campaign = require('../models/campaignModel');
const router = express.Router();

router.get('/', async (req, res) => {
  const campaigns = await Campaign.find().sort({ createdAt: -1 });
  res.json(campaigns);
});

module.exports = router;
