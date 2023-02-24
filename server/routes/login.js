const express = require('express');
const router = express.Router();

const login_service = require("../../services/user.services.js");

router.post('/login', (req, res) => {
    login_service.getLogin;
    res.send('test');
});

module.exports = router;
