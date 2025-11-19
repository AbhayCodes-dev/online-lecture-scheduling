const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

router.get('/', protect, admin, async (req,res)=>{
  const instructors = await User.find({role:'instructor'}).select('-password');
  res.json(instructors);
});

module.exports = router;
