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

//This will be used to update the user's profile information
const updateUser = async (req, res) => {
  
};

//Action of deleting a user from awaitingConnections and transfer them to connections
const updateConnections = async (req, res) => {
  const { firstname, lastname, _id, waitingConnections, connections} = req.body;
  //In case data is missing or wrong
  if(!firstname||!lastname||!_id|| !Array.isArray(waitingConnections)||!Array.isArray(connections) ){
    return res.status(400).jason({message:'button malfunction due to missing or incorrect data'})
  }
  
  const user = await User.findOneAndUpdate(
    {_id: _id},
    {$addToSet: {
      connections: [{firstname:"scrappy", lastname:"oo"}]
    }}
  )

};

//Action to add user's name and Id to another user's AwaitingConnections
const updateAwaitingConnections = async (req, res) => {
  const { _id} = req.body;
  const user = await User.findOneAndUpdate(
    {_id: _id},
    {$addToSet: { waitingConnections: {firstname:"ittle", lastname:"doo"}
    }},
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  )
  //return res.status(200).json({message:"sent request sucessfully"});
};

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

module.exports = {

  createUser,
  updateUser,
  deleteUser,
  verifyUser,
  search,
  getUserInfo,
  updateConnections,
  updateAwaitingConnections,
  //getUserByEmail
};
