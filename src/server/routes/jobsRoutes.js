const express = require("express");
const router = express.Router();
const jobsControllers = require("../controllers/jobsController");

router
  .route("/")
  .get(jobsControllers.getJob)
  .post(jobsControllers.createJob)
  .patch(jobsControllers.updateJob)
  .delete(jobsControllers.deleteJob);



module.exports = router;
