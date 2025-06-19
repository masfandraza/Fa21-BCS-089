const mongoose = require('mongoose');
const Vehicle = require('./models/Vehicle');

mongoose.connect('mongodb://localhost:27017/tedbaker-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error', err));

const vehicles = [
  { name: 'Model S', brand: 'Tesla', price: 79999, type: 'Sedan', image: '/uploads/vehicles/1750338456760.jpg' },
  { name: 'F-150 Raptor', brand: 'Ford', price: 65900, type: 'Truck', image: '/uploads/vehicles/download (1).jpg' },
  { name: 'Civic', brand: 'Honda', price: 24999, type: 'Sedan', image: '/uploads/vehicles/download (2).jpg' },
  { name: 'Model X', brand: 'Tesla', price: 89999, type: 'SUV', image: '/uploads/vehicles/download.jpg' },
  { name: 'Silverado', brand: 'Chevrolet', price: 52900, type: 'Truck', image: '/uploads/vehicles/images (1).jpg' },
  { name: 'CX-5', brand: 'Mazda', price: 30990, type: 'SUV', image: '/uploads/vehicles/images (2).jpg' },
  { name: 'Camry', brand: 'Toyota', price: 28950, type: 'Sedan', image: '/uploads/vehicles/images (3).jpg' },
  { name: 'Ranger', brand: 'Ford', price: 41900, type: 'Truck', image: '/uploads/vehicles/images (4).jpg' },
  { name: 'Accord', brand: 'Honda', price: 30999, type: 'Sedan', image: '/uploads/vehicles/images (5).jpg' },
  { name: 'Highlander', brand: 'Toyota', price: 45900, type: 'SUV', image: '/uploads/vehicles/images (6).jpg' }

];

async function seed() {
  try {
    await Vehicle.deleteMany({});
    await Vehicle.insertMany(vehicles);
    console.log('✅ 20 vehicles seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding vehicles:', err);
  } finally {
    mongoose.connection.close();
  }
}

seed();
