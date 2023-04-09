const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const allUser = await User.find();
    return res.status(200).json(allUser);
  } catch (err) {
    res.status(400).json({ message: "Unable to find users" });
  }
};

module.exports = {
  getAllUsers,
};
