// controllers/itemController.js
const Item = require('../models/Item');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');


// POST /api/items
exports.postItem = async (req, res) => {
  try {
    const { product } = req.body;
    const { category, name, description, price, expiry_period, available_count, images } = product;
    
    const uuid = `itm-${uuidv4().split('-')[0]}`;
    
    const post_date = new Date();
    const expiry_date = moment(post_date).add(expiry_period, 'days').toDate();

    // Create a new item with the provided data and the generated values
    const newItem = new Item({
      item_id: uuid,
      name: name,
      description: description,
      category: category,
      price: price,
      post_date: post_date,
      expiry_date: expiry_date,
      available_count: available_count,
      status: "active",
      images: images
    });

    await newItem.save();
    res.json(newItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// GET /api/items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// GET /api/items/:id
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findOne({ item_id: req.params.item_id });
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Item not found' });
    }
    res.status(500).send('Server Error');
  }
};

// GET /api/items/category/:category
exports.getItemByCategory = async (req, res) => {
  try {
    const items = await Item.find({ category: req.params.category });
    if (items.length === 0) {
      return res.status(404).json({ msg: 'No items found for this category' });
    }
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// PUT /api/items/:id
exports.updateItem = async (req, res) => {
  try {
    const { title, description, imageURL } = req.body;
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { title, description, imageURL },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// DELETE /api/advertisements/:id
exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Item deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
