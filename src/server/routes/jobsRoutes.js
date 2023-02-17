const express = require("express");
const router = express.Router();
const jobsControllers = require("../controllers/jobsController");
const Job = require("../models/Job");


//returns all jobs available
// router.get('/', async (req, res) => {

//   try{
//     const jobs = await Job.find();
//     res.status(200).json(jobs);
//   }catch(err){
//       res.status(500).json( {message: "Unable to retrieve all jobs."});
//       console.log(err);
//   }
// })
router.get('/', jobsControllers.getAllJobs)

//returns all information of a specific job_id
// router.get('/:jobId', async (req, res) => {

//     try{
//         const job = await Job.findOne({job_id: req.params.jobId});
//         res.send(job);
//     }catch(err){
//         res.status[400].json({message: "Something went wrong."})
//     }
  
// })

router.get('/:jobId', jobsControllers.getJobDetails)







module.exports = router;
