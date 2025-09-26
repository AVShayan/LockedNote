const express = require('express');
const router = express.Router();
const {login} = require('./../Controllers/loginController');

router.route('/')
    .post(login)

module.exports = router;