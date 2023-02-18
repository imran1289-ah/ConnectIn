const request = require('supertest');
const app = require('../index')
const mongoose = require("mongoose")

// Connects to the DB
beforeAll(() => {
 mongoose.connect(process.env.DATABASE)
})

// Closing the DB connection allows Jest to exit successfully.
afterAll((done) => {
  mongoose.disconnect();
  done();
  app.close();
})

describe('GET /jobs', function(){
    it("Succesfully Grabs data information from the database, given a valid job id", async () => {
        jobId = 1;
        await request(app)
        .get(`/jobs/edit/${jobId}`)
        .expect(200);
    });
    it("Fails to grab data information from the database,"
    +" given an invalid job id", async () => {
        jobId = null;
        await request(app)
        .get(`/jobs/edit/${jobId}`)
        .expect(400);
    });  
});

describe ('POST /jobs', function(){
    it("Successfully updates job information, given valid data", async() => {
        await request(app)
        .post('/jobs/edit/4')
        .send({
            job_id: 4,
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
        .post('/jobs/edit/5')
        .send({
            job_id: 5,
            title: 12345,
            description: "This is a changed description",
            salary: "Test",
            category: "Full-Time",
            location: "Part-Time"
        })
        .expect(500)
    })
})