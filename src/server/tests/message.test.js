jest.setTimeout(10000);
const request = require('supertest');
const app = require('../index');
const Messages = require('../models/message');
const User = require("../models/user");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");


describe('getMessages', () => {
    let fromUser, toUser, messageId, messageText;

    beforeAll(async() => {
        mongoose.connect(process.env.DATABASE);
        const user1 = await User.create({ firstname: 'Alice', role: 'user' });
        const user2 = await User.create({ firstname: 'Bob', role: 'user' });

        userID1 = user1._id;
        userID2 = user2._id;

        fromUser = user1._id.toString();
        toUser = user2._id.toString();

        // Add a message from user1 to user2
        const message = await Messages.create({
            text: 'Hello user2!',
            users: [fromUser, toUser],
            sender: user1._id,
            recipient: user2._id
        });
        message1ID = message._id;
        messageText = message.text;
    });

    afterAll(async() => {
        // Delete test data
        await Messages.findByIdAndDelete(message1ID);
        await Messages.findByIdAndDelete(messageId2);
        await User.findByIdAndDelete(userID1);
        await User.findByIdAndDelete(userID2);

        try {
            const resumeFilePath = path.join(__dirname, "..", "uploads", `test-resume.pdf`);
            await fs.promises.unlink(resumeFilePath);
            console.log(`Deleted resume file: ${resumeFilePath}`);

        } catch (error) {
            console.error(`Error deleting files: ${error}`);
        }

    });

    it('should return an array of messages between two users', async() => {
        const response = await request(app)
            .post('/messages')
            .send({ from: fromUser, to: toUser });

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(1);

        const message = response.body[0];
        // console.log(message);
        expect(message.message).toBe(messageText);
        expect(message.fromSelf).toBe(true);
    });

    it('should return a message with a downloadLink if it has an attachment', async() => {
        const attachmentUrl = '/path/to/attachment';
        const filename = 'attachment.txt';
        const message2 = await Messages.create({
            text: 'Here is an attachment',
            attachment: {
                url: attachmentUrl,
                filename: filename,
            },
            users: [fromUser, toUser],
            sender: fromUser,
        });
        messageId2 = message2._id;

        const response = await request(app)
            .post('/messages')
            .send({ from: fromUser, to: toUser });

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        // expect(response.body.length).toBe(1);

        const messageResponse = response.body[1];
        // console.log(messageResponse);
        expect(messageResponse.message).toBe("Here is an attachment");
        expect(messageResponse.fromSelf).toBe(true);
        expect(messageResponse.downloadLink).toBe(
            `http://127.0.0.1:9000/messages/download/${filename}`
        );
    });

    it('should return an empty array when there are no messages between the users', async() => {
        const user3 = await User.create({ firstname: 'Charlie', role: 'user' });
        const fromUser2 = user3._id.toString();
        const response = await request(app)
            .post('/messages')
            .send({ from: fromUser, to: fromUser2 });

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(0);

        await User.findByIdAndDelete(user3._id);
    });

    it('should add message to database', async() => {
        const res = await request(app)
            .post('/messages/addMessage')
            .field("from", fromUser)
            .field("to", toUser)
            .field("message", "Test message");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ msg: 'Message added successfully' });
    });

    it('should add message with attachment to database', async() => {
        const res = await request(app)
            .post('/messages/addMessage')
            .field("from", fromUser)
            .field("to", toUser)
            .field("message", "Test message")
            .attach("file", "tests/test-resume.pdf");

        expect(res.statusCode).toBe(200);
        expect(res.body.msg).toBe('Message added successfully');
        expect(res.body.attachment).toBeDefined();

        // Check that the attachment was saved in the database
        const message = await Messages.findOne({ text: 'Test message' });
        expect(message.attachment.url).toBeDefined();
        expect(message.attachment.filename).toBeDefined();
    });


});