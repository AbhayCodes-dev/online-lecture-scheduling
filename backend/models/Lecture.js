const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: String, required: true },
  numberOfBatches: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

LectureSchema.index({ instructor: 1, date: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Lecture", LectureSchema);
