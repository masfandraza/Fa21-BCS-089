const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const isAdmin = require('../middleware/isAdmin');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/vehicles'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });


router.get('/admin/vehicles', isAdmin, async (req, res) => {
  const vehicles = await Vehicle.find();
  res.render('admin/vehicles/index', { layout: 'layout', vehicles });
});


router.get('/admin/vehicles/new', isAdmin, (req, res) => {
  res.render('admin/vehicles/new', { layout: 'layout' });
});


router.post('/admin/vehicles', isAdmin, upload.single('image'), async (req, res) => {
  const { name, brand, price, type } = req.body;
  const image = req.file ? `/uploads/vehicles/${req.file.filename}` : '';
  await Vehicle.create({ name, brand, price, type, image });
  res.redirect('/admin/vehicles');
});


router.get('/admin/vehicles/:id/edit', isAdmin, async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  res.render('admin/vehicles/edit', { layout: 'layout', vehicle });
});


router.post('/admin/vehicles/:id', isAdmin, upload.single('image'), async (req, res) => {
  const { name, brand, price, type } = req.body;
  const update = { name, brand, price, type };
  if (req.file) update.image = `/uploads/vehicles/${req.file.filename}`;
  await Vehicle.findByIdAndUpdate(req.params.id, update);
  res.redirect('/admin/vehicles');
});


router.post('/admin/vehicles/:id/delete', isAdmin, async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.redirect('/admin/vehicles');
});




module.exports = router;
