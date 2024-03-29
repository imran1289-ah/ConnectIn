const request = require("supertest");
const app = require("../index.js");
const mongoose = require("mongoose");
const Jobs = require("../models/Job");
describe("Jobs", () => {
    let jobId;

    afterAll(async() => {
        // Remove the test job from the database
        await Jobs.findByIdAndDelete(jobId);
    });

    afterAll((done) => {
        // Closing the DB connection allows Jest to exit successfully.
        mongoose.disconnect();
        done();
        app.close();
    });


    it("should create a new job", async() => {
        const res = await request(app).post("/jobs/create").send({
            job_id: 1,
            recruiter_id: 2,
            description: "test description",
            salary: 100000,
            company: "test company",
            category: "test category",
            title: "test title",
            location: "test location",
            work_type: "Full-Time",
            thirdParty: true
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.job_id).toEqual(1);
        expect(res.body.recruiter_id) === (2);
        expect(res.body.description).toEqual("test description");
        expect(res.body.salary).toEqual(100000);
        expect(res.body.company).toEqual("test company");
        expect(res.body.category).toEqual("test category");
        expect(res.body.title).toEqual("test title");
        expect(res.body.location).toEqual("test location");
        expect(res.body.work_type).toEqual("Full-Time");
        expect(res.body.thirdParty).toEqual(true);
        jobId = res.body._id; // Save the job ID for the teardown function
    });
});