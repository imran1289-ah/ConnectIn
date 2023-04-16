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
        role: "User",
        isBan:false,
    });
    await firstUser.save();
    firstUserId = firstUser._id;
});

afterAll(async() => {
    // Delete the dummy users from the database after running all the tests
    await User.findByIdAndDelete(firstUserId);
    mongoose.disconnect();
    app.close();

});

//test all users controllers
describe('Get all users', function() {
    it("it gets all the users", async() => {
        const response = await request(app)
            .get(`/admin/users`)
            .expect(200);
    })
})

describe('Edit user', function() {
    it("it edit users", async() => {
        const response = await request(app)
            .post(`/admin/edit/${firstUserId}`)
            .send({
                email:"JaneDoe@test.com",
                password:"12345",
                role:"Recruiter",
            })
            .expect(200);
    })
})

describe('Ban users', function() {
    it("it bans the user", async() => {
        const response = await request(app)
            .post(`/admin/ban/${firstUserId}`, {
                isBan:true
            })
            .expect(200);
    })
})

describe('unban user', function() {
    it("it unban the users", async() => {
        const response = await request(app)
            .post(`/admin/unban/${firstUserId}`, {
                isBan:false
            })
            .expect(200);
    })
})