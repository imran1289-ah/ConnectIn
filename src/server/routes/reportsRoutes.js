const express = require("express");
const router = express.Router();
const reportsControllers = require("../controllers/reportsController");

router.post('/create', reportsControllers.createReport);
router.get('/', reportsControllers.getReports);
router.post('/delete/:reportId', reportsControllers.deleteReport);

 

module.exports = router;
