const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');


const createUser = asyncHandler(async (req, res) =>{
    const {firstname, lastname, email, password} = req.body
    
    // Checking if all fields are filled.
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: 'Please fill out all fields!'})
    }
    
    // Checks if a duplicate user exists on the database
    const isThereADuplicate = await User.findOne({email}).lean().exec();
    if (isThereADuplicate) {
        return res.status(409).json({message: 'A user with this email already exists.'})
    }
    
    // Hashing passwords to encrypt user data
    const hashPwd = await bcrypt.hash(password,10) 
    const userDocument = {firstname,lastname,email,"password": hashPwd}
    const newUser = await User.create(userDocument)
    
    if (newUser) {
        res.status(201).json({message: 'User successfully created!'})
    } else {
        res.status(400).json({message: 'User unsuccessfully created.'})
    }

})

const getUser = async (req, res) => {

   
}

const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}


module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}