const express = require('express');
const router = express.Router();
const {
  addOrder,
  getAllOrders,
  getOrderByStatus,
  getOrderByOrderId,
  getOrderByUserId,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');

// POST /api/orders
router.post('/', addOrder);

// GET /api/orders
router.get('/', getAllOrders);

// GET /api/orders/status/:status
router.get('/status/:status', getOrderByStatus);

// GET /api/orders/:order_id
router.get('/:order_id', getOrderByOrderId);

// GET /api/orders/user/:user_id
router.get('/user/:user_id', getOrderByUserId);

// PUT /api/orders/:order_id
router.put('/:order_id', updateOrder);

// DELETE /api/orders/:order_id
router.delete('/:order_id', deleteOrder);

module.exports = router;
