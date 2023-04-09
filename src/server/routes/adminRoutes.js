const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/users", adminController.getAllUsers);
router.post("/edit/:id", adminController.adminEdit);

module.exports = router;
