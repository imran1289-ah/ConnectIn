const request = require("supertest");
const app = require("../index");
const User = require("../models/user");
const mongoose = require("mongoose");

beforeAll(() => {
    mongoose.connect(process.env.DATABASE);
  });
  
  // Closing the DB connection allows Jest to exit successfully.
  afterAll((done) => {
    mongoose.disconnect();
    done();
    app.close();
  });

describe("Resume and Cover Letter Upload", () => {

    let userId;

    beforeAll(async() => {
        // Create a new user to upload files for
        const userResponse = await request(app)
            .post("/users")
            .send({
                firstname: "John",
                lastname: "Doe",
                email: "johndoe@example.com",
                password: "password",
            })
            .then()
        userId = userResponse.body.id;

        console.log(userId);


    });
    afterAll(async() => {
        // Delete the user from the database after running all the tests
        await User.findByIdAndDelete(userId);
    });

    it("should upload resume for a specific user", async() => {
        const response = await request(app)
            .post(`/resume/uploadResume/${userId}`)
            .attach("resume", "tests/test-resume.pdf")
            .expect(200);

    });

    it("should upload cover letter for a specific user", async() => {
        const response = await request(app)
            .post(`/resume/uploadCoverLetter/${userId}`)
            .attach("coverLetter", "tests/test-cover-letter.pdf")
            .expect(200);

    });

    it("should get resume for a specific user", async() => {
        const response = await request(app)
            .get(`/resume/getResume/${userId}`)
            .expect("Content-Type", "application/pdf")
            .expect("Content-Disposition", `attachment; filename=${userId}-resume.pdf`)
            .expect(200);
    });

    it("should get cover letter for a specific user", async() => {
        const response = await request(app)
            .get(`/resume/getCoverLetter/${userId}`)
            .expect("Content-Type", "application/pdf")
            .expect(
                "Content-Disposition",
                `attachment; filename=${userId}-coverLetter.pdf`
            )
            .expect(200);
    });
});