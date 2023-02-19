const request = require('supertest');
const app = require('../index')
const mongoose = require("mongoose");



beforeAll(() => {
    mongoose.connect(process.env.DATABASE)
})

beforeAll(async() => {
    // Create a new user to upload files for
    const userResponse = await request(app)
        .post("/users")
        .send({
            firstname: "John",
            lastname: "Doe",
            email: "johndoe@example.com",
            password: "password",
            jobsApplied: ["test", "test"],
        })
        .then()
    userId = userResponse.body.id;


});



afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.disconnect();
    done();
    app.close();
});



describe('GET /users/:id/jobsApplied', function() {
    it("it successfully returns an array of all the jobs a specific user has applied for", async() => {

        await request(app)
            .get(`/users/${userId}/jobsApplied`)
            .expect(200);
    })

    // describe('POST /user/:id/jobsApplied', function() {
    //     it("it successfully adds a job id to the jobsApplied attribute", async() => {

    //         await request(app)
    //             .post("/users/63edb27d0e77e161a004824c/jobsApplied", {
    //                 userId: userId,
    //                 jobId: '2142412'
    //             })
    //             .expect(201);
    //     })
    // })
})