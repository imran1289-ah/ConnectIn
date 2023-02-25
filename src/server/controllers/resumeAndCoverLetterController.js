const User = require('../models/user');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//sends the users resume/coverletter to the /uploads folder with their _id
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, req.params.id + '-' + file.fieldname + path.extname(file.originalname));
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
    } catch (error) {}

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

    }
};

// get the resume for a specific user
module.exports.getResume = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        const resumePath = `uploads/${id}-resume.pdf`;

        // read the resume from the uploads folder
        fs.readFile(resumePath, (err, data) => {
            if (err) {
                res.status(400).send({ error: err.message });
            } else {
                res.set('Content-Disposition', `attachment; filename=${id}-resume.pdf`);
                res.set('Content-Type', 'application/pdf');
                // res.set('Content-Length', data.byteLength);
                res.send(data);
            }
        });
    } catch (error) {

    }
};

// get the cover letter for a specific user
module.exports.getCoverLetter = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        const resumePath = `uploads/${id}-coverLetter.pdf`;

        // read the cl from the uploads folder
        fs.readFile(resumePath, (err, data) => {
            if (err) {
                res.status(400).send({ error: err.message });
            } else {
                res.set('Content-Disposition', `attachment; filename=${id}-coverLetter.pdf`);
                res.set('Content-Type', 'application/pdf');
                // res.set('Content-Length', data.byteLength);
                res.send(data);
            }
        });
    } catch (error) {

    }
};