const express = require('express');
const router = express.Router();

const Order = require('../models/Order');


router.get('/checkout', (req, res) => {
  const cart = req.session.cart;

  if (!cart || Object.keys(cart.items).length === 0) {
    req.session.error = 'Your cart is empty. Please add items before checking out.';
    return res.redirect('/products');
  }

  res.render('checkout', { cart });
});


router.post('/place-order', async (req, res) => {
  const { email, firstName, lastName, address, city, country, zip, phone } = req.body;
  const cart = req.session.cart;

  if (!cart || Object.keys(cart.items).length === 0) {
    req.session.error = 'Your cart is empty.';
    return res.redirect('/products');
  }

  const items = Object.values(cart.items).map(item => ({
    productId: item.product._id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity
  }));

  try {
    const newOrder = new Order({
      user: { email, firstName, lastName, address, city, country, zip, phone },
      cart: {
        items,
        totalPrice: cart.totalPrice
      }
    });

    await newOrder.save();

    req.session.cart = null;
    req.session.success = 'Your order was placed successfully!';
    res.redirect('/products');
  } catch (err) {
    console.error('Order save failed:', err);
    req.session.error = 'Failed to place order. Please try again.';
    res.redirect('/checkout');
  }
});



module.exports = router;
