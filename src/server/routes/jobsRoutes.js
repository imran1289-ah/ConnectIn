const express = require("express");
const router = express.Router();
// const jobsControllers = require("../controllers/jobsController");
const Job = require("../models/Job");

router.get('/', async (req, res) => {

  try{
    const jobs = await Job.find();
    res.status(200).json(jobs);
  }catch(err){
      res.status(500).json( {message: "Unable to retrieve all jobs."});
      console.log(err);
  }
})

router.get('/:jobId', async (req, res) => {

    try{
        const job = await Job.findOne({job_id: req.params.jobId});
        res.send(job);
    }catch(err){
        res.status[400].json({message: "Something went wrong."})
    }


  // try{
  //   const job = await Job.findOne({}, "job_id");
  //   res.status(200).json(job);


  // }catch(err){
  //   res.status(500).json( {message: "Unable to retrieve specific job."});
  //   console.log(err)
  // }
  
})

router.post("/jobs", async (req, res) => {
    
}
)





  // .post(jobsControllers.createJob)
  // .patch(jobsControllers.updateJob)
  // .delete(jobsControllers.deleteJob);





module.exports = router;
