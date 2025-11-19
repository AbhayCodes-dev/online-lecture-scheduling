const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", CourseSchema);
