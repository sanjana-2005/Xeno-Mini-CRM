const mongoose = require('mongoose');

const segmentSchema = new mongoose.Schema({
  name: String,
  rules: [
    {
      field: String,
      operator: String,
      value: mongoose.Schema.Types.Mixed
    }
  ],
  logic: String
});

module.exports = mongoose.model('Segment', segmentSchema);
