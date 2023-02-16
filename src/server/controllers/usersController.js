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

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

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


const getUserSpecfificJobApplied = async (req, res) =>{
        try{
            
        }catch(err){

        }
}

const addJobAppliedToUser = async (req, res) => {
      
}

module.exports = {

  createUser,
  updateUser,
  deleteUser,
  verifyUser,
  search,
  getUserInfo,
  getUserSpecfificJobApplied,
  addJobAppliedToUser

  //getUserByEmail
};
