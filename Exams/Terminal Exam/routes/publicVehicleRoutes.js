const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

router.get('/vehicles', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 8;

  try {
    const totalCount = await Vehicle.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);

    const vehicles = await Vehicle.find()
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.render('vehicles/index', {
      layout: 'layout',
      vehicles,
      currentPage: page,
      totalPages
    });
  } catch (err) {
    console.error('Error loading vehicles:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
