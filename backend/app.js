const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const filesRoutes = require('./routes/filesRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'https://userapp-frontend.vercel.app', 'https://www.pinpaper.in', 'https://pinpaper.in'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json({ limit: '100kb' }));
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/orders', ordersRoutes);
app.use('/api/v1/files', filesRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/user', userRoutes);

module.exports = app;
