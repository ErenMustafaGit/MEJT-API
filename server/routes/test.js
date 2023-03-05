const express = require('express');
const router = express.Router();
const passport = require('passport');

require('../middlewares/auth');

router.get('/test', async (req, res, next) => {
	passport.authenticate('jwt', { session: false }, async (err, user) => {
		if (!user) {
			return res.json({
				success: false,
				error: 'The token is empty or is invalid',
			});
		} else {
			res.json({ success: true, userId: user.id });
		}
	})(req, res, next);
});

module.exports = router;
