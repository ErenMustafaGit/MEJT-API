const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getUserById } = require('../../repositories/user.repository');
const { getFeedbacksByTeamId } = require('../../services/trainer/feedbackSessions');

require('../../middlewares/auth');

router.get('/trainer/feedbackSessions', async (req, res, next) => {
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
                const teamId = parseInt(req.query.teamId);
                const startingDate = req.query.startingDate;
                const endingDate = req.query.endingDate;
				const athletes = await getFeedbacksByTeamId(teamId, startingDate, endingDate);
				const formattedFeedbacks = { success: true, athletes };
				return res.send(formattedFeedbacks);
			}
		}
	})(req, res, next);
});

module.exports = router;
