const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { db } = require("../models/user");
var sesh;

const createUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // Checking if all fields are filled.
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "Please fill out all fields!" });
  }

  // Checks if a duplicate user exists on the database
  const isThereADuplicate = await User.findOne({ email }).lean().exec();
  if (isThereADuplicate) {
    return res
      .status(409)
      .json({ message: "A user with this email already exists." });
  }

  // Hashing passwords to encrypt user data
  //const hashPwd = await bcrypt.hash(password,10)
  const userDocument = { firstname, lastname, email, password };
  const newUser = await User.create(userDocument);

  if (newUser) {
    res
      .status(201)
      .json({ message: "User successfully created!", id: newUser._id });
  } else {
    res.status(400).json({ message: "User unsuccessfully created." });
  }
});

const getUserByEmail = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      console.log(`Found user ${user.email}`);
      res.status(200).json(user);
    } else {
      return res.status(400).json({ message: "No user found" });
    }
  });
};

// This action is to verify the credentials of the user when logging in
const verifyUser = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  }).then((user) => {
    if (user) {
      const userSession = {
        email: user.email,
        user_id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
      };
      req.session.user = userSession;
      console.log(`Found user ${user.email}`);
      res.status(200).json({ sessionID: req.sessionID });
    } else {
      return res.status(404).json({
        errors: [{ user: "not found" }],
      });
    }
  });
};

//This will be used to update the user's profile information
const updateUser = async (req, res) => {};
//Action of deleting  a user from awaiting connections list
const deleteAwaitingConnections = async (req, res) => {
  const { firstname, lastname } = req.body;
  const _id = "63f41b0123e995b64434ece0";
  const user = await User.findOneAndUpdate(
    { _id: _id },
    {
      $pull: {
        waitingConnections: { firstname: firstname, lastname: lastname },
      },
    }
  );
  if (user) {
    console.log("Succesfully updated awaiting connections");
    res.status(200).json({ message: "Succesfully deleted user " });
  } else {
    return res.status(404).json({
      message: "Error not found",
    });
  }
};
//Action of transferring a connection from awaiting connections list to connections list
const updateConnections = async (req, res) => {
  const { firstname, lastname } = req.body;
  const _id = "63f41b0123e995b64434ece0";
  const user = await User.findOneAndUpdate(
    { _id: _id },
    { $addToSet: { connections: { firstname: firstname, lastname: lastname } } }
  );
  if (user) {
    console.log("Succesfully updated awaiting connections");
    res.status(200).json({ message: "Succesfully added user to connections" });
  } else {
    return res.status(404).json({
      message: "Error not found",
    });
  }
};

//Action to add user's name and Id to another user's AwaitingConnections
const updateAwaitingConnections = async (req, res) => {
  const { _id } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: _id },
    {
      $addToSet: {
        waitingConnections: { firstname: "Ittle", lastname: "doo" },
      },
    }
  );
  if (user) {
    console.log("Succesfully updated awaiting connections");
    res.status(200).json({ message: "Succesfully added user `${_id}`" });
  } else {
    return res.status(404).json({
      message: "Error not found",
    });
  }
  //return res.status(200).json({message:"sent request sucessfully"});
};

//Action to retrieve waiting connections
const getAwaitingConnections = async (req, res) => {
  const id = "63f41b0123e995b64434ece0";
  const user = await User.findById(id);
  if (user) {
    res.status(200).json(user.waitingConnections);
  } else {
    return res.status(404).json({
      message: "Error not found",
    });
  }
};
//get user by ID
const getUser = (req, res, next) => {
  const userId = req.params._id;
  console.log(userId);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    })
    .catch((err) => {
      res.status(500).json({ message: "Fetching user failed" });
    });
};

//const updateUser = async (req, res) => {};

//Action to return list user's based on the firstname
const search = async (req, res) => {
  const firstname = req.query.term;

  const users = await User.find({
    firstname: { $regex: firstname, $options: "i" },
  }).then((users) => {
    if (users) {
      res.status(200).json(users);
    } else {
      return res.status(400).json({ message: "No user exists with this name" });
    }
  });
};
const deleteUser = async (req, res) => {};

//Action to return public user info
const getUserInfo = async (req, res) => {
  const user = await User.findById(req.params.id).then((user) => {
    if (user) {
      console.log(`Found user ${user}`);
      res.status(200).json(user);
    } else {
      return res.status(400).json({ message: "No user found" });
    }
  });
};

//Action to edit the user profile
const editUserInfo = async (req, res) => {
  const {
    email,
    bio,
    headLine,
    languages,
    education,
    volunteering,
    skills,
    workExp,
  } = req.body;
  User.findByIdAndUpdate(req.params.id)
    .then((user) => {
      if (email) {
        user.email = email;
      }
      if (bio) {
        user.bio = bio;
      }
      if (headLine) {
        user.headLine = headLine;
      }
      if (languages.length > 0) {
        user.languages = languages;
      }
      if (education.length > 0) {
        user.education = education;
      }
      if (volunteering.length > 0) {
        user.volunteering = volunteering;
      }
      if (skills.length > 0) {
        user.skills = skills;
      }
      if (workExp.length > 0) {
        user.workExp = workExp;
      }

      user
        .save()
        .then(() => {
          console.log("User was updated in the database");
          console.log(user);
          res.status(200).json(user);
          res.end();
        })
        .catch((err) => console.log(err));
    })
    .catch(() => {
      res
        .status(400)
        .json({ message: "Unexpected error when finding user by ID" });
    });
};

//Gets a list of all the jobs applied for a specific user
const getUserJobsApplied = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    return res.status(200).json(user.jobsApplied);
  } catch (err) {
    res.status(400).json({ message: "Unable to retrieve jobs applied." });
  }
};

const addJobAppliedToUser = async (req, res) => {
  User.findById(req.body.userId).then((user) => {
    const array = user.jobsApplied;
    array.push(req.body.jobId);
    user.jobsApplied = array;
    user
      .save()
      .then(() => {
        console.log("Job id succesfully added to user!");
      })
      .catch((err) => console.log(err));
  });
  res.send(201);
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  verifyUser,
  getUserInfo,

  updateConnections,
  updateAwaitingConnections,
  getAwaitingConnections,
  deleteAwaitingConnections,

  //getUserByEmail
  editUserInfo,

  getUserJobsApplied,
  addJobAppliedToUser,
  getUser,
};
