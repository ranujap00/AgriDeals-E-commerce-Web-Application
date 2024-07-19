// models/Advertisement.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  creation_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('User', UserSchema);
