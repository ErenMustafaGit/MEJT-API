const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const parser = require('body-parser');
const urlencodedParser = parser.urlencoded({ extended: false });
const validator = require('../middlewares/validator');

require('../middlewares/auth');

router.post(
	'/signup',
	urlencodedParser,
	validator('register'),
	passport.authenticate('signup', { session: false }),
	async (req, res) => {
		const userWithoutPassword = {
			id: req.user.id,
			email: req.user.email,
			name: req.user.name,
			type: req.user.type,
		};
		res.json({
			user: userWithoutPassword,
		});
	}
);

router.post(
	'/login',
	urlencodedParser,
	validator('login'),
	async (req, res, next) => {
		passport.authenticate('login', async (err, user, info) => {
			try {
				if (err || !user) {
					const error = new Error(info?.message);

					return next(error);
				}

				req.login(user, { session: false }, async (error) => {
					if (error) return next(error);

					const body = { _id: user._id, id: user.id };
					const token = jwt.sign({ user: body }, process.env.PRIVATE_KEY);

					return res.json({ token });
				});
			} catch (error) {
				return next(error);
			}
		})(req, res, next);
	}
);

module.exports = router;
