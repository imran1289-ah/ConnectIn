const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/seissionController");

//Route to get seission information
router.get("/", sessionController.getSessionInfo);

//Route to destroy seission
router.post("/logout", sessionController.destroySession);

module.exports = router;
