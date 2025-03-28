// controllers/itemController.js
const Item = require('../models/Item');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');


// POST /api/items
exports.postItem = async (req, res) => {
  try {
    const { product } = req.body;
    const { user } = req.body;

    const { category, name, description, price, expiry_period, available_count, images } = product;
    const { firstName, lastName, email, contactNumber, address } = user;

    const uuid = `itm-${uuidv4().split('-')[0]}`;

    const post_date = new Date();
    const expiry_date = moment(post_date).add(expiry_period, 'days').toDate();

    // Create a new item with the provided data and the generated values
    const newAdvertiser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      contact: contactNumber,
      address: address
    };

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
      images: images,
      advertiser: newAdvertiser
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
    const {
      name,
      category,
      description,
      price,
      post_date,
      expiry_date,
      available_count,
      status,
      images,
    } = req.body;

    const item = await Item.findOneAndUpdate(
      { item_id: req.params.id },
      {
        name,
        category,
        description,
        price,
        post_date: new Date(post_date),
        expiry_date: new Date(expiry_date),
        available_count,
        status,
        images,
      },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

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

exports.searchItems = async (req, res) => {
  try {
    const query = req.params.query;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const items = await Item.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });

    if (items.length === 0) {
      return res.status(404).json({ message: 'No items found matching the search query' });
    }

    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};