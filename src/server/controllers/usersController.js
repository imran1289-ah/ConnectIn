
const User = require('../models/user');
var sesh;
const createUser = async (req, res) =>{
            
}

// This action returns the user based on the email
const getUserByEmail = async (req, res) => {
    const user = await User.findOne({email: req.body.email}).then(user => {
        if (user) {
            console.log(`Found user ${user.email}`)
            res.status(200).json(user)
        }
        
        else {
            return res.status(400).json({message:"No user found"})
        }
    })
}

// This action is to verify the credentials of the user when logging in
const verifyUser = async (req, res) => {

    const user = await User.findOne({email: req.body.email, password: req.body.password}).then(user => {   
        if (user) {
            req.session.email = user.email
            console.log(`Found user ${user.email}`)
            res.status(200).json(user)
        }
        
        else {
            return res.status(404).json({
                errors: [{ user: "not found" }],
              });
            }   
    })
}

const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}


module.exports = {
    createUser,
    updateUser,
    deleteUser,
    verifyUser,
    //getUserByEmail
}