const request = require('supertest');
const app = require('../index')
const mongoose = require("mongoose");
const User = require('../models/user');
const Job = require('../models/Job')

//Mongodb Connection
beforeAll(() => {
    mongoose.connect(process.env.DATABASE)
})




afterAll(async() => {
    
    
    mongoose.disconnect();
    app.close();
   
});


it("should send a notification", async () =>{

    const userID = "6417d6c09fb7a5a0803b711e";
    const response = await request(app)
    
    .get(`/users/notifications/${userID}`);

    console.log(response)
        
    expect(response.statusCode).toBe(200);
    expect(response.body.latestJob).toBeDefined();
    expect(response.body.latestJob.category || response.body.latestJob.location || response.body.latestJob.work_type).toBeDefined();

        
})