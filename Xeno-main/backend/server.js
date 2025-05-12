const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const customerRoutes = require('./routes/customers');
const segmentRoutes = require('./routes/segments');
const campaignRoutes = require('./routes/campaigns');

const app = express();
app.use(cors());
app.use(express.json()); // <-- this is required before your routes

mongoose.connect('mongodb://127.0.0.1:27017/mini_crm')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.use('/api/customers', customerRoutes);
app.use('/api/segments', segmentRoutes);   // ✅ this is the key
app.use('/api/campaigns', campaignRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
