const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messageController");
const path = require('path');
const fs = require('fs');

//Specific messages routes
router.post("", messagesController.getMessages);

router.post("/addMessage", messagesController.addMessages);

// Add this endpoint to serve the files
router.get('/download/:filename', (req, res, next) => {
    const file = path.join(__dirname, '../../server/uploads', req.params.filename);
    res.download(file, (err) => {
        if (err) {
            next(err);
        }
    });
});


module.exports = router;