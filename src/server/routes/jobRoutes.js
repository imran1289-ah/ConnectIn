const express = require("express");
const router = express.Router();
const jobsController = require('../controllers/jobsController')

router.route('/')
    .get(jobsController.fetchJobData)
    .post(jobsController.updateJobData)

module.exports = router