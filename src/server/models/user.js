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
    jobsAppliedObject:[],
    volunteering: [],
    connections: [],
    education: [],
    skills: [],
    workExp: [],
    contact: Number,
    waitingConnections: [],
    languages: [],
    postsMade: [],
    role: {
        type: String,
        Enumerator: ["User","Recruiter","Administrator"],
        required: true
    },
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
 
