const request = require("supertest");
const app = require("../index.js");
const mongoose = require("mongoose");
const User = require("../models/user");

afterAll(async() => {
  await mongoose.disconnect();
  app.close();
})

describe("Posts", () => {
  let userID;

  beforeEach(async () => {
    mongoose.connect(process.env.DATABASE);
    const res = await request(app).post("/users").send({
      firstname: "Hello",
      lastname: "World",
      email: "helloworld@example.com",
      password: "test123",
      role: "User"
    });
    userID = res.body.id;
    console.log(userID)
  });

  afterEach(async () => {
    // Remove the test from the database
    await User.findByIdAndDelete(userID);
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

  
  describe("GET /:id/posts", () => {
    it("Successfully fetches the posts made by user", async() => {
      const res = await request(app)
      .get(`/users/${userID}/posts`);

      expect(res.statusCode).toEqual(200);
    })
  })
});
