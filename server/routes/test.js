
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/coucou',auth, (req, res) => {
	try{
		res.send('Coucou c\'est moi !');
	}
	catch{
		res.send('Bonjour');
	}
});

module.exports = router;