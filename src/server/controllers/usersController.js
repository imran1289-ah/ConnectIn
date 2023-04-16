const User = require("../models/user");
const Job = require("../models/Job");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { db } = require("../models/user");
var sesh;

const createUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  // Checking if all fields are filled.
  if (!firstname || !lastname || !email || !password || !role) {
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
  const saltRounds = 10;
  const hashPwd = await bcrypt.hash(password, saltRounds);
  const userDocument = {
    firstname,
    lastname,
    email,
    password: hashPwd,
    role,
    preferences: { category: " ", location: " ", work_type: " " },
    isBan: false,
  };
  const newUser = await User.create(userDocument);

  if (newUser) {
    res
      .status(201)
      .json({ message: "User successfully created!", id: newUser._id });
  } else {
    res.status(400).json({ message: "User unsuccessfully created." });
  }
});

// const getUserByEmail = async(req, res) => {
//     const user = await User.findOne({ email: req.body.email }).then((user) => {
//         if (user) {
//             // console.log(`Found user ${user.email}`);
//             res.status(200).json(user);
//         } else {
//             return res.status(400).json({ message: "No user found" });
//         }
//     });
// };

// This action is to verify the credentials of the user when logging in
const verifyUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const userSession = {
      email: user.email,
      user_id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      isBan : user.isBan
    };
    req.session.user = userSession;
    // console.log(`Found user ${user.email}`);
    res.status(200).json({ message: "login successful", userSession });
  } else {
    return res.status(401).json({ message: "Incorrect password" });
  }
};

//This will be used to update the user's profile information
const updateUser = async (req, res) => {};

//Action of deleting  a user from awaiting connections list

