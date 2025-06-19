// middleware/isAdmin.js

module.exports = function (req, res, next) {
  if (req.session.user && req.session.user.isAdmin) {
    return next(); // user is admin
  }

  // Optional: redirect or send error
  req.session.error = 'Access denied. Admins only.';
  return res.redirect('/login');
};
