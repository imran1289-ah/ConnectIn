const express = require("express");
const router = express.Router();
// const jobsControllers = require("../controllers/jobsController");
const Jobs = require("../models/Job");

router.get('/', async (req, res) => {

  try{
    const jobs = await Jobs.find();
    res.status(200).send(jobs);
  }catch(err){
      res.status(400).send("Unable to retrieve data!");
  }

})





  // .post(jobsControllers.createJob)
  // .patch(jobsControllers.updateJob)
  // .delete(jobsControllers.deleteJob);





module.exports = router;
