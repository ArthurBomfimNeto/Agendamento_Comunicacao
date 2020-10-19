const express = require('express');
const router = express.Router();


const usersController = require('../controllers/users_controller');

router.post('/register', usersController.registerUsers);
router.post('/login', usersController.loginUsers);
module.exports = router;