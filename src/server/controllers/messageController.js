const Messages = require("../models/message");


const getMessages = async(req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await Messages.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.text,
            };
        });
        res.json(projectedMessages);
    } catch (ex) {
        next(ex);
    }
};

const addMessages = async(req, res) => {
    try {
        const { from, to, message } = req.body;
        const response = await Messages.create({
            text: message,
            users: [from, to],
            sender: from
        });

        if (response)
            res.json({ msg: "Message added successfully" })
    } catch (err) {
        res.status(400).json({ msg: "Unexpected error while adding message" })
        console.log(err);
    }
}


module.exports = {
    getMessages,
    addMessages
}