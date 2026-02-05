const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getCart, addToCart } = require("../controllers/cartController");

router.use(protect); // Protect all routes

router.get("/", getCart);
router.post("/add", addToCart);

module.exports = router;
