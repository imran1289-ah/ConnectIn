const request = require('supertest');
const app = require('../index')
const mongoose = require("mongoose");
const User = require('../models/user');


//Mongodb Connection
beforeAll(() => {
    mongoose.connect(process.env.DATABASE)
})

//Create dummy users
beforeAll(async() => {
    const firstUser = await request(app)
        .post("/users")
        .send({
            firstname: "John",
            lastname: "Doe",
            email: "johndoe@example.com",
            password: "password",
            role: "User",
            connections:[],
        })
        .then()
    firstUserId = firstUser.body.id;

    const secondUser = await request(app)
        .post("/users")
        .send({
            firstname: "Jane",
            lastname: "Doe",
            email: "janedoe@example.com",
            password: "password",
            role: "User",
            connections:[],
        })
        .then()
    secondUserId = secondUser.body.id;

    const firstUserInfo = await User.findById(firstUserId);
    const secondUserInfo = await User.findById(secondUserId);


    //Adding each other as connections
    firstUserInfo.connections.push({userID:secondUserId, firstname:secondUserInfo.firstname, lastname:secondUserInfo.lastname});
    await firstUserInfo.save();
    secondUserInfo.connections.push({userID:firstUserId, firstname:firstUserInfo.firstname, lastname:firstUserInfo.lastname});
    await secondUserInfo.save();
});

afterAll(async() => {
    // Delete the dummy users from the database after running all the tests
    await User.findByIdAndDelete(firstUserId);
    await User.findByIdAndDelete(secondUserId);
    mongoose.disconnect();
    app.close();
   
});

//Invoke the remove connection controller
describe('Remove Connection', function() {
    it("it remove connections", async() => {
        const response = await request(app)
        .delete(`/users/removeConnection/${firstUserId}/connections/${secondUserId}`)
        .expect(200);
    })
})

