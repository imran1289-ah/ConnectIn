const express = require("express");
const router = express.Router();
const roomControllers = require('../controllers/roomController')
const path = require('path');
const fs = require('fs');


router.post("/", roomControllers.getRoom);
router.post("/addRoom", roomControllers.createRoom);
router.delete("/deleteRoom/:userID_1/:userID_2", roomControllers.deleteRoom);

module.exports = router;