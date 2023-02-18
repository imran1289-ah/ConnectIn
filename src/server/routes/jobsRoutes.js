const express = require("express");
const router = express.Router();

const { createJob, getJobs } = require("../controllers/jobsController");

const jobsControllers = require("../controllers/jobsController");
const Job = require("../models/Job");


// POST /jobs/create
router.post("/create", createJob);




router.get('/', jobsControllers.getAllJobs)


router.get('/:jobId', jobsControllers.getJobDetails)



module.exports = router;
