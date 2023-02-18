const Job = require("../models/Job");
const bcrypt = require("bcrypt");




const getAllJobs = async (req, res) => {

    try{
        const jobs = await Job.find();
        res.status(200).json(jobs);
      }catch(err){
          res.status(500).json( {message: "Unable to retrieve all jobs."});
          console.log(err);
      }
    };


const getJobDetails = async(req, res) => {
    try{
        const job = await Job.findOne({job_id: req.params.jobId});
        res.send(job);
    }catch(err){
        res.status[400].json({message: "Something went wrong."})
    }
}
    
const createJob = async (req, res) => {
  try {
    const { job_id, description, salary, company, category, title, location } =
      req.body;
    const newJob = new Jobs({
      job_id,
      description,
      salary,
      company,
      category,
      title,
      location,
    });
    const savedJob = await newJob.save();
    res.status(200).json(savedJob);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// const getJobs = async (req, res) => {
//   try {
//     const jobs = await Jobs.find();
//     res.status(200).json(jobs);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };







module.exports = {
    
getAllJobs,
getJobDetails,
// getJobs,
createJob

}