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
    job_description: {
        type: String,
        required: true
    },

    salary: {
        type: Number,
        required: true

    },

    contract_type: {
        type: String,
        required: true
    },

    other: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Jobs", jobSchema);
