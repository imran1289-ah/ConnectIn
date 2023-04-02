const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const User = require("../models/user");
const Job = require("../models/Job");


beforeAll(() => {
    mongoose.connect(process.env.DATABASE)
})

afterAll(async() => {


    mongoose.disconnect();
    app.close();

});
describe("addJobAppliedToUser function", () => {
    let user;
    let job;

    beforeAll(async() => {

        user = await User.create({
            firstname: "John",
            lastname: "Doe",
            email: "johndoe@example.com",
            password: "password123",
            preferences: {
                category: 'Test Category',
                location: 'Test Location',
                work_type: 'Test Work Type',
            },
            role: "User"
        });
        job = await Job.create({
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
        jobId = job.job_id;
    });

    afterAll(async() => {
        await User.findByIdAndDelete(user._id);
        await Job.findOneAndDelete({ job_id: jobId });
    });

    it("should add the job id to the user's jobsApplied array", async() => {
        const res = await request(app)
            .post(`/users/${user._id}/jobsApplied`)
            .send({ userId: user._id, jobId: job.job_id });
        expect(res.statusCode).toEqual(201);
        const updatedUser = await User.findById(user._id);
        expect(updatedUser.jobsApplied.length).toEqual(1);
        expect(updatedUser.jobsApplied[0].job_id).toEqual(job.job_id);
    });


});