const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({

    text: {
        type: String,
        required: true
    },
    attachment:{
        type:Buffer,
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
}, {
    timestamps: true,
});

const Messages = mongoose.model("Messages", MessageSchema);
module.exports = Messages;

// Messages.create({
//     text: "testMessage",
//     users: ["6402817b781fecbdadf6c992", "6402a4c6db0c6f36e8f531a8"],
//     // sender: "6402817b781fecbdadf6c992"

// });