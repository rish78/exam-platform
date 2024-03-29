const express = require('express');
const router = express.Router();

const {register} = require("../controllers/student/auth")
const {login} = require("../controllers/student/auth")

router.post('/register' , register);                        //POST request to register the user
router.post('/login' , login);                              // POST request to login the user

module.exports = router;