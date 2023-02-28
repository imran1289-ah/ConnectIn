//Get info of the current logged in user
const getSessionInfo = (req, res) => {
  if (req.session.user) {
    res.status(200).json({ user_info: req.session.user });
  } else {
    res.status(401).json({ message: "user not autenticated" });
  }
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
