const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getUserById } = require('../../repositories/user.repository');
const { getTeamsFormattedByAthleteId } = require('../../services/athlete/teams');

require('../../middlewares/auth');

router.get('/athlete/teams', async (req, res, next) => {
	passport.authenticate('jwt', { session: false }, async (err, user) => {
		if (!user) {
			return res.json({
				success: false,
				error: 'The token is empty or is invalid',
			});
		} else {
			const userLogged = await getUserById(user.id);

			if (userLogged.type != 1) {
				return res.json({
					success: false,
					error: 'The user is not an athlete',
				});
			} else {
				const athleteId = user.id;
				const teams = await getTeamsFormattedByAthleteId(athleteId);
				const formattedTeams = { success: true, teams };
				return res.send(formattedTeams);
			}
		}
	})(req, res, next);
});

module.exports = router;
