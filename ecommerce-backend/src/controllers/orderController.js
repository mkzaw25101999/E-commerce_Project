const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { protect } = require("../middleware/auth");

// create order
const createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    // get user's cart
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty!" });
    }

    // create order from cart
    const order = new Order({
      user: req.user._id,
      orderItems: cart.products.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.images?.[0] || "",
      })),
      shippingAddress,
      paymentMethod: "Credit Card",
      paymentResult: {
        id: `Pay_${Date.now()}`,
        status: "Paid",
        update_time: new Date().toISOString(),
      },
      totalPrice: cart.total,
      isPaid: true,
      paidAt: new Date(),
      orderStatus: "Processing",
    });
    await order.save();

    // clear user cart after paid
    cart.products = [];
    cart.total = 0;
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get user orders logged in
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("orderItems.product", "name price image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
};
