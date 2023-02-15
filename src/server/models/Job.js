const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
    job_id: {
        type: Number,
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
    },
    title: {
        type: String,
        required: true,
    },
});

const Jobs = mongoose.model("Jobs", jobsSchema);

// Jobs.create({
//     job_id:12341312342323,
//     description: "test2",
//     salary: 123,
//     company: "testCompany2",
//     category:"Software",
//     title: "testTitle2"
// })

module.exports = Jobs;