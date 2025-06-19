const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/tedbaker-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const existing = await User.findOne({ email: 'admin@tedbaker.com' });
  if (existing) {
    console.log('Admin already exists.');
    process.exit();
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const adminUser = new User({
    name: 'Admin User',
    email: 'admin@tedbaker.com',
    password: hashedPassword,
    isAdmin: true
  });

  await adminUser.save();
  console.log('✅ Admin user created successfully');
  process.exit();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
