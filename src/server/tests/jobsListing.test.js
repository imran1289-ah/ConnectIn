const request = require('supertest');
const app = require('../index')
const mongoose = require("mongoose");



beforeAll(() => {
    mongoose.connect(process.env.DATABASE)
})


afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.disconnect();
    done();
    app.close();
})



describe('GET /jobs', function() {
    it("it successfully gets an array of all the jobs posted on ConnectIn", async() => {

        await request(app)
            .get("/jobs")
            .expect(200);

    })
})

describe('GET /jobs/:id', function() {
    it("it successfully returns a JSON of a specific jobId", async() => {

        await request(app)
            .get("/jobs/1234131231242")
            .expect(200);
    })
})