const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['Women', 'Men'],
    required: true
  },
  subCategory: {
    type: String // e.g., 'Women-Clothes', 'Men-Shoes'
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  hoverImage: {
    type: String // optional, no need to mark required
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
