const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const isAuthenticated = require('../middleware/auth');

router.get('/signup', authController.renderSignup);
router.post('/signup', authController.handleSignup);

router.get('/login', authController.renderLogin);
router.post('/login', authController.handleLogin);

router.get('/checkout', isAuthenticated, (req, res) => {
  res.render('checkout', { layout: 'layout' }); // Requires views/checkout.ejs
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
});


module.exports = router;
