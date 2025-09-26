const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const dishesRoutes = require("./routes/dishes.js");
const ordersRoutes = require("./routes/orders.js");

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    message: "Food ordering API is running",
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Food ordering server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost/${PORT}/api/health`);
});
