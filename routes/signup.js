const express = require('express');
const router = express.Router();
const signup = require('./../Controllers/registerController');

router.route('/')
    .post(signup)

module.exports = router;