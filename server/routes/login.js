const express = require('express');
const router = express.Router();

const login_service = require("../../services/user.services.js");

router.post('/login/:username/:password', login_service.getLogin);

module.exports = router;