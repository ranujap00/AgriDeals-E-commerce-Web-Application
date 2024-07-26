const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true
  },
  user_details: {
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
    contact_number: {
        type: String,
        required: true
    }
  },
  items: [
    {
      item_id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  order_date: {
    type: Date,
    default: Date.now
  },
  shipping_address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending',
  },
  total_price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Order', OrderSchema);
