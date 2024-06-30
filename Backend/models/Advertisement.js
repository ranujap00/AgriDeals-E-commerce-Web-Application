// models/Advertisement.js
const mongoose = require('mongoose');

const AdvertisementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  // Add more fields as needed
});

module.exports = mongoose.model('Advertisement', AdvertisementSchema);
