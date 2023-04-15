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
  receivedApplications: [],
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
    Enumerator: ["User", "Recruiter", "Administrator"],
    required: true,
  },
  preferences: {
    category: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    work_type: {
      type: String,
      required: true,
    },
  },
  isBan: {
    type: Boolean,
  },
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
