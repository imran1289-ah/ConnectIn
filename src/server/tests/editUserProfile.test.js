jest.setTimeout(10000);
const request = require("supertest");
const app = require("../index");
const User = require("../models/user");
const mongoose = require("mongoose");


let userId;

beforeAll(async() => {
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
            role: "User"
        })
    userId = userResponse.body.id;

});
afterAll(async() => {

    // Delete the user from the database after running all the tests
    await User.findByIdAndDelete(userId);

    // Closing the DB connection allows Jest to exit successfully.
    app.close();
});

//Test to check if a user is found on the database
describe("PATCH profile", function() {
    it("successfully edits the user profile", async() => {
        await request(app)
            .patch(`/users/profile/${userId}`)
            .send({
                email: "test@hotmail.com",
                bio: "Concordia Student",
                headLine: "Looking for Summer 2023 internship",
                skills: ["C#"],
                workExp: ["QA"],
                languages: ["English"],
                education: ["McGill"],
                volunteering: ["Grocery bagger"],
                role: "User"
            })
            .expect(200);
    });
});

//Test to check if a user is found on the database
describe("PATCH profile", function() {
    it("error when finding the user by ID on the edit profile page", async() => {
        await request(app)
            .patch('/users/profile/test')
            .send({
                email: "test@hotmail.com",
                bio: "Concordia Student"
            })
            .expect(400)
            .then((response) => {
                expect(response.text).toBe('{"message":"Unexpected error when finding user by ID"}')
            })
    });
});