const request = require('supertest');
const app = require('../index');
const Job = require('../models/Job');
const mongoose = require("mongoose");

beforeAll(async() => {

    mongoose.connect(process.env.DATABASE);
});

afterAll(async() => {
    await mongoose.disconnect();
    app.close();
});

describe('Jobs Filter', () => {
    let jobId;

    beforeEach(async() => {
        // Create a new job before each test
        const job = new Job({
            job_id: 123,
            recruiter_id: 456,
            description: 'Test job',
            salary: 50000,
            company: 'Test Company',
            category: 'Test Category',
            title: 'Test Job Title',
            location: 'Test Location',
            work_type: 'Full-Time',
            thirdParty: true
        });
        const savedJob = await job.save();
        jobId = savedJob.job_id;
    });

    afterEach(async() => {
        // Remove the job after each test
        await Job.findOneAndDelete({ job_id: jobId });
    });

    describe('GET /jobs', () => {
        it('should return all jobs', async() => {
            const res = await request(app).get('/jobs');
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
    });

    describe('POST /jobs/filter', () => {
        it('should return jobs with the specified filter', async() => {
            const res = await request(app)
                .post('/jobs/')
                .send({ category: 'Test Category', location: 'Test Location', work_type: 'Full-Time' });
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body[0].category).toEqual('Test Category');
            expect(res.body[0].location).toEqual('Test Location');
            expect(res.body[0].work_type).toEqual('Full-Time');
        });
    });

    describe("deleteJob", () => {
        let jobId;

        it("should create a new job", async() => {
            const res = await request(app)
                .post("/jobs/create")
                .send({
                    job_id: 1,
                    recruiter_id: "recruiter1",
                    description: "Test job",
                    salary: 1000,
                    company: "Test company",
                    category: "Test category",
                    title: "Test title",
                    location: "Test location",
                    work_type: "Full-time",
                    thirdParty: false,
                    jobLink: "https://testjob.com"
                });
            expect(res.statusCode).toEqual(200);
            jobId = res.body.job_id;
        });

        afterAll(async() => {

            // Disconnect from the test database
            await mongoose.connection.close();
        });

        it("should delete the job", async() => {
            const res = await request(app).post(`/jobs/delete/${jobId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual(`Successfully removed job id ${jobId}`);
        });


    });
});