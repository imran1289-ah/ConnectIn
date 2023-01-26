
const User = require('../models/user');
var sesh;
const createUser = async (req, res) =>{
            
}

const getUserByEmail = async (req, res) => {
    const user = await User.find().select('-password').lean()
    if(!user?.length){
        return res.status(400).json({message:"No user found"})
    } 
    res.json(user)
}

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