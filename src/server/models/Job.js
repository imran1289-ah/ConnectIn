const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
    job_id: {
        type: Number,
        required: true,
    },
    recruiter_id: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    salary: {
        type: Number,
    },
    company: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    work_type: {
        type: String,
        required: true,
    }
});

const Jobs = mongoose.model("Jobs", jobsSchema);


module.exports = Jobs;