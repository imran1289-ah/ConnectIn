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
  

router
  .route("/:_id")
  //.get(usersControllers.getUser)
  //.patch(usersControllers.updateUser)
  .delete(usersControllers.deleteUser);

router.route("/signin").post(usersControllers.verifyUser);

//router to fetch user info for profile page
router.route("/profile/:id").get(usersControllers.getUserInfo);

router.route("/searchuserlist").post(usersControllers.updateAwaitingConnections);

router.route("/waitingConnections").get(usersControllers.getAwaitingConnections);

router.route("/newConnection").post(usersControllers.updateConnections);

router.route("/deleteAwaiting").patch(usersControllers.deleteAwaitingConnections);
//router to check if 
router.route("/:id/jobsApplied").get(usersControllers.getUserJobsApplied);

router.route("/:id/jobsApplied").post(usersControllers.addJobAppliedToUser);




module.exports = router;
