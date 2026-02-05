const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/auth");

// Protect all routes
router.use(protect);

// Create order
router.post("/", createOrder);

// Get user orders
router.get("/", getMyOrders);

module.exports = router;