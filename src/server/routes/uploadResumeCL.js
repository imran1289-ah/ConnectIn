const express = require('express');
const router = express.Router();
const { uploadResume, uploadCoverLetter, updateResume, updateCoverLetter, getResume } = require('../controllers/resumeAndCoverLetterController');

router.post('/uploadResume/:id', uploadResume, updateResume);
router.post('/uploadCoverLetter/:id', uploadCoverLetter, updateCoverLetter);
router.route('/getResume/:id').get(getResume);

module.exports = router;