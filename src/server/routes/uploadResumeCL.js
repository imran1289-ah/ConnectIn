const express = require('express');
const router = express.Router();
const { uploadResume, uploadCoverLetter, updateResume, updateCoverLetter, getResume, getCoverLetter } = require('../controllers/resumeAndCoverLetterController');

router.post('/uploadResume/:id', uploadResume, updateResume);
router.post('/uploadCoverLetter/:id', uploadCoverLetter, updateCoverLetter);
router.route('/getResume/:id').get(getResume);
router.route('/getCoverLetter/:id').get(getCoverLetter);

module.exports = router;