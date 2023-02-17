const express = require("express");
const router = express.Router();

const { createJob, getJobs } = require("../controllers/jobsController");

// POST /jobs/create
router.post("/create", createJob);

// GET /jobs
router.get("/", getJobs);

module.exports = router;
