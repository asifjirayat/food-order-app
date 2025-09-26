const express = require("express");
const fs = require("fs-extra");
const path = require("path");

const router = express.Router();
const ordersPath = path.join(__dirname, "../data/orders.json");

// GET /api/orders - get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await fs.readJson(ordersPath);
    res.json({
      success: true,
      data: orders,
      count: orders.length,
    });
  } catch (error) {
    console.error("Error reading orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load orders",
    });
  }
});

// POST /api/orders - create new order
router.post("/", async (req, res) => {
  try {
    const { customerInfo, cartItems, totalAmount } = req.body;

    // Basic validation
    if (!customerInfo || !cartItems || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Missing required order information",
      });
    }

    const orders = await fs.readJson(ordersPath);

    const newOrder = {
      id: Date.now(),
      customerInfo,
      cartItems,
      totalAmount,
      status: "pending",
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    };

    orders.push(newOrder);
    await fs.writeJson(ordersPath, orders, { spaces: 2 });

    res.status(201).json({
      success: true,
      data: newOrder,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
});

module.exports = router;
