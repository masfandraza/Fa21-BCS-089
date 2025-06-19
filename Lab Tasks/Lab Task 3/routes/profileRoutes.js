const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');
const upload = require('../middleware/uploadProfile');
const User = require('../models/User');

// GET profile page
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.render('profile', { layout: 'layout', user });
  } catch (err) {
    console.error('Error loading profile:', err);
    req.session.error = 'Unable to load profile';
    res.redirect('/');
  }
});

// POST update profile (with optional image upload)
router.post('/profile', isAuthenticated, upload.single('profileImage'), async (req, res) => {
  try {
    const { name, phone, address, city, country, zip } = req.body;

    const updateFields = {
      name,
      phone,
      address,
      city,
      country,
      zip
    };

    if (req.file) {
      updateFields.profileImage = '/uploads/profile/' + req.file.filename;
    }

    const user = await User.findByIdAndUpdate(req.session.user._id, updateFields, { new: true });

    req.session.user = user;
    req.session.success = 'Profile updated successfully';
    res.redirect('/profile');
  } catch (err) {
    console.error('Profile update error:', err);
    req.session.error = 'Failed to update profile';
    res.redirect('/profile');
  }
});

module.exports = router;
