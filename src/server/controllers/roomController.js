const res = require('express/lib/response');
const Room = require('../models/Room')


const getRoom = async (req, res) =>{

    try{

    const {userID_1, userID_2} = req.body;
    
    var room = await Room.findOne({userID_1: userID_1, userID_2:userID_2})
    
    if(room == null){
    room = await Room.findOne({userID_1: userID_2, userID_2:userID_1})
    
    }

    res.status(201).json(room._id);
        
    
}
catch(err){
    console.log(err);
}

    

}

const createRoom = async (req, res) =>{

try{

    const {userID_1, userID_2} = req.body;
    const room = {userID_1, userID_2}
    const newRoom = await Room.create(room);
    res.status(200).json("Room sucessfully created!" + newRoom)

}catch(err){
    console.log(err)
}
    
}

const deleteRoom = async (req, res) =>{

    const {userID_1, userID_2} = req.body;
    
    try{

    let room = await Room.findOne({userID_1:userID_1, userID_2:userID_2});
        if(!room){
            room = await Room.findOne({userID_1: userID_2, userID_2:userID_1});
        }
        await Room.findByIdAndDelete({_id: room._id});
        res.json({message: "Successfully removed room."});

    } catch(err){
        console.log(err);
        res.json({message: "Unable to remove room."})
    }
    
}


module.exports = {
    getRoom,
    createRoom,
    deleteRoom
}