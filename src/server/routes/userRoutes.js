const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/usersController");

router
  .route("/")
  .get(usersControllers.verifyUser)
  .post(usersControllers.createUser)
  .patch(usersControllers.updateUser)
  //.post(usersControllers.updateAwaitingConnections)
  //.patch(usersControllers.updateConnections)
  .delete(usersControllers.deleteUser);

router.route("/signin").post(usersControllers.verifyUser);

//route to search users
router.route("/search").get(usersControllers.search);

//router to fetch user info for profile page
router.route("/profile/:id").get(usersControllers.getUserInfo);

router.route("/searchuserlist").post(usersControllers.updateAwaitingConnections);

router.route("/waitingConnections").get(usersControllers.getAwaitingConnections);

//router.route("/newConnection").patch(usersControllers.updateConnections);

module.exports = router;
