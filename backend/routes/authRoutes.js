const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
//create router 
const router = express.Router();

//Router

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;