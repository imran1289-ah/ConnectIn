const request = require('supertest');
const app = require('../index');
const mongoose = require("mongoose");
const Job = require('../models/Job');

let jobId;
// Connects to the DB
beforeAll(() => {
    mongoose.connect(process.env.DATABASE)
})

afterAll(async() => {
    await Job.findByIdAndDelete(jobId);
});
// Closing the DB connection allows Jest to exit successfully.
afterAll((done) => {
    mongoose.disconnect();
    done();
    app.close();

});


describe('GET /jobs', function() {


    const createJob = new Job({
        job_id: 12345,
        title: "Test Title",
        description: "This is a test description.",
        salary: 95000,
        company: "ConnectIn",
        category: "Part-Time",
        location: "Hybrid"
    });
    createJob.save();
    jobId = createJob.job_id;

    it("Succesfully Grabs data information from the database, given a valid job id", async() => {
        job_Id = jobId;
        await request(app)
            .get(`/jobs/edit/${jobId}`)
            .expect(200);
    });
    it("Fails to grab data information from the database," +
        " given an invalid job id", async() => {
            jobId = null;
            await request(app)
                .get(`/jobs/edit/${jobId}`)
                .expect(400);
        });

    // Job.find({job_id: jobId}).remove().exec();
});

describe('POST /jobs', function() {

    let jobId;

    const createJob = new Job({
        job_id: 54321,
        title: "Title Test",
        description: "This is a description test.",
        salary: 95300,
        company: "InConnect",
        category: "Full-Time",
        location: "On-Site"
    });
    createJob.save();
    jobId = createJob.job_id;

    it("Successfully updates job information, given valid data", async() => {
        await request(app)
            .post(`/jobs/edit/${jobId}`)
            .send({
                job_id: jobId,
                title: "Changed Title",
                description: "This is a changed description 333",
                salary: 12345,
                category: "Full-Time",
                location: "Part-Time"
            })
            .expect(200)
    });
    it("Fails to update job information, given invalid job id", async() => {
        await request(app)
            .post('/jobs/edit/null')
            .send({
                job_id: null,
                title: "Changed Null",
                description: "This is a changed description",
                salary: 12345,
                category: "Full-Time",
                location: "Part-Time"
            })
            .expect(400)
    })
    it("Fails to update job information, given valid id and invalid information", async() => {
        await request(app)
            .post(`/jobs/edit/${jobId}`)
            .send({
                job_id: jobId,
                title: 12345,
                description: "This is a changed description",
                salary: "Test",
                category: "Full-Time",
                location: "Part-Time"
            })
            .expect(500)
    })

    // Job.find({ job_id: jobId }).remove().exec();
});