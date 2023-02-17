// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const userSchema = new Schema({

//     firstname: {
//         type: String,
//         required: true
//     },
//     lastname: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });

// user.js
// replace email with _id
// Sample user creation
// const collection = mongoose.model("PublicUser2",userSchema);
// collection.create({
//     firstName: "Joe",
//     lastName: "Test",
//     email: "test@mail.com",
//     password: "test123"
// })

// module.exports = mongoose.model("PublicUser2", userSchema);

const mongoose = require('mongoose');

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
    jobsApplied: [],
    picture: Buffer,
    resume: Buffer,
    coverLetter: Buffer,
    bio: String,
    headLine: String,
    volunteering: [],
    connections: [],
    education: [],
    skills: [],
    workExp: [],
    contact: Number,
    waitingConnections: [],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;