const User = require('../models/user');
const multer = require('multer');
const path = require('path');

//sends the users resume/coverletter to the /uploads folder with their _id
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, req.params.id + '-' + file.fieldname + '-' + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports.uploadResume = upload.single('resume');

module.exports.uploadCoverLetter = upload.single('coverLetter');

//update the resume for a the specific user
module.exports.updateResume = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, {
            resume: req.file.buffer,
        }, { new: true });
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};
//update the cl for a the specific user
module.exports.updateCoverLetter = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, {
            coverLetter: req.file.buffer,
        }, { new: true });
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

//currently does not work, looking into at
module.exports.getResume = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        const resume = user.resume;
        res.set('Content-Type', 'application/pdf');
        res.send(resume);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};