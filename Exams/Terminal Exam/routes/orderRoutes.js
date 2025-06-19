// routes/orderRoutes.js
const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/Order');
const isAuthenticated = require('../middleware/auth');


// ------------------------- CHECKOUT PAGE ------------------------------
router.get('/checkout', (req, res) => {
  const cart = req.session.cart;

  if (!cart || Object.keys(cart.items).length === 0) {
    req.session.error = 'Your cart is empty. Please add items before checking out.';
    return res.redirect('/products');
  }

  res.render('checkout', { cart });          // views/checkout.ejs
});


// ------------------------- PLACE ORDER -------------------------------
router.post('/place-order', async (req, res) => {
  const { email, firstName, lastName, address, city, country, zip, phone } = req.body;
  const cart = req.session.cart;

  if (!cart || Object.keys(cart.items).length === 0) {
    req.session.error = 'Your cart is empty.';
    return res.redirect('/products');
  }

  // build items array
  const items = Object.values(cart.items).map(item => ({
    productId: item.product._id,
    name:      item.product.name,
    price:     item.product.price,
    quantity:  item.quantity
  }));

  try {
    const newOrder = new Order({
      user: {
        _id:        req.session.user._id,   // store who placed it
        email,
        firstName,
        lastName,
        address,
        city,
        country,
        zip,
        phone
      },
      cart: {
        items,
        totalPrice: cart.totalPrice
      },
      status: 'Processing'                  // <-- NEW FIELD
    });

    await newOrder.save();

    // clear cart & flash message
    req.session.cart    = null;
    req.session.success = 'Your order was placed successfully!';
    res.redirect('/products');
  } catch (err) {
    console.error('Order save failed:', err);
    req.session.error = 'Failed to place order. Please try again.';
    res.redirect('/checkout');
  }
});


// ------------------------- MY ORDERS PAGE ----------------------------
router.get('/my-orders', isAuthenticated, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.session.user._id);

    const orders = await Order
      .find({ 'user._id': userId })
      .sort({ createdAt: -1 });

    res.render('myOrders', { layout: 'layout', orders });   // views/myOrders.ejs
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).send('Error fetching orders');
  }
});


module.exports = router;
