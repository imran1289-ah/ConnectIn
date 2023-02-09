const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userProfileSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
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
    education: {
        type: String,
    },
    workExp: {
        type: String,
    },
    skills: {
        type: String,
    },
    contact: {
        type: Number,
    },
    volunteering: {
        type: String,
    },
    connections: [],
});

const UserProfile = mongoose.model('UserProfile', UserProfileSchema);

module.exports = UserProfile;