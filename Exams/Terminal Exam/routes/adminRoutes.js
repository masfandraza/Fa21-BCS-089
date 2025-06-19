const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + file.fieldname + ext);
  }
});
const upload = multer({ storage });

// Admin Dashboard
router.get('/admin', isAdmin, (req, res) => {
  res.render('admin/dashboard', {
    layout: 'layout',
    user: req.session.user
  });
});

// Manage Products
router.get('/admin/products', isAdmin, async (req, res) => {
  const { category } = req.query;
  const filter = {};
  if (category) filter.category = category;

  try {
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.render('admin/products', {
      layout: 'layout',
      products,
      category
    });
  } catch (err) {
    console.error('Error loading products:', err);
    req.session.error = 'Unable to load products.';
    res.redirect('/');
  }
});

// Add Product
router.get('/admin/products/new', isAdmin, (req, res) => {
  res.render('admin/addProduct', { layout: 'layout' });
});

router.post('/admin/products', isAdmin, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'hoverImage', maxCount: 1 }
]), async (req, res) => {
  const { name, description, price, category, subCategory } = req.body;
  const mainImage = req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : '';
  const hoverImage = req.files['hoverImage'] ? `/uploads/${req.files['hoverImage'][0].filename}` : '';

  const product = new Product({
    name,
    description,
    price: parseFloat(price),
    category,
    subCategory,
    image: mainImage,
    hoverImage
  });

  try {
    await product.save();
    req.session.success = 'Product added successfully.';
    res.redirect('/admin/products');
  } catch (err) {
    console.error('Error saving product:', err);
    req.session.error = 'Failed to add product.';
    res.redirect('/admin/products/new');
  }
});

// Delete Product
router.post('/admin/products/:id/delete', isAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    req.session.success = 'Product deleted successfully.';
    res.redirect('/admin/products');
  } catch (err) {
    console.error('Error deleting product:', err);
    req.session.error = 'Failed to delete product.';
    res.redirect('/admin/products');
  }
});

// Edit Product
router.get('/admin/products/:id/edit', isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.session.error = 'Product not found.';
      return res.redirect('/admin/products');
    }

    res.render('admin/editProduct', {
      layout: 'layout',
      product
    });
  } catch (err) {
    console.error('Error loading product for edit:', err);
    req.session.error = 'Failed to load product.';
    res.redirect('/admin/products');
  }
});

router.post('/admin/products/:id/edit', isAdmin, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'hoverImage', maxCount: 1 }
]), async (req, res) => {
  const { name, description, price, category, subCategory } = req.body;
  const updates = {
    name,
    description,
    price: parseFloat(price),
    category,
    subCategory
  };

  if (req.files['image']) {
    updates.image = `/uploads/${req.files['image'][0].filename}`;
  }
  if (req.files['hoverImage']) {
    updates.hoverImage = `/uploads/${req.files['hoverImage'][0].filename}`;
  }

  try {
    await Product.findByIdAndUpdate(req.params.id, updates);
    req.session.success = 'Product updated successfully.';
    res.redirect('/admin/products');
  } catch (err) {
    console.error('Error updating product:', err);
    req.session.error = 'Failed to update product.';
    res.redirect(`/admin/products/${req.params.id}/edit`);
  }
});

// Manage Users
router.get('/admin/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 });
    res.render('admin/manageUsers', {
      layout: 'layout',
      users,
      user: req.session.user
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching users');
  }
});

// View Orders for Specific User
router.get('/admin/users/:id/orders', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const orders = await Order.find({ 'user.email': user.email }).sort({ createdAt: -1 });

    res.render('admin/userOrders', {
      layout: 'layout',
      orders,
      selectedUser: user,
      user: req.session.user
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading user orders');
  }
});

// Update Order Status
router.post('/admin/orders/:id/status', isAdmin, async (req, res) => {
  const { status } = req.body;
  try {
    await Order.findByIdAndUpdate(req.params.id, { status });
    req.session.success = 'Order status updated.';

    // redirect safely to the user order page
    const order = await Order.findById(req.params.id);
    const userEmail = order.user.email;
    const selectedUser = await User.findOne({ email: userEmail });

    if (selectedUser) {
      return res.redirect(`/admin/users/${selectedUser._id}/orders`);
    } else {
      return res.redirect('/admin/users');
    }

  } catch (err) {
    console.error(err);
    req.session.error = 'Failed to update order status.';
    res.redirect('/admin/users');
  }
});



module.exports = router;
