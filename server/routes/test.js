const express = require('express');
const router = express.Router();
const passport = require('passport');

require('../auth/auth');

router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.send('Vous êtes bien connectés !');
});

module.exports = router;