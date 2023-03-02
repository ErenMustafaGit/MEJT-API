const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const _ = require('lodash');

const { getUser, createUser } = require('../repositories/user.repository');

const isValidPassword = async (password1, password2) => {
	const compare = await bcrypt.compare(password1, password2);

	return compare;
};

passport.use(
	'signup',
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			const passwordHashed = await bcrypt.hash(password, 10);
			try {
				const name = req.body.name;
				const type = req.body.type;
				const userInDB = await getUser(email);
				if (!_.isEmpty(userInDB)) {
					if (_.isEqual(userInDB?.success, false)) {
						return done(null, userInDB);
					} else {
						return done(null, { success: false, error: 'User already exists' });
					}
				}
				const user = await createUser(email, name, passwordHashed, type);
				return done(null, user);
			} catch (error) {
				done(error);
			}
		}
	)
);

passport.use(
	'login',
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			try {
				const user = await getUser(email);

				if (!user) {
					return done(null, { success: false, message: 'User not found' });
				}
				const validate = await isValidPassword(password, user.password);

				if (!validate) {
					return done(null, { success: false, message: 'Wrong Password' });
				}

				return done(null, user, { message: 'Logged in Successfully' });
			} catch (error) {
				return done(null, { success: false, error });
			}
		}
	)
);

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
	new JWTstrategy(
		{
			secretOrKey: process.env.PRIVATE_KEY,
			jwtFromRequest: ExtractJWT.fromExtractors([
				ExtractJWT.fromUrlQueryParameter('secret_token'),
				ExtractJWT.fromHeader('secret_token'),
				ExtractJWT.fromAuthHeaderAsBearerToken(),
			]),
		},
		async (token, done) => {
			try {
				return done(null, token.user);
			} catch (error) {
				done(error);
			}
		}
	)
);
