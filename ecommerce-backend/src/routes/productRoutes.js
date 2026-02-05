const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/auth");


// public route

// route to get all products
router.get("/", getProducts);

// route to get product by id
router.get("/:id", getProductById);

// protected routes with login


// route to create a new product

router.post("/", protect, createProduct);

// route to update a product

router.put("/:id",protect, updateProduct);

// route to delete a product

router.delete("/:id", protect, deleteProduct);

module.exports = router;
