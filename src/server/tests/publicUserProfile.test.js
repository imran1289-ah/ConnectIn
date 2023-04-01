const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");

beforeAll(async() => {
    // Connects to the DB
    mongoose.connect(process.env.DATABASE);
});

afterAll(async() => {
    await mongoose.disconnect();
    app.close();
});

//Test to check if a user is found on the database
describe("GET profile", function() {
    it("successfully searches for a user and provides their details", async() => {
        await request(app).get("/search?term=test").expect(200);
    });
});