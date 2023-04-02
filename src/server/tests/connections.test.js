const request = require('supertest');
const app = require('../index');
const mongoose = require("mongoose");
const User = require('../models/user');

beforeAll(async() => {
  await mongoose.connect(process.env.DATABASE);
});

afterAll(async() => {
  await mongoose.disconnect();
  app.close();
});

describe("Connections", () => {
  let userId;
  let savedUser

  beforeEach(async() => {
    createUser = new User({
      firstname: "userFirstName",
      lastName: "userLastName",
      role: "User",
      waitingConnections: [],
      preferences: {
        work_type: "hybrid",
        location: "Canada",
        category: "CS"
      }
    })
    savedUser = await createUser.save();
    userId = savedUser._id;
  })

  afterEach(async() => {
    await User.findByIdAndDelete(userId);
  })

  describe("POST /searchuserlist", () => {
    it("Succesfully updates the awaiting connections", async() => {
      const res = await request(app)
      .post('/users/searchuserlist')
      .send({
        _id: userId,
        userID: "dummyUserID",
        firstname: "dummyFirstname",
        lastname: "dummyLastname"
      });
      expect(res.statusCode).toEqual(201);
    });
  });

  describe("POST /waitingConnections", () => {
    it("Successfully gets all waiting connections", async() => {
      const res = await request(app)
      .post('/users/waitingConnections')
      .send({
        user_id: savedUser._id
      });
      console.log(res);
      expect(res.statusCode).toEqual(200);
    });
  });

  describe("GET /:id/connections", () => {
    it("Successfully fetches connections", async() => {
      const res = await request(app)
      .get(`/users/${userId}/connections`)
      .expect(200)
    })
  })

});