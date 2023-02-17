const Job = require("../models/Job");
const bcrypt = require("bcrypt");



const createJob = () => {

}

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
    







module.exports = {
    
getAllJobs,
getJobDetails
}