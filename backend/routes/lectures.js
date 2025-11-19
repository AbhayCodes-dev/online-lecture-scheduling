
const express = require('express');
const router = express.Router();
const Lecture = require('../models/Lecture');
const Course = require('../models/Course');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

router.post('/', protect, admin, async (req, res) => {
  try {
    const { courseId, instructorId, date, numberOfBatches } = req.body;

    if (!courseId || !instructorId || !date || (numberOfBatches === undefined || numberOfBatches === null)) {
      return res.status(400).json({ msg: 'Missing required fields: courseId, instructorId, date, numberOfBatches' });
    }

    const batchesToAdd = parseInt(numberOfBatches, 10);
    if (isNaN(batchesToAdd) || batchesToAdd <= 0) {
      return res.status(400).json({ msg: 'numberOfBatches must be a positive integer' });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(400).json({ msg: 'Course not found' });

    const instructor = await User.findById(instructorId);
    if (!instructor) return res.status(400).json({ msg: 'Instructor not found' });

    const conflict = await Lecture.findOne({ instructor: instructorId, date, course: { $ne: courseId } });
    if (conflict) {
      return res.status(409).json({ msg: 'Instructor already assigned to another course on this date' });
    }

    let lecture = await Lecture.findOne({ instructor: instructorId, date, course: courseId });

    if (lecture) {

      lecture.numberOfBatches = (lecture.numberOfBatches || 0) + batchesToAdd;
      await lecture.save();

      if (!course.lectures.includes(lecture._id)) {
        course.lectures.push(lecture._id);
        await course.save();
      }
      if (!instructor.lectures.includes(lecture._id)) {
        instructor.lectures.push(lecture._id);
        await instructor.save();
      }

      const populated = await Lecture.findById(lecture._id).populate('course').populate('instructor');
      return res.json({ msg: 'numberOfBatches updated', lecture: populated });
    } else {
      const created = new Lecture({
        course: courseId,
        instructor: instructorId,
        date,
        numberOfBatches: batchesToAdd
      });
      await created.save();

      course.lectures.push(created._id);
      await course.save();

      instructor.lectures.push(created._id);
      await instructor.save();

      const populated = await Lecture.findById(created._id).populate('course').populate('instructor');
      return res.json({ msg: 'Lecture created', lecture: populated });
    }
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ msg: 'Instructor already assigned (unique constraint)' });
    console.error('lectures POST error:', err);
    res.status(500).json({ msg: err.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const lectures = await Lecture.find().populate('course').populate('instructor').sort({ date: 1 });
      return res.json(lectures);
    } else {
      const lectures = await Lecture.find({ instructor: req.user._id }).populate('course').sort({ date: 1 });
      return res.json(lectures);
    }
  } catch (err) {
    console.error('lectures GET error:', err);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
