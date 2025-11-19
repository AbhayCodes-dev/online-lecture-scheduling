
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { protect, admin } = require('../middleware/auth');

router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, level, description, imageUrl } = req.body;
    if (!name) return res.status(400).json({ msg: 'Course name required' });

    const course = new Course({ name, level, description, imageUrl });
    await course.save();
    res.json(course);
  } catch (err) {
    console.error('courses POST error:', err);
    res.status(500).json({ msg: err.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error('courses GET error:', err);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
