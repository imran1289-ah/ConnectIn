const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
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
    res.status(201).json({ message: "User successfully created!" });
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
      req.session.email = user.email;
      console.log(`Found user ${user.email}`);
      res.status(200).json(user);
    } else {
      return res.status(404).json({
        errors: [{ user: "not found" }],
      });
    }
  });
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

const updateUser = async (req, res) => {};

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

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  verifyUser,
  getUserInfo,
  getUser,

  //getUserByEmail
};
