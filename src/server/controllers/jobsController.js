const Jobs = require('../models/Job');
const asyncHandler = require('express-async-handler')

// @desc Find Job from ID
// @route GET /jobs
// @access Private
const fetchJobData = asyncHandler(async(req, res) => {
    /* Placeholder for grabbing a random job
    Will remove once the view Jobs page is implemented
    with an edit button.
    const jobData = await Jobs.findOne(req.params.job_id)
    */
    const {job_id} = req.body;
    const jobData = await Jobs.findOne({job_id}).then((job) => {
        if (job){
            console.log(job);
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
    if (!jobPosting) {
        return res.status(400).status({message: "Job Posting Not Found!"})
    }

    const updatedJobPosting = await Jobs.findOneAndUpdate({job_id: job_id},{
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
    fetchJobData,
    updateJobData
}