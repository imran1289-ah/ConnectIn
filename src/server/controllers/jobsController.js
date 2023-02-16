const Jobs = require('../models/Job');
const asyncHandler = require('express-async-handler')

// @desc Find Job from ID
// @route GET /jobs
// @access Private
const fetchJobData = asyncHandler(async(req, res) => {
    const jobData = await Jobs.findOne(req.params.job_id).then((job) => {
        if (job){
            res.status(200).json(job);
        } else {
            return res.status(400).json({ message: "No job exists with this id" });
        }
    });
})
    
const updateJobData = asyncHandler(async(req, res) => {
    const {job_id, title, description, salary, category, location} = req.body
    
    if (!job_id || !title || !description || !salary || !category || !location) {
        return res.status(400).json({message: "Please fill out all fields!"})
    }

    // Checks if the job posting exists by id
    const jobPosting = await Jobs.findOne({job_id: job_id}).exec()
    if (!jobPosting){
        return res.status(400).status({message: "Job Posting Not Found!"})
    }

    const updatedJobPosting = await Jobs.findOneAndUpdate({job_id: job_id},{
        title: title,
        description: description,
        salary: salary,
        category: category,
        location: location
    })

    res.json({message: 'Succesfully Updated Job Posting!'})
})

module.exports = {
    fetchJobData,
    updateJobData
}