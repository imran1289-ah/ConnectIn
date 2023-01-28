const express = require('express');
const router = express.Router()
const usersControllers = require('../controllers/usersController')



router.route('/')
    //.get(usersControllers.getUserByEmail)
    .get(usersControllers.verifyUser)
    .post(usersControllers.createUser)
    .patch(usersControllers.updateUser)
    .delete(usersControllers.deleteUser)
    

    module.exports = router