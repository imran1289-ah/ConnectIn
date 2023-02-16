const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/usersController");

router
  .route("/")
  .get(usersControllers.verifyUser)
  .post(usersControllers.createUser)
  .patch(usersControllers.updateUser)
  .delete(usersControllers.deleteUser);
  

router.route("/signin").post(usersControllers.verifyUser);

//route to search users
router.route("/search").get(usersControllers.search);

//router to fetch user info for profile page
router.route("/profile/:id").get(usersControllers.getUserInfo);

//router to check if
router.route("/:id/jobsApplied").get(usersControllers.getUserJobsApplied);

router.route("/:id/jobsApplied").post(usersControllers.addJobAppliedToUser);




module.exports = router;
