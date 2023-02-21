const Job = require("../models/Job");
const bcrypt = require("bcrypt");
const asyncHandler = require('express-async-handler')

const getAllJobs = async (req, res) => {
    try{
        const jobs = await Job.find();
        res.status(200).json(jobs);
      }catch(err){
          res.status(500).json( {message: "Unable to retrieve all jobs."});
          console.log(err);
      }
}

const getJobDetails = async(req, res) => {
    try{
        const job = await Job.findOne({job_id: req.params.jobId});
        res.send(job);
    }catch(err){
        res.status(400).json({message: "Something went wrong."})
    }
}

const createJob = async (req, res) => {
  try {
    const { job_id, description, salary, company, category, title, location } =
      req.body;
    const newJob = new Job({
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
}

const deleteJob = async(req, res) => {
    try{
        const jobId = req.body.jobId;
        await Job.find({job_id: jobId}).remove().exec();
        res.status(200).json({message: `Successfully removed job id ${jobId}`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting this job!" });
    }
}
    
const updateJobData = asyncHandler(async(req, res) => {
    const {job_id, title, description, salary, category, location} = req.body
    
    if (!job_id || !title || !description || !salary || !category || !location) {
        return res.status(400).json({message: "Please fill out all fields!"})
    }

    // Checks if the job posting exists by id
    const jobPosting = await Job.findOne({job_id: job_id}).exec()
    if (!jobPosting) {
        return res.status(400).status({message: "Job Posting Not Found!"})
    }

    const updatedJobPosting = await Job.findOneAndUpdate({job_id: job_id},{
        title: title,
        description: description,
        salary: salary,
        category: category,
        location: location
    })
    .then((update) => {
        if(update){
            res.status(200).json({message: 'Successfully Updated Job Posting'});
        } else {
            return res.status(400).json({ message: "Error Updating the Job Posting" });
        }
    });
})

module.exports = {
    getAllJobs,
    getJobDetails,
    updateJobData,
    createJob,
    deleteJob
}