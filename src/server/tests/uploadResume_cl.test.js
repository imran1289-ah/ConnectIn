const request = require("supertest");
const app = require("../index");
const User = require("../models/user");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

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
                role: "User"
            })
            .then()
        userId = userResponse.body.id;

        // console.log(userId);


    });
    afterAll(async() => {
        try {
            const resumeFilePath = path.join(__dirname, "..", "uploads", `${userId}-resume.pdf`);
            const coverLetterFilePath = path.join(__dirname, "..", "uploads", `${userId}-coverLetter.pdf`);
            // console.log(`Resume file path: ${resumeFilePath}`);
            // console.log(`Cover letter file path: ${coverLetterFilePath}`);

            await fs.promises.unlink(resumeFilePath);
            console.log(`Deleted resume file: ${resumeFilePath}`);

            await fs.promises.unlink(coverLetterFilePath);
            console.log(`Deleted cover letter file: ${coverLetterFilePath}`);
        } catch (error) {
            console.error(`Error deleting files: ${error}`);
        }

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