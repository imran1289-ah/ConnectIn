const Job = require("../models/Job");
const bcrypt = require("bcrypt");



const createJob = () => {

}

const getJobs = async (req, res) => {

        try{
          const jobs = await Jobs.find();
          res.status(200).json(jobs);
        }catch(err){
            res.status(500).json( {message: "Unable to retrieve all jobs."});
        }
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