const express = require('express');
const router = express.Router()
const usersControllers = require('../controllers/usersController')



router.route('/')
    .get(usersControllers.getUser)
    .post(usersControllers.createUser)
    .patch()
    .delete()
    

    module.exports = router