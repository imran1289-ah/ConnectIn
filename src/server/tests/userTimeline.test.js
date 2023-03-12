const request = require("supertest");
const app = require("../index.js");
const mongoose = require("mongoose");
const User = require("../models/user");
describe("Posts", () => {
  let userID;

  beforeAll(async () => {
    mongoose.connect(process.env.DATABASE);
    const res = await request(app).post("/users").send({
      firstname: "Hello",
      lastname: "World",
      email: "helloworld@example.com",
      password: "test123",
      role: "User"
    });
    userID = res.body.id;
  });

  afterAll(async () => {
    // Remove the test from the database
    await User.findByIdAndDelete(userID);
  });

  afterAll(done => {
    mongoose.disconnect();
    done();
    app.close();
  });

  it("succesful new post creation", async () => {
    const res = await request(app).post("/users/post").send({
      _id: userID,
      firstname: "Hello",
      lastname: "World",
      description: "This is a description",
      timestamp: Date.now()
    });
    expect(200);
  });
});
