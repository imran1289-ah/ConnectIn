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
    const firstUser = new User({
        firstname: 'Test',
        lastname: 'User',
        email: 'test@example.com',
        password: 'password',
        preferences: {
            category: 'Test Category',
            location: 'Test Location',
            work_type: 'Test Work Type',
        },
        role: "User"
    });
    await firstUser.save();
    firstUserId = firstUser._id;


    const secondUser = new User({
        firstname: 'Test',
        lastname: 'User',
        email: 'test@example.com',
        password: 'password',
        preferences: {
            category: 'Test Category',
            location: 'Test Location',
            work_type: 'Test Work Type',
        },
        role: "User"
    });
    await secondUser.save();
    secondUserId = secondUser._id;


    const firstUserInfo = await User.findById(firstUserId);
    const secondUserInfo = await User.findById(secondUserId);


    //Adding each other as connections
    firstUserInfo.connections.push({ userID: secondUserId, firstname: secondUserInfo.firstname, lastname: secondUserInfo.lastname });
    await firstUserInfo.save();
    secondUserInfo.connections.push({ userID: firstUserId, firstname: firstUserInfo.firstname, lastname: firstUserInfo.lastname });
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