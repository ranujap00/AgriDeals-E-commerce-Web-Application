const express = require('express');
const router = express.Router();
const {
  createAdmin,
  loginAdmin,
} = require('../controllers/adminController');

// POST /api/admins/signup
router.post('/signup', createAdmin);

// POST /api/admins/login
router.post('/login', loginAdmin);

// // GET /api/admins/:admin_id
// router.get('/:admin_id', getAdminById);

// // PUT /api/admins/:admin_id
// router.put('/:admin_id', updateAdmin);

// // DELETE /api/admins/:admin_id
// router.delete('/:admin_id', deleteAdmin);

module.exports = router;
