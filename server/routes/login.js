const express = require('express');
const router = express.Router();

const login_service = require("../../services/user.services.js");

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = login_service.getLogin(email, password);
    
    // if(user != null)
    // {
    //     res.send('OK');
    // }
    // else
    // {
    //     res.send('KO');
    // }
    res.send(user);
});

module.exports = router;
