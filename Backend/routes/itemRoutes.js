// routes/advertisementRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/', itemController.postItem);

router.get('/', itemController.getItems);
router.get('/:item_id', itemController.getItemById);
router.get('/category/:category', itemController.getItemByCategory);

router.put('/:id', itemController.updateItem);

router.delete('/:id', itemController.deleteItem);

router.get('/search/:query', itemController.searchItems);

module.exports = router;
