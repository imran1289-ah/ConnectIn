const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/usersController");

router
  .route("/")
  //.get(usersControllers.getUserByEmail)
  .post(usersControllers.createUser)
  .patch(usersControllers.updateUser)
  .delete(usersControllers.deleteUser);

router.route("/signin").post(usersControllers.verifyUser);

module.exports = router;
