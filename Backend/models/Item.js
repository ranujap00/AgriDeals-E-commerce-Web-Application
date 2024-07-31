// models/Advertisement.js
const mongoose = require('mongoose');
const AdvertiserSchema = require('./Advertiser').schema;

const ItemSchema = new mongoose.Schema({
  item_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  post_date: {
    type: Date,
    required: true
  },
  expiry_date: {
    type: Date,
    required: true
  },
  available_count: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  advertiser: {
    type: AdvertiserSchema,
    required: true
  },
});

module.exports = mongoose.model('Item', ItemSchema);
