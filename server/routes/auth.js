const express = require('express');
const router = express.Router();

router.get('/justin',(req,res) => {console.log('c\'est moi'),res.send('lala');});

module.exports = router;