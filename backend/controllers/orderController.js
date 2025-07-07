import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const placeOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  let totalPrice = 0;
  const orderItems = [];

  for (let item of cart.items) {
    if (item.product.stockQuantity < item.quantity) {
      return res.status(400).json({ message: `Not enough stock for ${item.product.name}` });
    }

    item.product.stockQuantity -= item.quantity;
    await item.product.save();

    totalPrice += item.product.price * item.quantity;
    orderItems.push({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    });
  }

  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    totalPrice,
  });

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.product');
  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user items.product');
  res.json(orders);
};
