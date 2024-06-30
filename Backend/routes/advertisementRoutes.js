// routes/advertisementRoutes.js
const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/advertisementController');

router.post('/', advertisementController.postAdvertisement);
router.get('/', advertisementController.getAdvertisements);
router.put('/:id', advertisementController.updateAdvertisement);
router.delete('/:id', advertisementController.deleteAdvertisement);

module.exports = router;
