module.exports = function (req, res, next) {
  if (!req.session.cart) {
    req.session.cart = {
      items: {}, // { productId: { product, quantity } }
      totalQty: 0,
      totalPrice: 0
    };
  }
  res.locals.cart = req.session.cart;
  next();
};
