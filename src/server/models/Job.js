const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
  job_id: {
    type: Number,
  },
  description: {
    type: String,
  },
  salary: {
    type: Number,
  },
  company: {
    type: String,
  },
  category: {
    type: String,
  },
  title: {
    type: String,
  },
  location: {
    type: String,
  },
});

const Jobs = mongoose.model("Jobs", jobsSchema);

module.exports = Jobs;
