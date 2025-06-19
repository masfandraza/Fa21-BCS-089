const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    _id: { type: mongoose.Schema.Types.ObjectId }, // ✅ to allow matching in my-orders
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String },
    address: { type: String, required: true },
    city: { type: String },
    country: { type: String },
    zip: { type: String }
  },
  cart: {
    items: [{
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      quantity: Number
    }],
    totalPrice: Number
  },
  status: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], // ✅ allowed values
    default: 'Processing'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
