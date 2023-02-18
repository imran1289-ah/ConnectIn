const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    picture: {
        type: Buffer,
    },
    resume: {
        type: Buffer,
    },
    coverLetter: {
        type: Buffer,
    },
    bio: {
        type: String,
    },
    headLine: {
        type: String,
    },
    contact: {
        type: Number,
    },
    jobsApplied: [],
    volunteering: [],
    connections: [],
    education: [],
    skills: [],
    workExp: [],
    languages: [],

});

const User = mongoose.model("Users", UserSchema);




module.exports = User;
