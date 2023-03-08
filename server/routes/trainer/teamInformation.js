const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getTeamById } = require('../../repositories/team.repository');

require('../../middlewares/auth');

router.get('/trainer/teamInformation', async (req, res, next) => {
	passport.authenticate('jwt', { session: false }, async (err, user) => {
		if (!user) {
			return res.json({
				success: false,
				error: 'The token is empty or is invalid',
			});
		} else {
			const team = await getTeamById(parseInt(req.query.teamId));
			const formattedResult = { success: true, team };
			return res.send(formattedResult);
		}
	})(req, res, next);
});

module.exports = router;
