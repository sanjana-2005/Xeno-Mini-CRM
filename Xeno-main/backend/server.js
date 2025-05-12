const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const customerRoutes = require('./routes/customers');
const segmentRoutes = require('./routes/segments');
const campaignRoutes = require('./routes/campaigns');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Root route to avoid 404 when accessing base URL
app.get("/", (req, res) => {
  res.send("✅ Mini CRM Backend is running.");
});

// ✅ MongoDB connection using environment variable (required for Vercel)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// API routes
app.use('/api/customers', customerRoutes);
app.use('/api/segments', segmentRoutes);
app.use('/api/campaigns', campaignRoutes);

// ✅ Start server (PORT from env or default to 5000 for local dev)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
