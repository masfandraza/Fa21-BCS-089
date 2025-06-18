const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products', async (req, res) => {
  let { category, subCategory, sort, page = 1 } = req.query;

  const perPage = 12;
  const filter = {};

  // Match exact category with case-insensitive regex (fixes filter bug)
  if (category) filter.category = new RegExp(`^${category}$`, 'i');

  // Match subCategory exactly (case-sensitive is fine here since values are consistent)
  if (subCategory) filter.subCategory = subCategory;

  let sortOption = {};
  if (sort === 'price_asc') sortOption.price = 1;
  else if (sort === 'price_desc') sortOption.price = -1;

  try {
    const totalCount = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / perPage);
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip((page - 1) * perPage)
      .limit(perPage);

    const subCategoriesMap = {
      Women: ['Clothes', 'Shoes', 'Bag', 'Accessories'],
      Men: ['Clothes', 'Shoes', 'Bag']
    };

    res.render('products', {
      layout: 'layout',
      products,
      category,
      subCategory,
      sort,
      currentPage: parseInt(page),
      totalPages,
      subCategoriesMap,
      breadcrumb: [
        { label: 'Home', href: '/' },
        { label: 'Products' },
        ...(category ? [{ label: category }] : [])
      ]
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});




router.post('/add-to-cart/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (!product) return res.status(404).send('Product not found');

  const cart = req.session.cart;

  if (!cart.items[productId]) {
    cart.items[productId] = { product, quantity: 1 };
  } else {
    cart.items[productId].quantity += 1;
  }

  cart.totalQty += 1;
  cart.totalPrice += product.price;
  req.session.success = `${product.name} was added to your cart successfully!`;



  res.redirect('/products');
});


router.post('/update-cart/:id', (req, res) => {
  const { id } = req.params;
  const { action } = req.body;
  const cart = req.session.cart;

  if (!cart || !cart.items[id]) return res.status(400).json({ success: false });

  const item = cart.items[id];
  const price = item.product.price;

  if (action === 'increase') {
    item.quantity += 1;
    cart.totalQty += 1;
    cart.totalPrice += price;
  } else if (action === 'decrease') {
    item.quantity -= 1;
    cart.totalQty -= 1;
    cart.totalPrice -= price;

    if (item.quantity <= 0) {
      delete cart.items[id];
    }
  }

  res.json({
    success: true,
    newQty: item.quantity,
    itemTotal: item.quantity * price,
    cartTotal: cart.totalPrice
  });
});


router.post('/remove-from-cart/:id', (req, res) => {
  const { id } = req.params;
  const cart = req.session.cart;

  if (!cart || !cart.items[id]) {
    return res.json({ success: false });
  }

  const item = cart.items[id];
  cart.totalQty -= item.quantity;
  cart.totalPrice -= item.quantity * item.product.price;

  delete cart.items[id];

  // Edge case: if cart is now empty
  if (Object.keys(cart.items).length === 0) {
    req.session.cart = null;
    return res.json({ success: true, cartTotal: 0, remainingItems: {} });
  }

  res.json({
    success: true,
    cartTotal: cart.totalPrice,
    remainingItems: cart.items
  });
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('productDetail', {
      layout: 'layout',
      product,
      breadcrumb: [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: product.name }
      ]
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


router.get('/search', async (req, res) => {
  const query = req.query.q || '';
  const page = parseInt(req.query.page) || 1;
  const perPage = 12;

  const filter = {
    name: { $regex: query, $options: 'i' }
    // You can add description too if needed
    // description: { $regex: query, $options: 'i' }
  };

  try {
    const totalCount = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / perPage);

    const products = await Product.find(filter)
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.render('products', {
      layout: 'layout',
      products,
      category: null,
      subCategory: null,
      sort: null,
      currentPage: page,
      totalPages,
      search: query,
      breadcrumb: [
        { label: 'Products', href: '/products' },
        { label: `Search: "${query}"` }
      ]
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Search failed");
  }
});





module.exports = router;
