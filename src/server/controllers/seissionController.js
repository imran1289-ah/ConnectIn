//Get info of the current logged in user
const getSessionInfo = (req, res) => {
  res.status(200).json({ user_id: req.session.user });
};

//Destroy seission
const destroySession = (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({ message: "User logged out" });
  } catch (err) {
    return res.status(400).json({ message: "Failed to log out" });
  }
};

module.exports = {
  getSessionInfo,
  destroySession,
};
