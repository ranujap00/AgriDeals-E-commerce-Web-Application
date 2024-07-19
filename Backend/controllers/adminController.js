const Admin = require('../models/Admin');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create Admin (Sign Up)
exports.createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Check if admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ msg: 'Admin already exists' });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate admin_id
    const admin_id = `admin-${uuidv4()}`;

    // Create new admin
    admin = new Admin({
      admin_id: admin_id,
      name: name,
      email: email,
      password: hashedPassword,
      creation_date: new Date(),
      status: "active"
    });

    await admin.save();
    res.status(201).json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Return JSON Web Token
    const payload = {
      admin_id: admin.admin_id,
      email: admin.email
    };

    const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// // Get Admin by ID
// exports.getAdminById = async (req, res) => {
//   try {
//     const admin = await Admin.findOne({ admin_id: req.params.admin_id }).select('-password');
//     if (!admin) {
//       return res.status(404).json({ msg: 'Admin not found' });
//     }
//     res.json(admin);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

// // Update Admin
// exports.updateAdmin = async (req, res) => {
//   const { name, email, password, status } = req.body;
//   const adminFields = { name, email, status };

//   if (password) {
//     // Encrypt password if provided
//     const salt = await bcrypt.genSalt(10);
//     adminFields.password = await bcrypt.hash(password, salt);
//   }

//   try {
//     let admin = await Admin.findOne({ admin_id: req.params.admin_id });
//     if (!admin) {
//       return res.status(404).json({ msg: 'Admin not found' });
//     }

//     admin = await Admin.findOneAndUpdate(
//       { admin_id: req.params.admin_id },
//       { $set: adminFields },
//       { new: true }
//     );

//     res.json(admin);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

// // Delete Admin
// exports.deleteAdmin = async (req, res) => {
//   try {
//     const admin = await Admin.findOne({ admin_id: req.params.admin_id });
//     if (!admin) {
//       return res.status(404).json({ msg: 'Admin not found' });
//     }

//     await Admin.findOneAndRemove({ admin_id: req.params.admin_id });

//     res.json({ msg: 'Admin removed' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };
