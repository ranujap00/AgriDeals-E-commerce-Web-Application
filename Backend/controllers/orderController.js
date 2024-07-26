const Order = require('../models/Order');
const { v4: uuidv4 } = require('uuid');

// Add Order
exports.addOrder = async (req, res) => {
  const { user_details, items, shipping_address, total_price } = req.body;
  const order_id = `ord-${uuidv4()}`;

  try {
    const newOrder = new Order({
      order_id: order_id,
      user_details: user_details,
      items: items,
      shipping_address: shipping_address,
      status: "pending",
      total_price: total_price
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get Order by Status
exports.getOrderByStatus = async (req, res) => {
  try {
    const orders = await Order.find({ status: req.params.status });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get Order by Order ID
exports.getOrderByOrderId = async (req, res) => {
  try {
    const order = await Order.findOne({ order_id: req.params.order_id });
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get Order by User ID
exports.getOrderByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ 'user_details.user_id': req.params.user_id });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update Order
exports.updateOrder = async (req, res) => {
    const { status } = req.body;
  
    // Ensure that only the status field can be updated
    const orderFields = { status };
  
    try {
      let order = await Order.findOne({ order_id: req.params.order_id });
      if (!order) {
        return res.status(404).json({ msg: 'Order not found' });
      }
  
      order = await Order.findOneAndUpdate(
        { order_id: req.params.order_id },
        { $set: orderFields },
        { new: true }
      );
  
      res.json(order);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
// Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ order_id: req.params.order_id });
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    await Order.findOneAndRemove({ order_id: req.params.order_id });

    res.json({ msg: 'Order removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
