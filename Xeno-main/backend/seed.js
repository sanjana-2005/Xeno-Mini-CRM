const mongoose = require('mongoose');
const Customer = require('./models/customerModel');

mongoose.connect('mongodb://127.0.0.1:27017/mini_crm')
  .then(async () => {
    await Customer.deleteMany(); // Clear existing
    await Customer.insertMany([
      {
        name: "Ravi Kumar",
        email: "ravi@example.com",
        phone: "9876543210",
        spend: 12000,
        visits: 2,
        lastActiveDaysAgo: 85
      },
      {
        name: "Anita Sharma",
        email: "anita@example.com",
        phone: "9876543222",
        spend: 8000,
        visits: 5,
        lastActiveDaysAgo: 120
      },
      {
        name: "Kiran Patel",
        email: "kiran@example.com",
        phone: "9876543333",
        spend: 15000,
        visits: 1,
        lastActiveDaysAgo: 20
      }
    ]);
    console.log("✅ Sample customers inserted");
    process.exit();
  })
  .catch(err => console.error("MongoDB error:", err));
