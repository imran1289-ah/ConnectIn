const express = require("express");
const router = express.Router();
const jobsControllers = require("../controllers/jobsController");
const Job = require("../models/Job");



router.get('/', jobsControllers.getAllJobs)


router.get('/:jobId', jobsControllers.getJobDetails)







module.exports = router;
