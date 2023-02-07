const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

const upload = multer();
const app = express();
dotenv.config();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const fileSchema = new mongoose.Schema({
    userId: String,
    resume: Buffer,
    coverLetter: Buffer,
});

const File = mongoose.model('File', fileSchema);

app.post('/files', upload.array('files'), async(req, res) => {
    const { files, body } = req;
    const [resume, coverLetter] = files;
    const { userId } = body;

    try {
        const file = new File({ userId, resume: resume.buffer, coverLetter: coverLetter.buffer });
        await file.save();
        res.send({ message: 'Files uploaded successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('/files/:userId', async(req, res) => {
    const { userId } = req.params;

    try {
        const file = await File.findOne({ userId });
        if (!file) {
            return res.status(404).send({ error: 'File not found' });
        }
        res.send({ resume: file.resume, coverLetter: file.coverLetter });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});