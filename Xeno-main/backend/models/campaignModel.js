const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: String,
  segmentId: mongoose.Schema.Types.ObjectId,
  audienceSize: Number,
  sent: Number,
  failed: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', campaignSchema);
