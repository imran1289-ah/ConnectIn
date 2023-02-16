const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");

//Route to search for user profile
router.get("", searchController.search);

module.exports = router;
