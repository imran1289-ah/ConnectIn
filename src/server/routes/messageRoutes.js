const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messageController");

//Specific messages routes
router.post("", messagesController.getMessages);

router.post("/addMessage", messagesController.addMessages);

module.exports = router;