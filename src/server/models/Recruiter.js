const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
    recruiter_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    logo: {
        type: Buffer
    },
    jobs: [{
        type: Number,
    }]
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

module.exports = Recruiter;