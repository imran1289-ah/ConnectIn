const mongoose = require('mongoose');

const JobsSchema = new mongoose.Schema({
    job_id: {
        type: Number,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const Jobs = mongoose.model('Job', JobsSchema);

module.exports = Jobs;