const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getUserById } = require('../../repositories/user.repository');
const { getTeamsByTrainerId } = require('../../services/trainer/teams');

require('../../middlewares/auth');

router.get('/trainer/teams', async (req, res, next) => {
	passport.authenticate('jwt', { session: false }, async (err, user) => {
		if (!user) {
			return res.json({
				success: false,
				error: 'The token is empty or is invalid',
			});
		} else {
			const userLogged = await getUserById(user.id);

			if (userLogged.type != 0) {
				return res.json({
					success: false,
					error: 'The user is not a trainer',
				});
			} else {
				const trainerId = user.id;
				const teams = await getTeamsByTrainerId(trainerId);
				const formattedTeams = { success: true, teams };
				return res.send(formattedTeams);
			}
		}
	})(req, res, next);
});

module.exports = router;
