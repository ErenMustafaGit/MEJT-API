const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getUserById } = require('../../repositories/user.repository');
const {
	getSessionsByTeamIdWithFeedbackBoolean,
} = require('../../services/athlete/sessions');

require('../../middlewares/auth');

router.get('/athlete/sessions', async (req, res, next) => {
	passport.authenticate('jwt', { session: false }, async (err, user) => {
		if (!user) {
			return res.json({
				success: false,
				error: 'The token is empty or is invalid',
			});
		} else {
			const userLogged = await getUserById(user.id);
			const teamId = req.query.teamId;
			let athleteId;

			if (userLogged.type != 1) {
				athleteId = parseInt(user.id);
			} else {
				athleteId = parseInt(req.query.athleteId);
			}
			const allSessions = await getSessionsByTeamIdWithFeedbackBoolean(
				athleteId,
				teamId
			);
			const resultFormatted = { success: true, sessions: allSessions };
			return res.send(resultFormatted);
		}
	})(req, res, next);
});

module.exports = router;
