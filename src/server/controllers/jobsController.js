const Job = require("../models/jobs");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const createJob = async (req, res) => {
  const { job_id, job_title, salary, contract_type, other } = req.body;

  // Checking if all fields are filled.
  if (!job_id || !job_title || !contract_type || !job_description) {
    return res.status(400).json({ message: "Please fill out all fields!" });
  }

  // Checks if a duplicate jobposting exists on the database
  const isThereADuplicate = await User.findOne({
    job_title,
    job_description,
    salary,
    contract_type,
    other,
  })
    .lean()
    .exec();
  if (isThereADuplicate) {
    return res
      .status(409)
      .json({ message: "A same job posting already exist." });
  }
};

const getJob = () => {};

const updateJob = () => {};

const deleteJob = () => {};

module.exports = {
  createJob,
  getJob,
  updateJob,
  deleteJob,
};
