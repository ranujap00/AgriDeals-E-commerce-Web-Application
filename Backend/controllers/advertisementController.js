// controllers/advertisementController.js
const Advertisement = require('../models/Advertisement');

// POST /api/advertisements
exports.postAdvertisement = async (req, res) => {
  try {
    const { title, description, imageURL } = req.body;
    const newAdvertisement = new Advertisement({ title, description, imageURL });
    await newAdvertisement.save();
    res.json(newAdvertisement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// GET /api/advertisements
exports.getAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisement.find();
    res.json(advertisements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// PUT /api/advertisements/:id
exports.updateAdvertisement = async (req, res) => {
  try {
    const { title, description, imageURL } = req.body;
    const advertisement = await Advertisement.findByIdAndUpdate(
      req.params.id,
      { title, description, imageURL },
      { new: true }
    );
    res.json(advertisement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// DELETE /api/advertisements/:id
exports.deleteAdvertisement = async (req, res) => {
  try {
    await Advertisement.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Advertisement deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
