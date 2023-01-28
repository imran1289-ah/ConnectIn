const request = require('supertest');
const app = require('../index')
const mongoose = require("mongoose")

beforeAll(() => {
 mongoose.connect(process.env.DATABASE)
})

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.disconnect();
  done();
}) 

describe('GET /users', function(){
  it("successfully logs in when valid information provided", async () => {
    await request(app)
      .get("/users")
      .send({email: "test@mail.com",
            password: "test123"})
      .expect(200); // successfully logged in
  })
});

describe('GET /users', function(){
  it("does not login when invalid information provided", async () => {
    await request(app)
      .get("/users")
      .send({email: "test@gmail.com",
            password: "test123"})
      .expect(404); // failed to log in
  })
});



