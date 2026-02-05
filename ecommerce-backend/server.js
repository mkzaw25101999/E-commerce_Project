require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

// Start Express app
const app = express();

// Connecting to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Api is running");
});

// Product routes

const productRoutes = require("./src/routes/productRoutes");
app.use("/api/products", productRoutes); // Product routes with API

// User routes
const userRoutes = require("./src/routes/userRoutes");
app.use("/api/users", userRoutes); // User routes with API

// Cart routes
const cartRoutes = require("./src/routes/cartRoutes");
app.use("/api/cart", cartRoutes); // Cart routes with API

// Order routes
const orderRoutes = require("./src/routes/orderRoutes");
app.use("/api/orders", orderRoutes); // Order routes with API

// Error handling
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// Starting a server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
