const request = require('supertest');
const app = require('../index')
const mongoose = require("mongoose");
const server = require('../index');



beforeAll(() => {
    mongoose.connect(process.env.DATABASE)
})



afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.disconnect();
    done();
    server.close();
  }) ;



  describe('GET /users/:id/jobsApplied', function(){
    it("it successfully returns an array of all the jobs a specific user has applied for", async () =>{

        await request(app)
            .get("/users/63edb27d0e77e161a004824c/jobsApplied")
            .expect(200);
    })

    describe('POST /user/:id/jobsApplied', function() {
        it("it successfully adds a job id to the jobsApplied attribute", async ()=>{

            await request(app)
                .post("/users/63edb27d0e77e161a004824c/jobsApplied", {
                    userId: '63edb27d0e77e161a004824c',
                    jobId: '2142412'
                })
                .expect(201);
        })
    })
})


