const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');


const app = express();

mongoose.connect('mongodb://localhost:27017/tedbaker-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/tedbaker-auth' }),
  cookie: { maxAge: 1000 * 60 * 60 }
}));

const setUser = require('./middleware/setUser');
app.use(setUser);

const setFlashMessage = require('./middleware/setFlashMessage');
app.use(setFlashMessage);

const initCart = require('./middleware/initCart');
app.use(initCart);


app.use('/', productRoutes);

app.get('/', (req, res) => {
  res.render('landingpage', { layout: 'layout' });
});

app.use('/', orderRoutes);

app.use(authRoutes);

const isAuthenticated = require('./middleware/auth');


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.set('layout', 'layout'); // default layout file (layout.ejs)
