const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    userID_1:{
        type: String,
        required: true
    },
    userID_2:{
        type: String,
        required: true
    }
    
});

const Rooms = mongoose.model("rooms", roomSchema);


module.exports = Rooms;
