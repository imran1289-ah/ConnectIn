const Job = require("../models/Job");
const bcrypt = require("bcrypt");



const createJob = () => {

}

const getJobs = async (req, res) => {

    res.send("joblist")
    // Job.find({}, function(err, jobs){


    //     if(err){
    //         res.status[400].json({message: "Unable to list all jobs. Error!"})
    //     }
    //     return res.status[200].json(jobs);
    // });
};



const updateJob = () => {

}

const deleteJob = () => {

}


module.exports = {
    createJob,
    getJobs,
    updateJob,
    deleteJob

}