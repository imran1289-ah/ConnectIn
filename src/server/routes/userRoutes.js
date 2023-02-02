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

module.exports = router;
