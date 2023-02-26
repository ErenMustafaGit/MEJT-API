const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const parser = require('body-parser');
const urlencodedParser = parser.urlencoded({ extended: false });

require('../auth/auth');

router.post('/signup', urlencodedParser, passport.authenticate('signup', { session: false }), async (req, res) => {
	res.json({
		user: req.user,
	});
});
  
router.post('/login', urlencodedParser, async (req, res, next) => {
	passport.authenticate('login', async (err, user, info) => {
		try {
			if (err || !user) {
				const error = new Error(info.message);
  
				return next(error);
			}
  
			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);
  
				const body = { _id: user._id, email: user.email };
				const token = jwt.sign({ user: body }, process.env.PRIVATE_KEY);
  
				return res.json({ token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});

module.exports = router;