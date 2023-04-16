const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const parser = require('body-parser');
const urlencodedParser = parser.urlencoded({ extended: false });
const _ = require('lodash');

const validator = require('../middlewares/validator');
const { getUserById } = require('../repositories/user.repository');

require('../middlewares/auth');

router.post(
	'/signup',
	urlencodedParser,
	validator('register'),
	async (req, res, next) => {
		passport.authenticate('signup', { session: false }, async (err, user) => {
			if (_.isEqual(user?.success, false)) {
				res.json(user);
			} else {
				const userWithoutPassword = {
					id: user.id,
					email: user.email,
					name: user.name,
					type: user.type,
				};
				console.log(user);
				if(user) {
					res.json({
						success: true,
						user: userWithoutPassword,
					});
				} else {
					res.json({
						success: false,
						error: 'An error occurred while creating your account. Please try again later.',
					});
				}
				
			}
		})(req, res, next);
	}
);

router.post(
	'/login',
	urlencodedParser,
	validator('login'),
	async (req, res, next) => {
		passport.authenticate('login', async (err, user) => {
			try {
				if (err || !user) {
					const errorJson = { success: false };
					return res.json(errorJson);
				}

				req.login(user, { session: false }, async (error) => {
					if (error) return res.json({ success: false });

					if (_.isEqual(user?.success, false)) {
						return res.json(user);
					} else {
						const body = { _id: user._id, id: user.id };
						const token = jwt.sign({ user: body }, process.env.PRIVATE_KEY);
						const userWithDetails = await getUserById(user.id);

						return res.json({ success: true, user: userWithDetails, token });
					}
				});
			} catch (error) {
				return next(error);
			}
		})(req, res, next);
	}
);

module.exports = router;
