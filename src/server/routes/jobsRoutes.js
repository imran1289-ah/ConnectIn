const express = require("express");
const router = express.Router();
const jobsControllers = require("../controllers/jobsController");

router.get('/', jobsControllers.getAllJobs)
router.get('/:jobId', jobsControllers.getJobDetails)
router.get('/edit/:jobId',jobsControllers.getJobDetails)
router.post('/edit/:jobId',jobsControllers.updateJobData)
 
module.exports = router;