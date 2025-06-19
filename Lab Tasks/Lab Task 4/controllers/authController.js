const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.renderSignup = (req, res) => {
  res.render('signup', {
    layout: 'layout',
    success: null,
    error: null
  });
};


exports.handleSignup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // ✅ Password strength validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.render('signup', {
      layout: 'layout',
      error: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
      success: null
    });
  }

  // ✅ Confirm password match
  if (password !== confirmPassword) {
    return res.render('signup', {
      layout: 'layout',
      error: 'Passwords do not match.',
      success: null
    });
  }

  // ✅ Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.render('signup', {
      layout: 'layout',
      error: 'Email already registered.',
      success: null
    });
  }

  // ✅ Create new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });

  await user.save();

  res.render('signup', {
    layout: 'layout',
    success: 'Account created successfully! Please login.',
    error: null
  });
};


exports.renderLogin = (req, res) => {
  res.render('login', {
    layout: 'layout',
    success: null,
    error: null
  });
};


exports.handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render('login', {
      layout: 'layout',
      error: '❌ Invalid email or password.',
      success: null
    });
  }

  // ✅ Store _id instead of id to align with middleware
  req.session.user = {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  };
  req.session.success = '✅ Logged in successfully!';

  if (user.isAdmin) {
  return res.redirect('/admin');
}

  res.redirect('/');
};
