// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const productRoutes = require('./routes/productRoutes');
// const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const { mongoURI } = require('./config/database');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
// app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes); // Advertisement routes

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
