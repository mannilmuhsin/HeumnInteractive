const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const User = require('../models/User');

router.get('/', protect, admin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
