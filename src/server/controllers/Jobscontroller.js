const Jobs = require("../models/Job.js");

const createJob = async (req, res) => {
  try {
    const { job_id, description, salary, company, category, title, location } =
      req.body;
    const newJob = new Jobs({
      job_id,
      description,
      salary,
      company,
      category,
      title,
      location,
    });
    const savedJob = await newJob.save();
    res.status(200).json(savedJob);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createJob, getJobs };
