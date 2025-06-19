const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['Sedan', 'SUV', 'Truck'], required: true },
  image: { type: String } // file path to uploaded image
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
