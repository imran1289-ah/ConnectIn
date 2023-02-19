const request = require('supertest');
const app = require('../index');
const mongoose = require("mongoose");
const User = require("../models/user");

let userId;

beforeAll(async () => {
  // Connects to the DB
  mongoose.connect(process.env.DATABASE);

  // Create a new user to upload files for
  const userResponse = await request(app)
    .post("/users")
    .send({
      firstname: "John",
      lastname: "Doe",
      email: "johndoe@example.com",
      password: "password",
    });
  userId = userResponse.body.id;

});
afterAll(async () => {

    // Delete the user from the database after running all the tests
    await User.findByIdAndDelete(userId);
    
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.disconnect();
    app.close();
});

describe('GET /users', function(){
  it("successfully logs in when valid information provided", async () => {
    await request(app)
      .get("/users")
      .send({email: "johndoe@example.com",
            password: "password"})
      .expect(200);
  })
});

describe('GET /users', function(){
  it("does not login when invalid information provided", async () => {
    await request(app)
      .get("/users")
      .send({email: "test@gmail.com",
            password: "test123"})
      .expect(404);
  })
});



