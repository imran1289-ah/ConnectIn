const User = require("../models/user");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const allUser = await User.find();
    return res.status(200).json(allUser);
  } catch (err) {
    res.status(400).json({ message: "Unable to find users" });
  }
};

const adminEdit = async (req, res) => {
  const { email, password, role } = req.body;

  // Checking if all fields are filled.
  if (!email || !password || !role) {
    return res.status(400).json({ message: "Please fill out all fields!" });
  }

  const saltRounds = 10;
  const hashPwd = await bcrypt.hash(password, saltRounds);

  const isThereADuplicate = await User.findOne({
    email,
    _id: { $ne: req.params.id },
  })
    .lean()
    .exec();
  if (isThereADuplicate) {
    return res
      .status(409)
      .json({ message: "A user with this email already exists." });
  }

  User.findByIdAndUpdate(req.params.id)
    .then((user) => {
      if (email && user.email !== email) {
        user.email = email;
      }
      if (password && user.password !== password) {
        user.password = hashPwd;
      }
      if (role && user.role !== role) {
        user.role = role;
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

const adminBan = async (req, res) => {
  const { isBan } = req.body;
  User.findByIdAndUpdate(req.params.id)
    .then((user) => {
      if (isBan) {
        user.isBan = true;
      }
      user
        .save()
        .then(() => {
          console.log("User was banned in the database");
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

const adminUnBan = async (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $set: { isBan: false } },
    { new: true }
  )
    .then((user) => {
      user
        .save()
        .then(() => {
          console.log("User was unbanned in the database");
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

module.exports = {
  getAllUsers,
  adminEdit,
  adminBan,
  adminUnBan,
};