const deleteAwaitingConnections = async (req, res) => {
  const { firstname, lastname, _id, userID } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: _id },
    {
      $pull: {
        waitingConnections: {
          firstname: firstname,
          lastname: lastname,
          userID: userID,
        },
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
  const { firstname, lastname, userID, _id } = req.body;
  //const _id = "63f41b0123e995b64434ece0";
  const user = await User.findOneAndUpdate(
    { _id: _id },
    {
      $addToSet: {
        connections: {
          firstname: firstname,
          lastname: lastname,
          userID: userID,
        },
      },
    }
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
  const { _id, userID, firstname, lastname } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: _id },
    {
      $addToSet: {
        waitingConnections: {
          userID: userID,
          firstname: firstname,
          lastname: lastname,
        },
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
  const { user_id } = req.body;
  //const id = "640a92a2a8662ce5531b1b84"  ;
  const user = await User.findById(user_id);
  if (user_id) {
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
// const search = async(req, res) => {
//     const firstname = req.query.term;

//     const users = await User.find({
//         firstname: { $regex: firstname, $options: "i" },
//     }).then((users) => {
//         if (users) {
//             res.status(200).json(users);
//         } else {
//             return res.status(400).json({ message: "No user exists with this name" });
//         }
//     });
// };
const deleteUser = async (req, res) => {};

//Action to return public user info
const getUserInfo = async (req, res) => {
  const user = await User.findById(req.params.id).then((user) => {
    if (user) {
      // console.log(`Found user ${user}`);
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

// const getUserJobsObjectApplied = async(req, res) => {
//     try {
//         const user = await User.findOne({ _id: req.params.id });
//         return res.status(200).json(user.jobsAppliedObject);
//     } catch (err) {
//         res.status(400).json({ message: "Unable to retrieve jobs object applied." });
//     }
// };

const addJobAppliedToUser = async (req, res) => {
  let jobObject;

  await Job.findOne({ job_id: req.body.jobId }).then((job) => {
    jobObject = job;
  });

  await User.findById(req.body.userId).then((user) => {
    const array = user.jobsApplied;
    // const jobObjectArray = user.jobsAppliedObject;
    array.push(jobObject);
    user.jobsApplied = array;
    // jobObjectArray.push(jobObject);
    // user.jobsAppliedObject = jobObjectArray;
    user
      .save()
      .then(() => {
        console.log("Job id succesfully added to user!");
      })
      .catch((err) => console.log(err));
  });
  res.sendStatus(201);
};

//Action to add user's post to their account.
const addTimelinePost = async (req, res) => {
  const { _id, firstname, lastname, description, timestamp } = req.body;

  if (!_id || !firstname|| !lastname || !description|| !timestamp) {
    return res.status(400).json({ message: "Please fill out all fields!" });
  }
  const user = await User.findByIdAndUpdate(_id, {
    $addToSet: {
      postsMade: {
        _id: _id,
        firstname: firstname,
        lastname: lastname,
        description: description,
        timestamp: timestamp,
      },
    },
  });
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

//controller to fetch user post
const getUserPostsbyID = async (req, res) => {
  try{
      const user = await User.findOne({ _id: req.params.id })
      let userPosts = [];
      let connectionPosts = [];
      let connectionPost = []
      let extractedPost = [];
      userPosts = user.postsMade;
      const awaitPromises = user.connections.map(async connection => {
        const connectionUser = await User.findOne({_id: connection.userID})
        connectionPost = connectionUser.postsMade
        connectionPosts = connectionPosts.concat(connectionPost)
      })
      Promise.all(awaitPromises)
        .then(() =>{
          extractedPost = userPosts.concat(connectionPosts)
          const sortPost = extractedPost.sort((a,b) =>{
            return a.timestamp < b.timestamp ? 1 : -1;
          })
          console.log(sortPost)
          return res.status(200).json(sortPost);
        })
        .catch(err =>{
          console.log(err);
      })
  }
  catch (err) {
    res.status(400).json({ message: "Unable to retrieve posts made." });
  }


};

//controller to fetch user connection
const getConnections = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    return res.status(200).json(user.connections);
  } catch (err) {
    res.status(400).json({ message: "Unable to retrieve connections." });
  }
};

//controller to remove connection
const removeConnection = async (req, res) => {
  const userID = req.params.id;
  const connectionID = req.params.connectionid;
  try {
    const removedUser = await User.findOneAndUpdate(
      { _id: userID },
      { $pull: { connections: { userID: connectionID } } }
    );
    const removedUserInConnectionSide = await User.findOneAndUpdate(
      { _id: connectionID },
      { $pull: { connections: { userID: userID } } }
    );
    return res
      .status(200)
      .json(
        removedUser.connections.find(
          (connection) => connection.userID === connectionID
        )
      );
  } catch (err) {
    return res.status(400).json({ message: "User cannot be deleted" });
  }
};

const sendReceivedApplications = async (req, res) => {
  const recruiter_id = req.params.recruiterID;
  const { applicationDetails } = req.body;

  let array;
  try {
    const user = await User.findOne({ _id: recruiter_id }).then((user) => {
      array = user.receivedApplications;
      array.push(applicationDetails);
      user.receivedApplications = array;
      user.save();
    });
    res
      .status(201)
      .json({ message: "Recruiter successfully received an application" });
  } catch (err) {
    res.json({
      message: "Unable to send a received application to recruiter.",
    });
  }
};

const getAllReceivedApplications = async (req, res) => {
  const recruiter_id = req.params.recruiterID;
  try {
    const user = await User.findOne({ _id: recruiter_id });

    return res.status(200).json(user.receivedApplications);

    // console.log(user.receivedApplications)
    // return res.status(200).json(user.receivedApplications)
  } catch (err) {
    return res
      .status(400)
      .json({
        message: "Unable to retrieve received applications from recruiter.",
      });
  }
};

const savePreferences = async (req, res) => {
  const { category, location, work_type } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        preferences: {
          category: category,
          location: location,
          work_type: work_type,
        },
      },
      { new: true }
    );
    // console.log(preferences);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyConnections = async (req, res) => {
  const { ownUserID, friendUserid, firstname, lastname } = req.body;
  // console.log(ownUserID);
  // console.log(friendUserid);
  // console.log(firstname);
  // console.log(lastname);
  const user = User.findOne({ _id: ownUserID });
  const friend = await user
    .findOne({
      connections: {
        firstname: firstname,
        lastname: lastname,
        userID: friendUserid,
      },
    })
    .then((friend) => {
      if (friend) {
        console.log("found user");
        console.log(firstname);
        console.log(lastname);

        return res.status(200).json(true);
      } else {
        console.log("not friends");
        return res.status(200).json(false);
      }
    });
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
  getConnections,
  removeConnection,
  verifyConnections,

  //getUserByEmail
  editUserInfo,

  getUserJobsApplied,
  addJobAppliedToUser,
  sendReceivedApplications,
  getAllReceivedApplications,
  getUser,

  addTimelinePost,
  getUserPostsbyID,
  savePreferences,
};
