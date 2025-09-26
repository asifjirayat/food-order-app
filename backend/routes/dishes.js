const express = require("express");
const fs = require("fs-extra");
const path = require("path");

const router = express.Router();
const dishesPath = path.join(__dirname, "../data/dishes.json");

// GET /api/dishes - get all dishes
router.get("/", async (req, res) => {
  try {
    const dishes = await fs.readJson(dishesPath);
    res.json({
      success: true,
      data: dishes,
      count: dishes.length,
    });
  } catch (error) {
    console.error("Error reading dishes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load dishes",
    });
  }
});

module.exports = router;
