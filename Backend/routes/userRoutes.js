const express = require('express');
const router = express.Router();
const { createUser, userLogin, getUserByEmail, updateUser, deleteUser } = require('../controllers/userController');

// POST /api/users/signup
router.post('/signup', createUser);

// POST /api/users/login
router.post('/login', userLogin);

// GET /api/users/email/:email
router.get('/email/:email', getUserByEmail);

// PUT /api/users/:id
router.put('/:id', updateUser);

// DELETE /api/users/:id
router.delete('/:id', deleteUser);

module.exports = router;
