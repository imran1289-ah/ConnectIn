const request = require('supertest');
const app = require('../index');
const mongoose = require("mongoose");
const Jobs = require('../models/Job');

let jobId, createJob, savedJob;

beforeAll(async() => {
    await mongoose.connect(process.env.DATABASE);
});

afterAll(async() => {
    await Jobs.findByIdAndDelete(jobId);
    await mongoose.disconnect();
    app.close();
});

describe('GET /jobs', () => {
    beforeAll(async() => {
        createJob = new Jobs({
            job_id: 12345,
            recruiter_id: 'test_recruiter_id',
            title: "Test Title",
            description: "This is a test description.",
            salary: 95000,
            company: "ConnectIn",
            category: "Part-Time",
            location: "Hybrid",
            work_type: "Full-Time",
            thirdParty: false,
        });
        const savedJob = await createJob.save();
        jobId = savedJob._id;
    });

    it("Succesfully Grabs data information from the database, given a valid job id", async() => {
        await request(app)
            .get(`/jobs/edit/${createJob.job_id}`)
            .expect(200);
    });

    it("Fails to grab data information from the database, given an invalid job id", async() => {
        await request(app)
            .get(`/jobs/edit/invalid_id`)
            .expect(400);
    });
});

describe('POST /jobs', () => {
    beforeAll(async() => {
        const createJob = new Jobs({
            job_id: 54321,
            recruiter_id: 'test_recruiter_id',
            title: "Title Test",
            description: "This is a description test.",
            salary: 95300,
            company: "InConnect",
            category: "Full-Time",
            location: "On-Site",
            work_type: "Part-Time",
            thirdParty: false,
        });
        savedJob = await createJob.save();
        jobId = savedJob._id;
    });

    it("Successfully updates job information, given valid data", async() => {
        await request(app)
            .post(`/jobs/edit/${savedJob.job_id}`)
            .send({
                job_id: savedJob.job_id,
                title: "Changed Title",
                description: "This is a changed description 333",
                salary: 12345,
                category: "Full-Time",
                location: "Part-Time",
                work_type: "Full-Time",
                thirdParty: true,
            })
            .expect(200);
    });

    it("Fails to update job information, given invalid job id", async() => {
        await request(app)
            .post('/jobs/edit/invalid_id')
            .send({
                job_id: null,
                title: "Changed Null",
                description: "This is a changed description",
                salary: 12345,
                category: "Full-Time",
                location: "Part-Time",
                work_type: "Full-Time",
                thirdParty: true,
            })
            .expect(400);
    });

    it("Fails to update job information, given valid id and invalid information", async() => {
        await request(app)
            .post(`/jobs/edit/${savedJob.job_id}`)
            .send({
                job_id: jobId,
                title: 12345,
                description: "This is a changed description",
                salary: "Test",
                category: "Full-Time",
                location: "Part-Time",
                work_type: "Full-Time",
                thirdParty: true,
            })
            .expect(500)
    })

    // Job.find({ job_id: jobId }).remove().exec();
});