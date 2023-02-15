const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");

// Connects to the DB
beforeAll(() => {
  mongoose.connect(process.env.DATABASE);
});

// Closing the DB connection allows Jest to exit successfully.
afterAll((done) => {
  mongoose.disconnect();
  done();
  app.close();
});

//Test to check if a user is found on the database
describe("GET profile", function () {
  it("successfully searches for a user and provides their details", async () => {
    await request(app).get("/users/search?term=test").expect(200);
  });
});
