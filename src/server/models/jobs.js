const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobSchema = new Schema({


    job_id: {
        type: Number,
        required: true
    },

    job_title: {
        type: String,
        required: true
    },

    salary: {
        type: Number,
        required: false

    },

    contract_type: {
        type: String,
        required: false
    },

    other: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Jobs", jobSchema);
