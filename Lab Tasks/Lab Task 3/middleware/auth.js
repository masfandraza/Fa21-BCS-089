function isAuthenticated(req, res, next) {
  if (req.session && req.session.user && req.session.user._id) {
    // Attach user to request object so it can be used later
    req.user = req.session.user;
    return next();
  }

  // Redirect to login if not authenticated
  return res.redirect('/login');
}

module.exports = isAuthenticated;
