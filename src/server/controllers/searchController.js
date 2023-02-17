const User = require("../models/user");

//Action to return profiles based on firstname given by end user
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

module.exports = {
  search,
};
