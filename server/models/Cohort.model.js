const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortSchema = new Schema({
  inProgress: {type: Boolean, default: false},
  cohortSlug: {type: String, unique: true, required: true},
  cohortName: {type: String, required: true},
  program: {type: String, enum: ["Web Dev", "UX/UI"]},
  format: {type: String, enum: ["Full Time", "Part Time"]},
  campus: {type: String, enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"]},
  startDate: {type: Date, default: Date.now},
  endDate: Date,
  programManager: {type: String, required: true},
  leadTeacher: {type: String, required: true},
  totalHours: {type: Number, default: 360}
})

const Cohort = mongoose.model('Cohort', cohortSchema);

module.exports = Cohort